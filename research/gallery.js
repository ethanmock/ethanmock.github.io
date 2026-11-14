(() => {
  const lang=window.SiteLanguage.get();
  window.SiteLanguage.set(lang);
  document.documentElement.lang=lang==='zh'?'zh-CN':'en';
  const t=x=>x[lang], e=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  document.getElementById('gallery').innerHTML=`<div class="intro"><strong>${lang==='zh'?'三个问题，三项代表工作。':'Three questions. Three research stories.'}</strong><span>${lang==='zh'?'点击探索 ↗':'Click to explore ↗'}</span></div><div class="gallery">${window.RESEARCH_WORKS.filter(w=>w.featured!==false).map(w=>`<a class="work" href="research/${w.id}.html?lang=${lang}" target="_top" style="--color:${w.color};--soft:${w.soft}"><div class="picture">${w.id==='save'?`<div class="save-picture"><strong>SAVE</strong><span>${lang==='zh'?'帮助 − 打扰':'Help − interruption'}</span><small>${lang==='zh'?'= 节省的用户步骤':'= saved user effort'}</small></div>`:`<img src="assets/highlights/${w.figures[0].src}" alt="${e(t(w.figures[0].label))}">`}</div><div class="content"><div class="meta"><span class="name">${e(w.name)}</span><span>${w.role==='first'?'①':'#'} · ${w.number}</span></div><h2>${e(t(w.teaser))}</h2><p>${e(t(w.short))}</p><div class="venue">${e(w.venue)}</div><div class="cta"><span>${lang==='zh'?'了解这项研究':'Explore this research'}</span><b aria-hidden="true">↗</b></div></div></a>`).join('')}</div><p class="archive">${lang==='zh'?'更多代表工作：':'More selected work: '}<a href="research/sign.html?lang=${lang}" target="_top">L₀-SIGN · AAAI 2021 ↗</a></p>`;
  const reportHeight=()=>window.parent.postMessage({type:'yixin-research-height',height:Math.ceil(document.body.getBoundingClientRect().height)},location.origin);
  new ResizeObserver(reportHeight).observe(document.body);
  window.addEventListener('load',reportHeight);
  reportHeight();
})();
