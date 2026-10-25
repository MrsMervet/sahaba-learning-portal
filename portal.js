'use strict';
(()=>{
  const input=document.getElementById('search'),grid=document.getElementById('journey-grid'),cards=[...grid.querySelectorAll('.journey')],filters=[...document.querySelectorAll('[data-filter]')],count=document.getElementById('result-count'),note=document.getElementById('filter-note'),empty=document.getElementById('empty');
  let mode='all';
  const normalize=s=>s.normalize('NFKD').replace(/[\u064b-\u065f\u0670ـ]/g,'').replace(/[أإآٱ]/g,'ا').replace(/ى/g,'ي').replace(/ة/g,'ه').replace(/\s+/g,'').toLowerCase();
  const ar=n=>String(n).replace(/\d/g,d=>'٠١٢٣٤٥٦٧٨٩'[d]);
  function render(){
    const query=normalize(input.value);let visible=0;
    for(const card of cards){const matches=normalize(card.dataset.name).includes(query),available=mode!=='pdf'||card.dataset.pdf==='true';card.hidden=!(matches&&available);if(!card.hidden)visible++;}
    grid.dataset.mode=mode;empty.hidden=visible!==0;
    count.textContent=visible===0?'لا توجد نتائج':visible===1?'رحلة واحدة':visible===2?'رحلتان تعليميتان':ar(visible)+' رحلات تعليمية';
    note.textContent=mode==='pdf'?'ثلاثة ملخصات جاهزة، كل ملف من صفحتين: شرح وتمارين. افتح ملف الصحابي المناسب لقراءته أو طباعته.':mode==='game'?'اختر «ألعب وأتحدى» للدخول مباشرة إلى اللعبة. تفتح الألعاب في تبويب جديد.':mode==='lesson'?'اختر «أتعلم السيرة» لاستكشاف البطاقات والتدريبات التفاعلية.':'اختر الدرس أو اللعبة من بطاقة الصحابي. ستفتح في تبويب جديد لتبقى البوابة معك.';
    for(const button of filters)button.setAttribute('aria-pressed',String(button.dataset.filter===mode));
  }
  filters.forEach(button=>button.addEventListener('click',()=>{mode=button.dataset.filter;render()}));
  input.addEventListener('input',render);
  document.getElementById('reset-search').addEventListener('click',()=>{input.value='';mode='all';render();input.focus()});
  document.querySelectorAll('.pdf-shortcut').forEach(button=>button.addEventListener('click',()=>{input.value='';mode='pdf';render();document.getElementById('journeys').scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'})}));
  render();
})();
