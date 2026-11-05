// Shared by the journal project card and the author's contribution list.
const kloudPublicationCache=new Map();
function getKloudPublications(language){
  const previous=kloudPublicationCache.get(language);
  if(previous&&(previous.pending||previous.expires>Date.now()))return previous.promise;
  const entry={pending:true,expires:Date.now()+300000};
  entry.promise=fetch(`/api/kloud-latest?lang=${language}`,{signal:AbortSignal.timeout(18000),cache:'no-cache'})
    .then(async response=>{if(!response.ok)throw new Error('Publications unavailable');const data=await response.json();if(!data.article)entry.expires=Date.now()+30000;return data})
    .catch(error=>{kloudPublicationCache.delete(language);throw error})
    .finally(()=>{entry.pending=false});
  kloudPublicationCache.set(language,entry);return entry.promise;
}
function kloudPublicURL(value){try{const url=new URL(value);return url.protocol==='https:'&&['kloud.blog','www.kloud.blog'].includes(url.hostname)&&!url.username&&!url.password?url.href:null}catch{return null}}
let contributionsObserver,contributionsTimer;
function renderContributions(){
  contributionsObserver?.disconnect();clearInterval(contributionsTimer);
  const root=document.querySelector('#contributions-root'),language=LANG;
  root.dataset.language=language;root.setAttribute('aria-busy','true');root.replaceChildren();
  const status=document.createElement('li');status.className='contributions-status';status.setAttribute('role','status');status.textContent=t('contrib_loading');root.appendChild(status);
  document.querySelector('#contributions-all').href=`https://kloud.blog/${language==='fr'?'fr/':''}authors/maxence/`;
  const load=async()=>{
    try{
      const data=await getKloudPublications(language);
      if(root.dataset.language!==language)return;
      const articles=(Array.isArray(data.contributions)?data.contributions:[]).filter(post=>post.byMaxence===true&&typeof post.title==='string'&&kloudPublicURL(post.url)).slice(0,3);
      if(!articles.length){if(!root.querySelector('.contribution')){status.textContent=t('contrib_empty');root.replaceChildren(status)}return}
      const items=articles.map(post=>{
        const item=document.createElement('li');item.className='contribution';
        item.innerHTML='<a class="contribution-link" target="_blank" rel="noopener noreferrer"><div class="contribution-visual" aria-hidden="true"><span class="contribution-initial">K.</span></div><div class="contribution-copy"><div class="contribution-meta"><span></span><time></time></div><h3 class="contribution-title"></h3><p class="contribution-description"></p><div class="contribution-byline"></div><span class="contribution-read"><span></span><span aria-hidden="true">→</span></span></div></a>';
        const link=item.querySelector('a');link.href=kloudPublicURL(post.url);
        item.querySelector('.contribution-title').textContent=post.title;
        item.querySelector('.contribution-description').textContent=post.description||'';
        item.querySelector('.contribution-meta span').textContent=post.category||'AWS';
        item.querySelector('.contribution-byline').textContent=t('contrib_author');item.querySelector('.contribution-read span').textContent=t('contrib_read');
        const date=new Date(post.date);if(Number.isFinite(date.valueOf())){const time=item.querySelector('time');time.dateTime=date.toISOString();time.textContent=new Intl.DateTimeFormat(language,{day:'numeric',month:'short',year:'numeric',timeZone:'UTC'}).format(date)}
        const image=kloudPublicURL(post.cover);
        if(image){const media=item.querySelector('.contribution-visual'),img=document.createElement('img');img.alt='';img.loading='lazy';img.decoding='async';img.addEventListener('error',()=>{media.innerHTML='<span class="contribution-initial">K.</span>'},{once:true});img.src=image;media.replaceChildren(img)}
        return item;
      });
      root.replaceChildren(...items);
    }catch{if(root.dataset.language===language&&!root.querySelector('.contribution')){status.textContent=t('contrib_empty');root.replaceChildren(status)}}
    finally{if(root.dataset.language===language)root.setAttribute('aria-busy','false')}
  };
  const start=()=>{load();contributionsTimer=setInterval(load,300000)};
  if('IntersectionObserver'in window){contributionsObserver=new IntersectionObserver(entries=>{if(entries.some(entry=>entry.isIntersecting)){contributionsObserver.disconnect();start()}},{rootMargin:'400px'});contributionsObserver.observe(root)}else{requestAnimationFrame(start)}
}
