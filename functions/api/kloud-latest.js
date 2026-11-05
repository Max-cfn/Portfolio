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
  try { const url = new URL(value, ORIGIN); return url.protocol === 'https:' && ['kloud.blog', 'www.kloud.blog'].includes(url.hostname) && !url.username && !url.password ? url.href : null; } catch { return null; }
}
export function latestFromRSS(xml, now = Date.now()) {
  return [...xml.matchAll(/<item(?:\s[^>]*)?>([\s\S]*?)<\/item>/gi)].map(([, item]) => ({
    title: field(item, 'title'), url: blogURL(field(item, 'link')), date: field(item, 'pubDate'),
    category: field(item, 'category') || 'AWS · Cloud · DevOps',
  })).filter(item => item.title && item.url && /\/(?:fr\/)?posts\//.test(new URL(item.url).pathname) && Number.isFinite(Date.parse(item.date)) && Date.parse(item.date) <= now)
    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date) || a.url.localeCompare(b.url))[0] || null;
}
export function imageFromHTML(html) {
  for (const [tag] of html.matchAll(/<meta\b[^>]*>/gi)) {
    const attrs = Object.fromEntries([...tag.matchAll(/([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g)].map(([, key, a, b]) => [key.toLowerCase(), decode(a ?? b)]));
    if (attrs.property?.toLowerCase() === 'og:image') return blogURL(attrs.content);
  }
  return null;
}
export async function onRequestGet({ request }) {
  const lang = new URL(request.url).searchParams.get('lang') === 'fr' ? 'fr' : 'en';
  const headers = { 'Cache-Control': 'public, max-age=300, s-maxage=300', 'X-Content-Type-Options': 'nosniff' };
  try {
    const feed = await fetch(`${ORIGIN}/${lang === 'fr' ? 'fr/' : ''}rss.xml`, { signal: AbortSignal.timeout(8000), cf: { cacheTtl: 300, cacheEverything: true } });
    if (!feed.ok) throw new Error('Feed unavailable');
    const article = latestFromRSS(await feed.text());
    if (article) {
      // The cover is the article's real social image; failure leaves a branded paper preview.
      try {
        const page = await fetch(article.url, { signal: AbortSignal.timeout(8000), cf: { cacheTtl: 300, cacheEverything: true } });
        if (page.ok) article.cover = imageFromHTML(await page.text());
      } catch { /* Keep the latest title and link when its image cannot be loaded. */ }
    }
    return Response.json({ article }, { headers });
  } catch {
    return Response.json({ article: null }, { headers: { ...headers, 'Cache-Control': 'public, max-age=30, s-maxage=30' } });
  }
}
