const navigationRoot=document.querySelector('.site-nav');
const navigationToggle=navigationRoot.querySelector('.nav-toggle');
const navigationPanel=document.querySelector('#site-navigation');
const compactNavigation=matchMedia('(max-width:1079px)');
let navigationLanguage='fr';
function updateNavigationLanguage(language){
  navigationLanguage=language;
  const expanded=navigationToggle.getAttribute('aria-expanded')==='true';
  navigationToggle.setAttribute('aria-label',language==='fr'?(expanded?'Fermer le menu':'Ouvrir le menu'):(expanded?'Close menu':'Open menu'));
  navigationRoot.setAttribute('aria-label',language==='fr'?'Navigation principale':'Main navigation');
}
function setNavigationOpen(open,restoreFocus=false){
  const expanded=Boolean(open&&compactNavigation.matches);
  navigationRoot.dataset.menuOpen=String(expanded);
  navigationToggle.setAttribute('aria-expanded',String(expanded));
  updateNavigationLanguage(navigationLanguage);
  if(restoreFocus)navigationToggle.focus({preventScroll:true});
}
navigationToggle.addEventListener('click',event=>{
  const open=navigationToggle.getAttribute('aria-expanded')!=='true';setNavigationOpen(open);
  if(open&&event.detail===0)navigationPanel.querySelector('a')?.focus({preventScroll:true});
});
navigationRoot.addEventListener('click',event=>{if(event.target.closest('a[href^="#"]'))setNavigationOpen(false)});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&navigationToggle.getAttribute('aria-expanded')==='true'){event.preventDefault();setNavigationOpen(false,true)}});
document.addEventListener('click',event=>{if(!navigationRoot.contains(event.target))setNavigationOpen(false)});
compactNavigation.addEventListener('change',()=>{
  const wasInside=navigationPanel.contains(document.activeElement);
  setNavigationOpen(false,compactNavigation.matches&&wasInside);
});
