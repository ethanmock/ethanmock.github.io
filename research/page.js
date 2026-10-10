(() => {
  'use strict';
  const works = window.RESEARCH_WORKS;
  const work = works.find(w => w.id === document.body.dataset.work);
  let lang = new URLSearchParams(location.search).get('lang') === 'zh' ? 'zh' : 'en';
  let phase = 0, weather = 0, social = 0;
  const e = s => String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const t = obj => obj[lang];
  const say = (en,zh) => lang === 'zh' ? zh : en;
  const link = l => `<a class="button" href="${e(l.url)}" target="_blank" rel="noopener">${e(t(l.label))}<span aria-hidden="true">↗</span></a>`;
  function heading(n,title,text='') { return `<div class="section-head"><div class="section-number">${n}</div><div><h2>${e(title)}</h2>${text ? `<p>${e(text)}</p>`:''}</div></div>`; }
  function figure(f,i) {
    return `<figure class="figure"><h3>${e(t(f.label))}</h3><button class="image-button" data-figure="${i}" aria-label="${e(say('Enlarge figure: ','放大图片：')+t(f.label))}"><img src="../assets/highlights/${e(f.src)}" alt="${e(t(f.caption))}" loading="lazy"></button><div class="enlarge">${say('View full figure ↗','点击查看大图 ↗')}</div><figcaption>${e(t(f.caption))}</figcaption><div class="credit">${e(t(f.credit))} <a href="${e(work.source)}" target="_blank" rel="noopener">${say('Source','来源')}</a>${f.license?' · <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/" target="_blank" rel="noopener">CC BY-NC-ND 4.0</a>':''}</div></figure>`;
  }
  function chart() {
    if (!work.bars) return '';
    const b=work.bars;
    return `<div class="chart"><h3>${e(t(b.title))}</h3>${b.rows.map(([name,value])=>`<div class="bar-row"><span>${e(name)}</span><div class="bar-track"><div class="bar-fill" style="width:${100*(value-b.min)/(b.max-b.min)}%"></div></div><b>${value.toFixed(value<1?4:2)}</b></div>`).join('')}<div class="chart-note">${say('Bar axis starts at ','柱形坐标起点为 ')+b.min+say('; exact values shown at right.','；右侧显示准确数值。')} <a href="${e(work.source)}" target="_blank" rel="noopener">${say('Paper ↗','论文 ↗')}</a></div></div>`;
  }
  function render() {
    document.documentElement.lang=lang==='zh'?'zh-CN':'en';
    document.documentElement.style.setProperty('--accent',work.color);
    document.documentElement.style.setProperty('--soft',work.soft);
    document.title=`${work.name} — ${t(work.area)} | Yixin Su`;
    document.getElementById('app').innerHTML=`<div class="shell">
      <nav class="nav" aria-label="${say('Main navigation','主导航')}"><a class="brand" href="../">Yixin Su</a><div class="nav-right"><a href="../#research">${say('← All research','← 全部研究')}</a><button class="lang" id="lang">${say('中文','EN')}</button></div></nav>
      <header class="hero"><div class="hero-copy"><div class="eyebrow">${e(work.name)} / ${e(t(work.area))}</div><h1>${e(t(work.headline))}</h1><p class="lede">${e(t(work.summary))}</p><div class="meta"><span class="pill">${e(work.venue)}</span><span class="pill role">${work.role==='first'?say('① First author','① 第一作者'):say('# Co-first author','# 共同一作')}</span></div><div class="buttons"><a class="button primary" href="#idea">${say('Discover the idea','了解核心想法')}<span aria-hidden="true">↓</span></a>${link(work.links[0])}</div></div>
      <div class="experiment"><div class="experiment-top"><b>${say('THE IDEA, IN MOTION','动手理解核心想法')}</b><span>${say('Concept illustration','概念示意')}</span></div><div class="scene" id="scene"></div><div id="controls" class="controls"></div><p class="scene-caption" id="scene-caption" aria-live="polite"></p></div></header>
      <section class="section" id="idea">${heading('01',t(work.question),t(work.answer))}<div class="takeaway">${e(t(work.takeaway))}</div><div class="steps">${work.steps.map((s,i)=>`<article class="step"><div class="step-num">0${i+1}</div><h3>${e(t(s)[0])}</h3><p>${e(t(s)[1])}</p></article>`).join('')}</div></section>
      <section class="section" id="architecture">${heading('02',say('Inside the paper','走进论文'),say('The original figures, with a reading guide.','用原始论文图，理解方法的关键环节。'))}${work.figures.slice(0,work.id==='unipmt'?1:2).map(figure).join('')}</section>
      <section class="section" id="evidence">${heading('03',say('What the evidence shows','实验证据告诉我们什么'))}<div class="stats">${work.stats.map(s=>`<div class="stat"><strong>${e(s.value)}</strong><span>${e(t(s.label))}</span></div>`).join('')}</div><p>${e(t(work.evidence))}</p>${chart()}${work.id==='unipmt'?figure(work.figures[1],1):''}</section>
      <section class="section" id="research-focus">${heading('04',t(work.capabilityTitle),t(work.capability))}<div class="skills">${work.skills.map(s=>`<span>${e(t(s))}</span>`).join('')}</div></section>
      <section class="section" id="resources">${heading('05',say('Explore the work','深入了解这项工作'))}<div class="paper-title">${e(work.paperTitle)}</div><div class="authors">${e(work.authors)}</div><div class="buttons">${work.links.map(link).join('')}</div></section>
      <section class="section">${heading('↗',say('Continue exploring','继续探索'))}<div class="other-works">${works.filter(w=>w.id!==work.id).map(w=>`<a class="other-work" href="${w.id}.html?lang=${lang}"><div><strong>${e(w.name)}</strong><small>${e(t(w.teaser))}</small></div><span aria-hidden="true">↗</span></a>`).join('')}</div></section>
      <footer class="footer"><span>Yixin Su · ${say('School of Computer Science and Technology, HUST','华中科技大学计算机科学与技术学院')}</span><a href="mailto:suyixin@hust.edu.cn">${say('Research & collaboration','研究与合作')} ↗</a></footer></div>
      <dialog id="figure-dialog"><button class="close" id="close-dialog" aria-label="${say('Close figure','关闭图片')}">${say('Close','关闭')} ×</button><img id="dialog-image" alt=""></dialog>`;
    document.getElementById('lang').onclick=()=>{lang=lang==='en'?'zh':'en';history.replaceState(null,'',`${location.pathname}?lang=${lang}${location.hash}`);render();};
    document.querySelectorAll('[data-figure]').forEach(button=>button.onclick=()=>{
      const f=work.figures[Number(button.dataset.figure)],image=document.getElementById('dialog-image');image.src='../assets/highlights/'+f.src;image.alt=t(f.caption);document.getElementById('figure-dialog').showModal();
    });
    document.getElementById('close-dialog').onclick=()=>document.getElementById('figure-dialog').close();
    renderScene();
  }
  function control(label,id,active) { return `<button class="control${active?' active':''}" data-phase="${id}" aria-pressed="${active}">${e(label)}</button>`; }
  function signScene() {
    const nodes=[[90,60,say('User','用户')],[310,60,say('App','应用')],[330,190,say('Workday','工作日')],[200,240,say('Weather','天气')],[70,190,say('Location','地点')]],kept=['0-1','1-2','0-4','1-4'];
    let lines='';nodes.forEach((n,i)=>nodes.slice(i+1).forEach((m,k)=>{const j=i+1+k,keep=kept.includes(`${i}-${j}`);lines+=`<line x1="${n[0]}" y1="${n[1]}" x2="${m[0]}" y2="${m[1]}" stroke="${keep&&phase?work.color:'#c6c1d5'}" stroke-width="${keep&&phase?3:1.5}" opacity="${phase&&!keep?.12:.85}" ${!keep?'stroke-dasharray="5 5"':''}/>`;}));
    return `<svg viewBox="0 0 400 290" role="img" aria-label="${say('Feature graph before and after sparse selection','稀疏选择前后的特征图')}">${lines}${nodes.map(n=>`<circle cx="${n[0]}" cy="${n[1]}" r="28" fill="white" stroke="${work.color}" stroke-width="2"/><text x="${n[0]}" y="${n[1]+4}" text-anchor="middle" font-size="10" fill="${work.color}">${e(n[2])}</text>`).join('')}</svg>`;
  }
  function immuneScene() {
    const nodes=[[65,90,'P',say('Peptide','多肽')],[285,90,'M',say('MHC','MHC')],[175,255,'T',say('TCR','TCR')]],colors=['#43a5b7','#bf89aa','#e6a26b'];
    const edges=[[0,1],[0,2],[1,2]];
    return `<svg viewBox="0 0 350 320" role="img" aria-label="${say('Peptide, MHC and TCR binding relationships','多肽、MHC 与 TCR 的结合关系')}">${edges.map(([i,j],k)=>`<line x1="${nodes[i][0]}" y1="${nodes[i][1]}" x2="${nodes[j][0]}" y2="${nodes[j][1]}" stroke="${phase===2||phase===k?work.color:'#ddd8e4'}" stroke-width="${phase===2||phase===k?4:2}" ${phase===2||phase===k?'':'stroke-dasharray="5 6"'}/>`).join('')}${phase===2?`<circle cx="175" cy="145" r="20" fill="${work.soft}"/><text x="175" y="150" text-anchor="middle" fill="${work.color}" font-size="15">＋</text>`:''}${nodes.map((n,i)=>`<circle cx="${n[0]}" cy="${n[1]}" r="32" fill="${colors[i]}"/><text x="${n[0]}" y="${n[1]+8}" text-anchor="middle" font-size="25" fill="white">${n[2]}</text><text x="${n[0]}" y="${n[1]+52}" text-anchor="middle" font-size="12" fill="#747284">${e(n[3])}</text>`).join('')}</svg>`;
  }
  function renderScene() {
    const scene=document.getElementById('scene'),controls=document.getElementById('controls'),caption=document.getElementById('scene-caption');
    if(work.id==='sign') {
      scene.innerHTML=signScene();controls.innerHTML=control(say('All candidate links','全部候选连接'),0,phase===0)+control(say('Learn sparse links','学习稀疏连接'),1,phase===1);
      caption.textContent=phase?say('Keep useful interactions, suppress noise. This simplified graph illustrates the idea; these edges are not model predictions.','保留有用交互，抑制噪声。此图仅解释想法，示意边并非模型预测结果。'):say('Many candidate interactions compete for the model’s attention. Click to see the selection idea.','大量候选交互同时进入模型。点击按钮，看看自动筛选的核心想法。');
    } else if(work.id==='unipmt') {
      scene.innerHTML=immuneScene();controls.innerHTML=['P–M','P–T','P–M–T'].map((label,i)=>control(label,i,phase===i)).join('');
      caption.textContent=[say('Presentation: can the MHC bind and present the peptide?','呈递：MHC 能否结合并呈递该多肽？'),say('Recognition: can a TCR bind the peptide?','识别：TCR 能否与该多肽结合？'),say('The full relationship: peptide presentation and TCR recognition, learned with the two related tasks. This is a conceptual view, not a binding prediction.','完整关系：将多肽呈递与 TCR 识别，以及两项相关任务联合学习。此处为概念示意，不输出结合预测。')][phase];
    } else {
      const food=weather===0?(social===0?say('Warm vegetables','温热蔬菜'):say('Hot pot to share','一起吃火锅')):(social===0?say('A fresh salad','清爽沙拉'):say('A shared cold platter','共享冷盘'));
      scene.innerHTML=`<div class="context-box"><div class="factor"><small>${say('INTRINSIC','内在因素')}</small><strong>${say('A taste for healthy food','偏好健康饮食')}</strong><p>${say('Stable across the illustrated contexts','在示意情境中保持稳定')}</p></div><div class="factor"><small>${say('EXTRINSIC','外在因素')}</small><strong>${weather===0?say('Cold weather','冷天'):say('Hot weather','热天')}</strong><p>${social===0?say('Eating alone','独自用餐'):say('Eating with friends','与朋友用餐')}</p></div><div class="food-result">${say('An illustrative choice → ','示意选择 → ')}${food}</div></div>`;
      controls.innerHTML=control(say('Cold','冷天'),'cold',weather===0)+control(say('Hot','热天'),'hot',weather===1)+control(say('Alone','独自'),'alone',social===0)+control(say('With friends','与朋友'), 'friends',social===1);
      caption.textContent=say('Change the context: the preference stays, the situation changes. This example illustrates disentanglement, not recommendations from a running IEDR model.','改变情境：偏好保持稳定，外在因素随之变化。此示例用于解释解耦，并非运行 IEDR 模型生成的推荐。');
    }
    controls.querySelectorAll('button').forEach(button=>button.onclick=()=>{const p=button.dataset.phase;if(work.id==='iedr'){if(p==='cold'||p==='hot')weather=p==='hot'?1:0;else social=p==='friends'?1:0;}else phase=Number(p);renderScene();});
  }
  render();
})();
