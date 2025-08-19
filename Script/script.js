
(() => {
  
  const header = document.querySelector('.site-header');
  function setHeaderVar(){
    const h = header ? Math.round(header.getBoundingClientRect().height) : 0;
    document.documentElement.style.setProperty('--header-h', `${h}px`);
  }
  setHeaderVar();
  window.addEventListener('resize', setHeaderVar);

  
  function headerOffset(){
    return parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 0;
  }
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - (headerOffset() + 8);
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  
  const links = [...document.querySelectorAll('.nav-list a')];
  const sections = ['home','about','projects','contact']
    .map(id => document.getElementById(id))
    .filter(Boolean);
  const linkFor = id => links.find(a => a.getAttribute('href') === `#${id}`);

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      links.forEach(l => l.classList.remove('is-active'));
      const l = linkFor(entry.target.id);
      if (l) l.classList.add('is-active');
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0.01 });
  sections.forEach(s => io.observe(s));

  /*  Toggle menú móvil  */
const btn = document.querySelector('.nav-toggle');
const nav = document.getElementById('primary-nav');
const backdrop = document.querySelector('.nav-backdrop');

function openNav(){
  document.body.classList.add('nav-open');
  btn && btn.setAttribute('aria-expanded','true');
  if (backdrop) backdrop.hidden = false;
}
function closeNav(){
  document.body.classList.remove('nav-open');
  btn && btn.setAttribute('aria-expanded','false');
  if (backdrop) backdrop.hidden = true;
}
function toggleNav(){ document.body.classList.contains('nav-open') ? closeNav() : openNav(); }

btn && btn.addEventListener('click', toggleNav);
backdrop && backdrop.addEventListener('click', closeNav);


nav && nav.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', () => {
    if (window.matchMedia('(max-width: 768px)').matches) closeNav();
  });
});


window.matchMedia('(min-width: 769px)').addEventListener('change', e => {
  if (e.matches) closeNav();
});

/*  Typewriter  */
  const nameEl = document.getElementById('name');
  let typeTimer = null;

  function typewriter(text, speed = 90) {
    // Reinicia animación
    if (typeTimer) clearTimeout(typeTimer);
    nameEl.textContent = '';
    let i = 0;

    (function step() {
      if (i < text.length) {
        nameEl.textContent += text.charAt(i++);
        typeTimer = setTimeout(step, speed);
      }
    })();
  }

  /*  Cambio de idioma  */
  let lang = 'en'; 

  function applyLang() {
  
  document.querySelectorAll('[data-en],[data-fr]').forEach(el => {
    if (el === nameEl) return;
    const val = el.dataset[lang];
    if (typeof val === 'string') el.textContent = val;
  });

  
  const nameText = nameEl ? (nameEl.dataset[lang] || '') : '';
  if (nameEl) typewriter(nameText);

 
  const btn = document.getElementById('lang-btn');
  if (btn) btn.textContent = (lang === 'en') ? 'FR' : 'EN';
}
  

  function toggleLang(e) {
    
    if (e && e.preventDefault) e.preventDefault();
    lang = (lang === 'en') ? 'fr' : 'en';
    applyLang();
  }

  /* Inicialización  */
  document.addEventListener('DOMContentLoaded', () => {
    
    applyLang();

    const btn = document.getElementById('lang-btn');
    if (btn) btn.addEventListener('click', toggleLang);
  });
})();
