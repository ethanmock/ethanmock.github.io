(() => {
  const lang=new URLSearchParams(location.search).get('lang')==='zh'?'zh':'en';
  document.documentElement.lang=lang==='zh'?'zh-CN':'en';
  const t=x=>x[lang], e=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  document.getElementById('gallery').innerHTML=`<div class="intro"><strong>${lang==='zh'?'三个问题，三项代表工作。':'Three questions. Three research stories.'}</strong><span>${lang==='zh'?'点击探索 ↗':'Click to explore ↗'}</span></div><div class="gallery">${window.RESEARCH_WORKS.map(w=>`<a class="work" href="research/${w.id}.html?lang=${lang}" target="_top" style="--color:${w.color};--soft:${w.soft}"><div class="picture"><img src="assets/highlights/${w.figures[0].src}" alt="${e(t(w.figures[0].label))}"></div><div class="content"><div class="meta"><span class="name">${e(w.name)}</span><span>${w.role==='first'?'①':'#'} · ${w.number}</span></div><h2>${e(t(w.teaser))}</h2><p>${e(t(w.short))}</p><div class="venue">${e(w.venue)}</div><div class="cta"><span>${lang==='zh'?'了解这项研究':'Explore this research'}</span><b aria-hidden="true">↗</b></div></div></a>`).join('')}</div>`;
  const reportHeight=()=>window.parent.postMessage({type:'yixin-research-height',height:Math.ceil(document.body.getBoundingClientRect().height)},location.origin);
  new ResizeObserver(reportHeight).observe(document.body);
  window.addEventListener('load',reportHeight);
  reportHeight();
})();
