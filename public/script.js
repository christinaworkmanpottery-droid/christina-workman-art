// Nav scroll
const nav=document.getElementById('nav');
window.addEventListener('scroll',()=>nav.classList.toggle('scrolled',window.scrollY>50));

// Mobile menu
const navToggle=document.getElementById('navToggle'),navLinks=document.getElementById('navLinks');
navToggle.addEventListener('click',()=>{
  navLinks.classList.toggle('open');
  const s=navToggle.querySelectorAll('span');
  if(navLinks.classList.contains('open')){s[0].style.transform='rotate(45deg) translate(5px,5px)';s[1].style.opacity='0';s[2].style.transform='rotate(-45deg) translate(5px,-5px)'}
  else{s[0].style.transform='';s[1].style.opacity='';s[2].style.transform=''}
});
navLinks.querySelectorAll('a').forEach(l=>l.addEventListener('click',()=>{
  navLinks.classList.remove('open');
  const s=navToggle.querySelectorAll('span');s[0].style.transform='';s[1].style.opacity='';s[2].style.transform='';
}));

// Lightbox
const lightbox=document.getElementById('lightbox'),lbImg=document.getElementById('lbImg');
const items=document.querySelectorAll('.gallery-item');
let currentIdx=0;
items.forEach((item,i)=>{
  item.addEventListener('click',()=>{currentIdx=i;openLightbox()});
});
function openLightbox(){
  const img=items[currentIdx].querySelector('img');
  lbImg.src=img.src;lbImg.alt=img.alt;
  lightbox.classList.add('active');document.body.style.overflow='hidden';
}
function closeLightbox(){lightbox.classList.remove('active');document.body.style.overflow=''}
document.getElementById('lbClose').addEventListener('click',closeLightbox);
document.getElementById('lbPrev').addEventListener('click',()=>{currentIdx=(currentIdx-1+items.length)%items.length;openLightbox()});
document.getElementById('lbNext').addEventListener('click',()=>{currentIdx=(currentIdx+1)%items.length;openLightbox()});
lightbox.addEventListener('click',e=>{if(e.target===lightbox)closeLightbox()});
document.addEventListener('keydown',e=>{
  if(!lightbox.classList.contains('active'))return;
  if(e.key==='Escape')closeLightbox();
  if(e.key==='ArrowLeft'){currentIdx=(currentIdx-1+items.length)%items.length;openLightbox()}
  if(e.key==='ArrowRight'){currentIdx=(currentIdx+1)%items.length;openLightbox()}
});

// Contact form
document.getElementById('contactForm').addEventListener('submit',e=>{
  e.preventDefault();
  document.getElementById('contactSuccess').classList.add('show');
  e.target.reset();
  setTimeout(()=>document.getElementById('contactSuccess').classList.remove('show'),5000);
});

// Fade in sections
const obs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')});
},{threshold:0.1});
document.querySelectorAll('.section').forEach(s=>obs.observe(s));
