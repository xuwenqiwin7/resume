(() => {
 const root=document.getElementById('socioverse'),data=window.SV_PUBLIC_STATS;
 if(!root||!data)return;
 const period=root.querySelector('#sv-period'),kind=root.querySelector('#sv-kind');
 const labels={weibo:'微博',xiaohongshu:'小红书',zhihu:'知乎',taptap:'TapTap'};
 const colors={weibo:'#456b96',xiaohongshu:'#708caa',zhihu:'#1e3a8a',taptap:'#568a86'};
 const names={all:'全部类型',comment:'评论',post:'主帖',forum_post:'论坛帖子',review:'游戏评价'};
 function render(){const selected=data.periods.find(p=>p.id===period.value);const cells=selected.cells.filter(c=>kind.value==='all'||c.kind===kind.value);const total=cells.reduce((s,c)=>s+c.count,0);const byPlatform=Object.keys(labels).map(p=>({platform:p,count:cells.filter(c=>c.platform===p).reduce((s,c)=>s+c.count,0)}));root.querySelector('#sv-audit-status').innerHTML=`<b>${total.toLocaleString()} 条</b><span>${selected.label} · ${names[kind.value]}${selected.start?` · 2026.${selected.start.slice(5).replace('-','.')}—${selected.end.slice(5).replace('-','.')}`:' · 覆盖全部已取得内容的发布时间'}</span>`;root.querySelector('#sv-audit-bars').innerHTML=byPlatform.map(c=>{const share=total?c.count/total*100:0;return `<div class="sv-bar-row"><div class="sv-bar-label"><span>${labels[c.platform]}</span><b>${c.count.toLocaleString()} · ${share.toFixed(1)}%</b></div><div class="sv-bar-track"><div class="sv-bar-fill" style="width:${share}%;background:${colors[c.platform]}"></div></div></div>`;}).join('');}
 period.addEventListener('change',render);kind.addEventListener('change',render);render();
 root.querySelector('#sv-audit-table').innerHTML=Object.entries(labels).map(([p,label])=>{const cells=data.raw_by_platform_kind.filter(c=>c.platform===p),raw=cells.reduce((s,c)=>s+c.raw,0),unique=cells.reduce((s,c)=>s+c.unique,0);return `<tr><th scope="row">${label}</th><td>${raw.toLocaleString()}</td><td>${unique.toLocaleString()}</td><td>${(raw-unique).toLocaleString()}</td></tr>`;}).join('')+`<tr><th scope="row">合计</th><td>${data.raw_observations.toLocaleString()}</td><td>${data.unique_records.toLocaleString()}</td><td>${data.removed_duplicate_observations.toLocaleString()}</td></tr>`;
})();
