/* ========================================================
   main.js — Sriram Kannan Portfolio
   ======================================================== */

/* ---------- Particle background ---------- */
(function spawnParticles() {
  const container = document.querySelector('.particles');
  if (!container) return;
  const colors = ['rgba(0,212,255,0.6)', 'rgba(168,85,247,0.5)', 'rgba(0,212,255,0.3)'];
  const count = window.innerWidth < 600 ? 12 : 22;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 3 + 1;
    p.style.cssText = `
      width:${size}px; height:${size}px;
      left:${Math.random()*100}%;
      background:${colors[Math.floor(Math.random()*colors.length)]};
      animation-duration:${Math.random()*18+10}s;
      animation-delay:${Math.random()*10}s;
      border-radius:50%;
    `;
    container.appendChild(p);
  }
})();

/* ---------- Nav: hamburger toggle ---------- */
const navToggle = document.getElementById('nav-toggle');
const navLinks  = document.getElementById('nav-links');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', navLinks.classList.contains('open'));
  });
  document.addEventListener('click', e => {
    if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove('open');
    }
  });
}

/* ---------- Back-to-top button ---------- */
const btt = document.getElementById('back-to-top');
if (btt) {
  window.addEventListener('scroll', () => {
    btt.classList.toggle('visible', window.scrollY > 300);
  }, { passive: true });
  btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ---------- Fade-in on scroll (Intersection Observer) ---------- */
const fadeEls = document.querySelectorAll('.fade-in');
if (fadeEls.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  fadeEls.forEach(el => io.observe(el));
}

/* ---------- Typewriter (only on index.html) ---------- */
const typeEl = document.getElementById('typewriter');
if (typeEl) {
  const phrases = [
    'Computer Science Student',
    'AI Club Founder',
    'Data Scientist',
    'Future Big Tech Engineer',
  ];
  let pi = 0, ci = 0, deleting = false;
  const SPEED_TYPE = 60, SPEED_DEL = 35, PAUSE = 1800;

  function tick() {
    const phrase = phrases[pi];
    if (!deleting) {
      typeEl.textContent = phrase.slice(0, ci + 1);
      ci++;
      if (ci === phrase.length) { deleting = true; setTimeout(tick, PAUSE); return; }
    } else {
      typeEl.textContent = phrase.slice(0, ci - 1);
      ci--;
      if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; }
    }
    setTimeout(tick, deleting ? SPEED_DEL : SPEED_TYPE);
  }
  setTimeout(tick, 1200);
}
