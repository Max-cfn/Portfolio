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
  function passport(){
    const {master,bachelor,exchange}=data();
    return intro(tr('Mon passeport académique.','My academic passport.'),sectionLabel())+
      `<div class="e2-book"><div class="e2-book-page e2-book-curriculum"><header><span class="e2-eyebrow">${tr('01 / CURSUS PRINCIPAL','01 / MAIN CURRICULUM')}</span>${logo(master)}</header><h4>EFREI Paris</h4><p class="e2-book-location">Paris, France · 2019 — 2024</p><div class="e2-book-degrees">${[master,bachelor].map(e=>`<article><span class="e2-date">${val(e.y)}</span><h5>${val(e.t)}</h5></article>`).join('')}</div><span class="e2-book-footer">EFREI · PARIS · FORMATION / EDUCATION</span></div><div class="e2-book-page e2-book-international"><header><span class="e2-eyebrow">${tr('02 / SEMESTRE INTERNATIONAL','02 / INTERNATIONAL SEMESTER')}</span><span>CA</span></header>${logo(exchange)}<h4>Concordia University</h4><p class="e2-book-location">Montréal, Canada</p><span class="e2-visa-stamp">${tr('SEMESTRE UNIVERSITAIRE','ACADEMIC SEMESTER')}<b>2022</b>MONTRÉAL</span><dl><div><dt>${tr('Période','Period')}</dt><dd>${val(exchange.y)}</dd></div><div><dt>${tr('Enseignement','Teaching')}</dt><dd>${tr('En anglais','In English')}</dd></div><div><dt>${tr('Rattachement','Home curriculum')}</dt><dd>EFREI Paris</dd></div></dl><p class="e2-book-note">${tr('Un semestre d’échange dans le cursus EFREI, au sein de Concordia University.','An exchange semester within the EFREI curriculum, at Concordia University.')}</p></div></div>`;
  }
  function ticketPage(){const {master,bachelor}=data();return intro(tr('Destination : un semestre à Montréal.','Destination: a semester in Montréal.'),tr('Le billet raconte la mobilité. La frise rappelle le cursus dans lequel elle s’inscrit.','The ticket tells the mobility story. The timeline shows the surrounding curriculum.'))+boarding()+`<div class="e2-ticket-curriculum"><div class="e2-ticket-curriculum-label"><span class="e2-eyebrow">${tr('LE CURSUS À PARIS','THE CURRICULUM IN PARIS')}</span><span>EFREI · 2019 — 2024</span></div><div class="e2-ticket-degrees">${degree(bachelor,true)}${degree(master,true)}</div></div>`;}

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
