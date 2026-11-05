// Public editorial metadata only; upstream URLs are restricted to Kloud.blog.
const ORIGIN = 'https://kloud.blog';
function decode(value = '') {
  const named = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", '#39': "'" };
  return value.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1').replace(/&(#x[0-9a-f]+|#\d+|amp|lt|gt|quot|apos);/gi, (all, entity) => {
    if (entity[0] !== '#') return named[entity.toLowerCase()] || all;
    const n = entity[1].toLowerCase() === 'x' ? parseInt(entity.slice(2), 16) : parseInt(entity.slice(1), 10);
    return n >= 0 && n <= 0x10ffff ? String.fromCodePoint(n) : all;
  }).trim();
}
function field(xml, name) { return decode(xml.match(new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${name}>`, 'i'))?.[1]); }
function blogURL(value) {
  try {
    const url = new URL(value, ORIGIN);
    // Astro's default Pages origin may still appear in older feed entries.
    if (url.protocol !== 'https:' || !['kloud.blog', 'www.kloud.blog', 'kloud-blog.pages.dev'].includes(url.hostname) || url.username || url.password) return null;
    return new URL(url.pathname + url.search, ORIGIN).href;
  } catch { return null; }
}
export function postsFromRSS(xml, now = Date.now()) {
  return [...xml.matchAll(/<item(?:\s[^>]*)?>([\s\S]*?)<\/item>/gi)].map(([, item]) => ({
    title: field(item, 'title'), url: blogURL(field(item, 'link')), date: field(item, 'pubDate'),
    description: field(item, 'description'),
    creators: [...item.matchAll(/<dc:creator(?:\s[^>]*)?>([\s\S]*?)<\/dc:creator>/gi)].map(([, creator]) => decode(creator)),
    category: field(item, 'category') || 'AWS · Cloud · DevOps',
  })).filter(item => item.title && item.url && /\/(?:fr\/)?posts\//.test(new URL(item.url).pathname) && Number.isFinite(Date.parse(item.date)) && Date.parse(item.date) <= now)
    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date) || a.url.localeCompare(b.url));
}
export function latestFromRSS(xml, now = Date.now()) { return postsFromRSS(xml, now)[0] || null; }
export function imageFromHTML(html) {
  for (const [tag] of html.matchAll(/<meta\b[^>]*>/gi)) {
    const attrs = Object.fromEntries([...tag.matchAll(/([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g)].map(([, key, a, b]) => [key.toLowerCase(), decode(a ?? b)]));
    if (attrs.property?.toLowerCase() === 'og:image') return blogURL(attrs.content);
  }
  return null;
}
export function isMaxenceArticle(html) {
  for (const [, tag, body] of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
    if (!/\btype\s*=\s*["']application\/ld\+json["']/i.test(tag)) continue;
    try {
      const visit = node => {
        if (Array.isArray(node)) return node.some(visit);
        if (!node || typeof node !== 'object') return false;
        const types = [].concat(node['@type'] || []);
        if (types.some(type => ['BlogPosting', 'Article', 'TechArticle'].includes(type))) {
          return [].concat(node.author || []).some(author => {
            const url = blogURL(typeof author === 'string' ? author : author?.url || author?.['@id']);
            return url && /^\/(?:fr\/)?authors\/maxence\/?$/.test(new URL(url).pathname);
          });
        }
        return node['@graph'] ? visit(node['@graph']) : false;
      };
      if (visit(JSON.parse(body))) return true;
    } catch { /* A malformed or unrelated schema must not attribute an article. */ }
  }
  return false;
}
export async function onRequestGet({ request }) {
  const lang = new URL(request.url).searchParams.get('lang') === 'fr' ? 'fr' : 'en';
  const headers = { 'Cache-Control': 'public, max-age=300, s-maxage=300', 'X-Content-Type-Options': 'nosniff' };
  const deadline = AbortSignal.timeout(14000);
  try {
    const feed = await fetch(`${ORIGIN}/${lang === 'fr' ? 'fr/' : ''}rss.xml`, { signal: AbortSignal.any([deadline, AbortSignal.timeout(8000)]), cf: { cacheTtl: 300, cacheEverything: true } });
    if (!feed.ok) throw new Error('Feed unavailable');
    const posts = postsFromRSS(await feed.text());
    const metadata = new Map();
    const enrich = post => {
      if (!metadata.has(post.url)) metadata.set(post.url, (async () => {
        try {
          const page = await fetch(post.url, { signal: AbortSignal.any([deadline, AbortSignal.timeout(6000)]), cf: { cacheTtl: 300, cacheEverything: true } });
          if (page.ok) { const html = await page.text(); return { ...post, cover: imageFromHTML(html), byMaxence: isMaxenceArticle(html) }; }
        } catch { /* Keep public metadata, without guessing its author. */ }
        return { ...post, cover: null, byMaxence: false };
      })());
      return metadata.get(post.url);
    };
    const article = posts[0] ? await enrich(posts[0]) : null;
    // The RSS author is a prefilter; each displayed contribution must confirm the stable author URL.
    const candidates = posts.filter(post => !post.creators.length || post.creators.some(name => ['Maxence', 'Maxence Cerfontaine'].includes(name))).slice(0, 9);
    const contributions = [];
    for (let i = 0; i < candidates.length && contributions.length < 3 && !deadline.aborted; i += 3) {
      const batch = await Promise.all(candidates.slice(i, i + 3).map(enrich));
      contributions.push(...batch.filter(post => post.byMaxence));
    }
    return Response.json({ article, contributions: contributions.slice(0, 3) }, { headers });
  } catch {
    return Response.json({ article: null, contributions: [] }, { headers: { ...headers, 'Cache-Control': 'public, max-age=30, s-maxage=30' } });
  }
}
