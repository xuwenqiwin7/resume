(() => {
const root=document.getElementById('wenxin');if(!root)return;
const views={firm:['刚','行动与自持','坚定，可以先从审视自己开始。','设计关注：让行动既表达意志，也带来需要承担的后续。用可理解的反馈，呈现自持、责任与选择之间的联系。'],gentle:['柔','体察与回应','理解他人，也是一种主动的力量。','设计关注：通过人物处境与交流，赋予观察、倾听和回应以叙事意义。让玩家在作出判断之前，看见不同立场。'],balance:['济','判断与分寸','在具体处境中，寻找行动的分寸。','设计关注：把文化思辨放入叙事与策略体验，再通过回望梳理选择依据。概念的意义在参与过程中逐步形成。']};
function render(key){const v=views[key];root.querySelector('#wx-mark').textContent=v[0];root.querySelector('#wx-reflection-label').textContent=v[1];root.querySelector('#wx-reflection-title').textContent=v[2];root.querySelector('#wx-reflection-copy').textContent=v[3];root.dataset.view=key;root.querySelectorAll('[data-wx-view]').forEach(b=>{const on=b.dataset.wxView===key;b.classList.toggle('active',on);b.setAttribute('aria-pressed',String(on));});}
root.querySelectorAll('[data-wx-view]').forEach(b=>b.addEventListener('click',()=>render(b.dataset.wxView)));render('firm');
})();
(() => {
const root=document.getElementById('wenxin');if(!root)return;
const screens={title:{n:'01',title:'循墨入境',copy:'从水墨山川与人物剪影中启程，循页进入故事。',alt:'文心原道首页实机截图：水墨人物与游戏入口'},opening:{n:'02',title:'人物相逢',copy:'在人物对白与交往中推进叙事，让一次相遇成为理解故事的起点。',alt:'文心原道人物对白实机截图：双人立绘与阅读界面'},encounter:{n:'03',title:'文辩一瞥',copy:'人物、论点与场景共同构成文辩空间，让叙事与策略在同一画面中相遇。',alt:'文心原道对局实机截图局部：人物与文辩空间布局'}};
let current='title';const image=root.querySelector('#wx-screen-image'),dialog=root.querySelector('#wx-lightbox');
function select(key){current=key;const s=screens[key];image.src=`assets/wenxin/${key}.jpg`;image.alt=s.alt;root.querySelector('#wx-screen-counter').textContent=s.n+' / 03';root.querySelector('#wx-screen-title').textContent=s.title;root.querySelector('#wx-screen-copy').textContent=s.copy;root.querySelectorAll('[data-wx-screen]').forEach(b=>{const on=b.dataset.wxScreen===key;b.classList.toggle('active',on);b.setAttribute('aria-pressed',String(on));});}
root.querySelectorAll('[data-wx-screen]').forEach(b=>b.addEventListener('click',()=>select(b.dataset.wxScreen)));
root.querySelector('#wx-screen-open').addEventListener('click',()=>{const s=screens[current],large=root.querySelector('#wx-lightbox-image');large.src=image.src;large.alt=s.alt;root.querySelector('#wx-lightbox-caption').textContent=s.title+' · Demo 实机截图 · 画面节选';dialog.showModal();});
root.querySelector('#wx-lightbox-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
})();
