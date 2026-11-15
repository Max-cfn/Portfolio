/* Academic journeys: new frise and passport studies, using confirmed portfolio data. */
(() => {
  'use strict';
  const mode=Number(document.currentScript.dataset.concept);
  const tr=(a,b)=>LANG==='fr'?a:b;
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const val=v=>esc(pick(v));
  const data=()=>({master:CONFIG.edu[0],exchange:CONFIG.edu[1],bachelor:CONFIG.edu[2]});
  const logo=e=>`<img class="e2-logo" src="${e.logo.src}" alt="${esc(e.logo.alt)}" loading="lazy">`;
  const plane=()=>'<span class="e2-plane" aria-hidden="true">&#9992;&#65038;</span>';
  const intro=(title,sub)=>`<header class="e2-intro"><span class="e2-eyebrow">${tr('FORMATION UNIVERSITAIRE','ACADEMIC EDUCATION')}</span><h3>${title}</h3><p>${sub}</p></header>`;
  const sectionLabel=()=>tr('Cursus EFREI · Semestre Concordia','EFREI curriculum · Concordia semester');

  function degree(e,small=false){
    return `<article class="e2-degree ${small?'e2-degree-compact':''}"><div class="e2-degree-top"><span class="e2-date">${val(e.y)}</span><span class="e2-place">PARIS · FR</span></div>${logo(e)}<h4>${val(e.t)}</h4><p>${val(e.p)}</p></article>`;
  }
  function boarding(compact=false){
    const {exchange}=data();
    return `<article class="e2-boarding ${compact?'e2-boarding-compact':''}" aria-label="${tr('Semestre international à Concordia University, janvier à mai 2022','International semester at Concordia University, January to May 2022')}"><div class="e2-boarding-main"><header class="e2-boarding-head"><span>${plane()} ${tr('MOBILITÉ UNIVERSITAIRE','ACADEMIC MOBILITY')}</span><span>2022</span></header><div class="e2-boarding-route"><div><small>${tr('ÉTABLISSEMENT D’ORIGINE','HOME INSTITUTION')}</small><b>Paris</b><span>EFREI · France</span></div><div class="e2-flight-line" aria-hidden="true"><span></span>${plane()}<span></span></div><div><small>${tr('UNIVERSITÉ D’ACCUEIL','HOST UNIVERSITY')}</small><b>Montréal</b><span>Concordia · Canada</span></div></div><div class="e2-boarding-fields"><div><small>${tr('PÉRIODE','PERIOD')}</small><b>${val(exchange.y)}</b></div><div><small>${tr('FORMAT','FORMAT')}</small><b>${tr('Semestre à l’étranger','Semester abroad')}</b></div><div><small>${tr('LANGUE DES COURS','COURSE LANGUAGE')}</small><b>${tr('Anglais','English')}</b></div></div><p class="e2-boarding-context">${tr('Mobilité académique au cours du cursus EFREI Paris.','Academic mobility during the EFREI Paris curriculum.')}</p></div><aside class="e2-boarding-stub"><span>${tr('SEMESTRE','SEMESTER')}</span>${logo(exchange)}<strong>MONTRÉAL</strong><b>2022</b><span class="e2-barcode" aria-hidden="true"></span><small>EFREI → CONCORDIA</small></aside></article>`;
  }
  function campus(){
    const {master,bachelor,exchange}=data();
    return intro(tr('Un cursus à Paris.<br>Un semestre à Montréal.','Studies in Paris.<br>A semester in Montréal.'),tr('Les deux étapes du cursus EFREI, avec une mobilité universitaire au Canada en 2022.','Two stages at EFREI, with an academic semester in Canada in 2022.'))+
      `<div class="e2-campus"><div class="e2-campus-line"><span>2019</span><span>2022</span><span>2024</span></div><div class="e2-campus-degrees">${degree(bachelor)}${degree(master)}</div><aside class="e2-campus-mobility"><span class="e2-branch-cap" aria-hidden="true">↳</span><div>${logo(exchange)}<span class="e2-eyebrow">${tr('UNE PARENTHÈSE INTERNATIONALE DANS LE CURSUS','AN INTERNATIONAL SEMESTER WITHIN THE CURRICULUM')}</span><h4>Concordia University</h4><p>${val(exchange.y)} · Montréal, Canada</p><span class="e2-language">${tr('Cours en anglais','Courses in English')}</span></div><span class="e2-campus-stamp">CA<br><b>2022</b></span></aside></div>`;
  }
  function itinerary(){
    const {master,bachelor,exchange}=data();
    return intro(tr('La ligne du cursus.','The academic line.'),tr('Une lecture par périodes : le cursus à Paris et le semestre d’échange à Montréal.','Read by period: studies in Paris and an exchange semester in Montréal.'))+
      `<div class="e2-itinerary"><div class="e2-itinerary-school"><div>${logo(master)}<span>${tr('CURSUS PRINCIPAL · PARIS','MAIN CURRICULUM · PARIS')}</span></div><b>2019 — 2024</b></div><div class="e2-years">${['2019','2020','2021','2022','2023','2024'].map(y=>`<span>${y}</span>`).join('')}</div><div class="e2-periods"><article class="e2-period-bachelor"><span>2019 — 2022</span><h4>${val(bachelor.t)}</h4><p>EFREI Paris · ${tr('prépa intégrée','BioInformatics minor')}</p></article><article class="e2-period-master"><span>2022 — 2024</span><h4>${val(master.t)}</h4><p>EFREI Paris</p></article></div><div class="e2-exchange-pin"><span aria-hidden="true"></span><b>2022</b><span>${tr('MOBILITÉ INTERNATIONALE','INTERNATIONAL SEMESTER')}</span></div><div class="e2-exchange-ledger">${logo(exchange)}<div><h4>Concordia University</h4><p>${tr('Semestre à l’étranger · cours en anglais','Semester abroad · courses in English')}</p></div><div><span class="e2-date">${val(exchange.y)}</span><p>Montréal, Canada</p></div></div></div>`;
  }
function compactEFREI(layout){
 const {master,bachelor,exchange}=data();
 const studies=[master,bachelor].map(e=>`<article class="e3-course"><span>${val(e.y)}</span><h4>${val(e.t)}</h4></article>`).join('');
 const abroad=layout==='book'
 ? `<aside class="e3-exchange">${logo(exchange)}<div><span class="e3-label">${tr('SEMESTRE À L’ÉTRANGER','SEMESTER ABROAD')}</span><h4>Concordia University</h4><p>Montréal, Canada · ${tr('Anglais','English')}</p></div><div class="e3-exchange-date"><span>${val(exchange.y)}</span><span class="e3-small-stamp">CA <b>2022</b></span></div></aside>`
 : `<aside class="e3-flight"><div class="e3-flight-main"><span class="e3-label">${tr('SEMESTRE À L’ÉTRANGER','SEMESTER ABROAD')}</span><div class="e3-flight-cities"><b>Paris</b><span aria-hidden="true">✈︎</span><b>Montréal</b></div><p>EFREI Paris → Concordia University · ${tr('Anglais','English')}</p></div><div class="e3-flight-stub">${logo(exchange)}<span>${val(exchange.y)}</span><span class="e3-tiny-barcode" aria-hidden="true"></span></div></aside>`;
 return `<div class="e3-quiet e3-quiet-${layout}"><header class="e3-school">${logo(master)}<div><h3>EFREI Paris</h3><span>Paris, France · 2019 — 2024</span></div></header><div class="e3-courses">${studies}</div>${abroad}</div>`;
}
function passport(){return compactEFREI('book');}

  /* Education is composed of independent milestones and a reusable travel ticket. */
  function semesterTicket(exchange){
    const {master}=data();
    return `<article class="e4-ticket" aria-label="${tr('Échange universitaire à Concordia, janvier à mai 2022','Academic exchange at Concordia, January to May 2022')}">
      <header class="e4-ticket-band"><span>${tr('ÉCHANGE UNIVERSITAIRE','ACADEMIC EXCHANGE')}</span><span class="e4-canada-label"><img src="assets/flag-ca.svg" class="e4-canada-flag" alt="${tr('Drapeau du Canada','Flag of Canada')}" width="24" height="18"> CA / 2022</span></header>
      <div class="e4-ticket-body"><div class="e4-ticket-content">
        <div class="e4-route"><div><span class="e4-country-mark">FRANCE <img class="e4-route-flag" src="assets/flag-fr.svg" alt="${tr('Drapeau français','French flag')}" width="20" height="15"></span><strong>Paris</strong></div><span class="e4-route-line" aria-hidden="true">✈︎</span><div><span class="e4-country-mark">CANADA <img class="e4-route-flag" src="assets/flag-ca.svg" alt="${tr('Drapeau du Canada','Canadian flag')}" width="20" height="15"></span><strong>Montréal</strong></div></div>
        <div class="e4-schools"><div class="e4-origin">${logo(master)}<span>${tr("École d’ingénieurs","Engineering school")}</span></div><div class="e4-host">${logo(exchange)}<span>Concordia University</span></div></div>
        <dl class="e4-ticket-fields"><div><dt>${tr('PÉRIODE','PERIOD')}</dt><dd>${val(exchange.y)}</dd></div><div><dt>${tr('CURSUS','CURRICULUM')}</dt><dd>${tr('Cursus anglophone','English-language programme')}</dd></div></dl>
      </div><aside class="e4-ticket-stub" aria-hidden="true"><span class="e4-stub-title">${tr("CARTE D’EMBARQUEMENT","BOARDING PASS")}</span><span class="e4-aircraft">✈︎</span><span class="e4-stub-route e4-airport-codes">CDG – YUL</span><span class="e4-barcode"></span><span>2022</span></aside></div>
    </article>`;
  }
  function ticketTimeline(){
    const {master,bachelor,exchange}=data();
    const steps=[
      {kind:'degree',value:master},
      {kind:'exchange',value:exchange},
      {kind:'degree',value:bachelor}
    ];
    return `<div class="e4-education"><header class="e4-school">${logo(master)}<div><h3>EFREI Paris</h3><span>2019 — 2024 · Paris, France</span></div></header>
      <ol class="e4-timeline">${steps.map(step=>`<li class="e4-step e4-step-${step.kind}"><span class="e4-node" aria-hidden="true"></span>${step.kind==='exchange'?semesterTicket(step.value):`<article class="e4-degree"><span class="e4-period">${val(step.value.y)}</span><div class="e4-degree-copy"><h4>${val(step.value.t)}</h4><p>${tr("EFREI Paris · École d’ingénieurs","EFREI Paris · Engineering school")}</p></div></article>`}</li>`).join('')}</ol></div>`;
  }
  function ticketPage(){return ticketTimeline();}


  function academicMilestones(){
    const {master,bachelor}=data();
    const root=document.querySelector('#tl-root');root.classList.add(mode===8?'e2-unified-rail':'e2-passport-rail');
    const first=document.createElement('section');first.id='education-chrono';first.className='e2-path-study e2-path-master';
    first.innerHTML=`<div class="e2-path-meta"><span class="e2-path-dot" aria-hidden="true"></span><span>2024</span><span>${tr('FORMATION · EFREI PARIS','EDUCATION · EFREI PARIS')}</span></div>${degree(master)}`;
    const also=root.querySelector('.emp[data-company="also"]');also.before(first);
    const second=document.createElement('section');second.className='e2-path-study e2-path-bachelor';
    second.innerHTML=`<div class="e2-path-meta"><span class="e2-path-dot" aria-hidden="true"></span><span>2019 — 2022</span><span>${tr('FORMATION & MOBILITÉ','EDUCATION & MOBILITY')}</span></div>${degree(bachelor)}${mode===12?boarding(true):`<div class="e2-path-exchange">${plane()}<div><span class="e2-date">${val(data().exchange.y)}</span><h4>Concordia University · Montréal</h4><p>${tr('Semestre à l’étranger au cours du cursus EFREI. Cours en anglais.','Semester abroad during the EFREI curriculum. Courses in English.')}</p></div>${logo(data().exchange)}</div>`}`;root.append(second);
    if(mode===12){first.classList.add('e2-visa-milestone');second.classList.add('e2-visa-milestone');}
    scheduleChronoFlow();
  }
  function addArchEducation(){
    document.querySelector('#education-arch')?.remove();const block=document.createElement('section');block.id='education-arch';block.className='e2-arch-education';block.innerHTML=mode===8?campus():passport()+boarding(true);document.querySelector('#arch-canvas').after(block);
  }
  const oldArch=renderArch,oldChrono=renderChrono;
  renderEdu=function(){
    const section=document.querySelector('#edu');
    if(mode===8||mode===12){section.style.display='none';document.querySelectorAll('a[data-t="nav_edu"]').forEach(a=>{a.href='#education-chrono';a.onclick=()=>setView('chrono');});}
    else{section.classList.add('e2-education','e2-concept-'+mode);document.querySelector('#edu-root').innerHTML=({7:campus,9:itinerary,10:passport,11:ticketPage})[mode]();}
  };
  if(mode===8||mode===12){
    CONFIG.ui.fr.s1='Parcours & formation';CONFIG.ui.en.s1='Experience & education';
    CONFIG.ui.fr.s1_sub='Expériences, cursus EFREI et semestre à Concordia : les étapes d’un même parcours.';
    CONFIG.ui.en.s1_sub='Professional experience, the EFREI curriculum and a semester at Concordia: one connected journey.';
    renderArch=function(){oldArch();addArchEducation();};renderChrono=function(){oldChrono();academicMilestones();};
    renderStatic();renderArch();renderChrono();
    if(document.querySelector('#tab-chrono').getAttribute('aria-selected')==='true')setView('chrono');
  }
  renderEdu();
  function settleAnchor(){
    const id=decodeURIComponent(location.hash.slice(1));
    if(['edu','education-chrono','education-arch'].includes(id)){const target=document.getElementById(id);if(target)target.scrollIntoView({block:'start',behavior:'instant'});}
    scheduleArchWires();scheduleChronoFlow();
  }
  requestAnimationFrame(settleAnchor);if(document.fonts)document.fonts.ready.then(settleAnchor);
})();
