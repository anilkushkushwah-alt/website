(function(){
const $=(s,c=document)=>c.querySelector(s),$$=(s,c=document)=>[...c.querySelectorAll(s)];
const header=$('#header'),totop=$('#totop');
addEventListener('scroll',()=>{header.classList.toggle('scrolled',scrollY>20);totop.classList.toggle('show',scrollY>500)},{passive:true});
totop.onclick=()=>scrollTo({top:0,behavior:'smooth'});
// mobile nav
const burger=$('#burger'),nav=$('#nav');
burger.onclick=()=>{const o=nav.classList.toggle('open');burger.classList.toggle('open',o);burger.setAttribute('aria-expanded',o)};
$$('#nav a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');burger.classList.remove('open')}));
// reveal on scroll
const io=new IntersectionObserver((es)=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
$$('.reveal').forEach((el,i)=>{el.style.transitionDelay=(i%4)*70+'ms';io.observe(el)});
// counters
const cio=new IntersectionObserver((es)=>es.forEach(e=>{if(!e.isIntersecting)return;cio.unobserve(e.target);
 const el=e.target,t=+el.dataset.target,suf=el.dataset.suffix||'',d=1600,s=performance.now();
 (function f(n){const p=Math.min((n-s)/d,1),v=Math.floor(t*(1-Math.pow(1-p,3)));el.textContent=v+(p===1?suf:'');if(p<1)requestAnimationFrame(f)})(s)}),{threshold:.6});
$$('[data-target]').forEach(el=>cio.observe(el));
// accordion
$$('.acc-q').forEach(b=>b.addEventListener('click',()=>{
 const acc=b.parentNode,open=acc.classList.contains('open');
 $$('.acc.open').forEach(a=>{a.classList.remove('open');$('.acc-a',a).style.maxHeight=0;$('.acc-q',a).setAttribute('aria-expanded',false)});
 if(!open){acc.classList.add('open');const a=$('.acc-a',acc);a.style.maxHeight=a.scrollHeight+'px';b.setAttribute('aria-expanded',true)}}));
// quote form -> opens WhatsApp with the details (no backend needed)
const form=$('#quoteForm');
if(form)form.addEventListener('submit',e=>{e.preventDefault();
 const f=new FormData(form),msg=$('#fmsg');let ok=true;
 ['name','phone','email'].forEach(n=>{const i=form.elements[n];const bad=!i.value.trim()||(n==='email'&&!/^\S+@\S+\.\S+$/.test(i.value))||(n==='phone'&&i.value.replace(/\D/g,'').length<10);i.classList.toggle('err',bad);if(bad)ok=false});
 msg.className='fmsg';
 if(!ok){msg.textContent='Please fill in a valid name, phone (10+ digits) and email.';msg.classList.add('bad');return}
 const text=`New enquiry from website%0AName: ${encodeURIComponent(f.get('name'))}%0APhone: ${encodeURIComponent(f.get('phone'))}%0AEmail: ${encodeURIComponent(f.get('email'))}%0AService: ${encodeURIComponent(f.get('service'))}%0AMessage: ${encodeURIComponent(f.get('message')||'-')}`;
 msg.textContent='Thank you! Opening WhatsApp to send your enquiry…';msg.classList.add('ok');
 window.open('https://wa.me/919009607207?text='+text,'_blank');form.reset()});
})();
