/* =========================================================
   Portfolio interactions — vanilla JS, no dependencies
   ========================================================= */
(() => {
'use strict';

const $  = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;
const FINE    = matchMedia('(hover: hover) and (pointer: fine)').matches;
const clamp   = (v, a, b) => Math.min(Math.max(v, a), b);

/* ---------- THEME ---------- */
const root = document.documentElement;
const toggle = $('#themeToggle');
const stored = (() => { try { return localStorage.getItem('theme'); } catch { return null; } })();
const initial = stored || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

function applyTheme(t) {
  root.setAttribute('data-theme', t);
  toggle.setAttribute('aria-pressed', String(t === 'dark'));
  toggle.setAttribute('aria-label', t === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  try { localStorage.setItem('theme', t); } catch { /* private mode */ }
}
applyTheme(initial);
toggle.addEventListener('click', () =>
  applyTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'));

/* ---------- PRELOADER ---------- */
const preloader = $('#preloader');
const bar = $('.preloader__bar span');
document.body.classList.add('is-loading');

let pct = 0;
const tick = setInterval(() => {
  pct = Math.min(pct + Math.random() * 18, 92);
  bar.style.width = pct + '%';
}, 130);

let loaded = false;
function finishLoading() {
  if (loaded) return;
  loaded = true;
  clearInterval(tick);
  bar.style.width = '100%';
  setTimeout(() => {
    preloader.classList.add('done');
    document.body.classList.remove('is-loading');
    revealHero();
  }, REDUCED ? 0 : 380);
}
window.addEventListener('load', () => setTimeout(finishLoading, REDUCED ? 0 : 500));
setTimeout(finishLoading, 3500); // safety net if a resource stalls

/* ---------- SPLIT TEXT ---------- */
const CHARS = '!<>-_\\/[]{}—=+*^?#________';

$$('.hero__title .scramble').forEach(el => {
  const text = el.dataset.text || el.textContent;
  el.textContent = '';
  [...text].forEach(ch => {
    const s = document.createElement('span');
    s.className = 'char';
    s.textContent = ch;
    el.appendChild(s);
  });
});

function revealHero() {
  $$('.hero__title .char').forEach((c, i) => {
    c.style.setProperty('--cd', i * 28 + 'ms');
    c.classList.add('in');
  });
}
if (REDUCED) revealHero();

/* Text scramble on click ------------------------------------------------ */
$$('.hero__title .scramble').forEach(el => {
  el.setAttribute('role', 'button');
  el.setAttribute('tabindex', '0');
  el.setAttribute('title', 'Click to scramble');
  const run = () => {
    if (REDUCED || el.classList.contains('busy')) return;
    el.classList.add('busy');
    const chars = $$('.char', el);
    const finals = chars.map(c => c.dataset.final || (c.dataset.final = c.textContent));
    const start = performance.now();
    const settle = chars.map((_, i) => 220 + i * 45 + Math.random() * 320);
    (function frame(now) {
      const t = now - start;
      let done = true;
      chars.forEach((c, i) => {
        if (t >= settle[i]) { c.textContent = finals[i]; }
        else if (finals[i].trim()) {
          done = false;
          c.textContent = CHARS[(Math.random() * CHARS.length) | 0];
        }
      });
      if (done) el.classList.remove('busy');
      else requestAnimationFrame(frame);
    })(start);
  };
  el.addEventListener('click', run);
  el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); run(); } });
});

/* Word-by-word headings -------------------------------------------------- */
$$('[data-words]').forEach(el => {
  const frag = document.createDocumentFragment();
  [...el.childNodes].forEach(node => {
    if (node.nodeType === 3) {
      node.textContent.split(/(\s+)/).forEach(part => {
        if (!part.trim()) { frag.appendChild(document.createTextNode(part)); return; }
        const s = document.createElement('span');
        s.className = 'w';
        s.textContent = part;
        frag.appendChild(s);
      });
    } else {
      frag.appendChild(node.cloneNode(true));
    }
  });
  el.textContent = '';
  el.appendChild(frag);
  $$('.w', el).forEach((w, i) => w.style.transitionDelay = i * 55 + 'ms');
});

/* ---------- SCROLL REVEAL ---------- */
const io = new IntersectionObserver((entries, obs) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    if (el.dataset.delay) el.style.setProperty('--d', el.dataset.delay + 'ms');
    el.classList.add('in');

    if (el.hasAttribute('data-stagger'))
      [...el.children].forEach((c, i) => c.style.transitionDelay = i * 110 + 'ms');

    if (el.classList.contains('meter'))
      $('i', el).style.width = clamp(+el.dataset.value, 0, 100) + '%';

    if (el.classList.contains('count')) countUp(el);

    obs.unobserve(el);
  });
}, { threshold: 0.16, rootMargin: '0px 0px -8% 0px' });

$$('.reveal, .words, [data-stagger], .draw-line, .meter, .count').forEach(el => io.observe(el));

function countUp(el) {
  const to = +el.dataset.to;
  if (REDUCED) { el.textContent = to; return; }
  const dur = 1500, t0 = performance.now();
  (function step(now) {
    const p = clamp((now - t0) / dur, 0, 1);
    el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3)));
    if (p < 1) requestAnimationFrame(step);
  })(t0);
}

/* ---------- SCROLL: progress, nav, parallax, fab ---------- */
const burger = $('#navBurger'), links = $('#navLinks');
const navLinksOpen = () => links.classList.contains('open');
const navEl   = $('#nav');
const scrollBar = $('#scrollBar');
const fab     = $('.fab');
const parallaxEls = $$('.parallax');
const sections = $$('main section[id]');
const navLinks = $$('#navLinks a');
let lastY = 0, ticking = false;

function onScroll() {
  const y = scrollY;
  const max = document.documentElement.scrollHeight - innerHeight;
  scrollBar.style.width = (max > 0 ? (y / max) * 100 : 0) + '%';

  navEl.classList.toggle('stuck', y > 20);
  navEl.classList.toggle('hide', y > lastY && y > 420 && !navLinksOpen());
  fab.classList.toggle('show', y > innerHeight * 0.7);
  lastY = y;

  if (!REDUCED) {
    parallaxEls.forEach(el => {
      const r = el.getBoundingClientRect();
      const off = (r.top + r.height / 2 - innerHeight / 2) * +el.dataset.speed;
      el.style.transform = `translate3d(0, ${off.toFixed(1)}px, 0)`;
    });
  }

  let current = '';
  sections.forEach(s => { if (s.offsetTop - 140 <= y) current = s.id; });
  navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + current));

  ticking = false;
}
addEventListener('scroll', () => {
  if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
}, { passive: true });
onScroll();

/* ---------- MOBILE NAV (handlers) ---------- */
burger.addEventListener('click', () => {
  const open = !navLinksOpen();
  links.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', String(open));
  burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
});
navLinks.forEach(a => a.addEventListener('click', () => {
  links.classList.remove('open');
  burger.setAttribute('aria-expanded', 'false');
}));
addEventListener('keydown', e => {
  if (e.key === 'Escape' && navLinksOpen()) { links.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); burger.focus(); }
});

/* ---------- CUSTOM CURSOR ---------- */
if (FINE && !REDUCED) {
  const cur = $('#cursor'), dot = $('.cursor__dot'), ring = $('.cursor__ring');
  let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;

  addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%)`;
    cur.classList.add('on');
  }, { passive: true });

  (function loop() {
    rx += (mx - rx) * 0.16; ry += (my - ry) * 0.16;
    ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`;
    requestAnimationFrame(loop);
  })();

  document.addEventListener('mouseover', e => {
    const t = e.target.closest('[data-cursor], a, button');
    cur.classList.remove('hover', 'card');
    if (!t) return;
    cur.classList.add(t.dataset.cursor === 'card' ? 'card' : 'hover');
  });
  addEventListener('mouseleave', () => cur.classList.remove('on'));
}

/* ---------- MAGNETIC BUTTONS ---------- */
if (FINE && !REDUCED) {
  $$('.magnetic').forEach(el => {
    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * 0.28;
      const y = (e.clientY - r.top - r.height / 2) * 0.42;
      el.style.transform = `translate(${x}px, ${y}px) scale(1.03)`;
    });
    el.addEventListener('mouseleave', () => { el.style.transform = ''; });
  });
}

/* ---------- 3D SCENE: pointer parallax ---------- */
const scene = $('#scene');
if (scene && !REDUCED && FINE) {
  const floats = $$('.float', scene);
  let tx = 0, ty = 0, cx = 0, cy = 0;
  addEventListener('mousemove', e => {
    tx = (e.clientX / innerWidth - 0.5);
    ty = (e.clientY / innerHeight - 0.5);
  }, { passive: true });
  (function orbit() {
    cx += (tx - cx) * 0.06; cy += (ty - cy) * 0.06;
    floats.forEach(f => {
      const d = +f.dataset.depth;
      f.style.transform =
        `translate3d(${(-cx * d).toFixed(2)}px, ${(-cy * d).toFixed(2)}px, 0) ` +
        `rotateX(${(cy * 9).toFixed(2)}deg) rotateY(${(-cx * 9).toFixed(2)}deg)`;
    });
    requestAnimationFrame(orbit);
  })();
}

/* ---------- CARD SPOTLIGHT ---------- */
$$('.card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
    card.style.setProperty('--my', (e.clientY - r.top) + 'px');
  });
});

/* ---------- WORK CAROUSEL ---------- */
const rail = $('#workRail');
if (rail) {
  const step = () => (rail.querySelector('.project')?.offsetWidth ?? 360) + 26;
  const prev = $('#workPrev'), next = $('#workNext');
  prev.addEventListener('click', () => rail.scrollBy({ left: -step(), behavior: REDUCED ? 'auto' : 'smooth' }));
  next.addEventListener('click', () => rail.scrollBy({ left:  step(), behavior: REDUCED ? 'auto' : 'smooth' }));

  const sync = () => {
    prev.disabled = rail.scrollLeft < 8;
    next.disabled = rail.scrollLeft > rail.scrollWidth - rail.clientWidth - 8;
  };
  rail.addEventListener('scroll', sync, { passive: true });
  addEventListener('resize', sync);
  sync();

  rail.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') { e.preventDefault(); next.click(); }
    if (e.key === 'ArrowLeft')  { e.preventDefault(); prev.click(); }
  });
}

/* ---------- INFINITE MARQUEE ---------- */
$$('[data-marquee]').forEach(m => {
  const track = $('.marquee__track', m);
  [...track.children].forEach(node => {          // duplicate for a seamless -50% loop
    const clone = node.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');   // the copy is decorative
    track.appendChild(clone);
  });
});

/* ---------- RIPPLE ---------- */
$$('.ripple').forEach(btn => {
  btn.addEventListener('click', e => {
    if (REDUCED) return;
    const r = btn.getBoundingClientRect();
    const size = Math.max(r.width, r.height);
    const w = document.createElement('span');
    w.className = 'ripple__wave';
    w.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - r.left - size / 2}px;top:${e.clientY - r.top - size / 2}px`;
    btn.appendChild(w);
    setTimeout(() => w.remove(), 700);
  });
});

/* ---------- FORM ---------- */
const form = $('#contactForm');
if (form) {
  const status = $('#formStatus');
  const RULES = {
    name:    v => v.trim().length >= 2        || 'Please enter your name.',
    email:   v => /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(v.trim()) || 'Enter a valid email address.',
    budget:  v => !!v                         || 'Pick a budget range.',
    message: v => v.trim().length >= 20       || 'A little more detail helps — 20 characters minimum.'
  };

  const check = el => {
    const wrap = el.closest('.field');
    const res = RULES[el.name](el.value);
    const ok = res === true;
    wrap.classList.toggle('invalid', !ok);
    wrap.classList.toggle('valid', ok && el.value !== '');
    $('.field__err', wrap).textContent = ok ? '' : res;
    el.setAttribute('aria-invalid', String(!ok));
    return ok;
  };

  $$('input, select, textarea', form).forEach(el => {
    el.addEventListener('blur', () => { if (el.value) check(el); });
    el.addEventListener('input', () => { if (el.closest('.field').classList.contains('invalid')) check(el); });
    el.addEventListener('change', () => { if (el.tagName === 'SELECT') check(el); });
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    const fields = $$('input, select, textarea', form);
    const bad = fields.filter(el => !check(el));
    if (bad.length) {
      status.textContent = 'Please fix the highlighted fields.';
      status.classList.add('err');
      bad[0].focus();
      return;
    }
    status.classList.remove('err');
    const btn = $('button[type="submit"]', form);
    btn.disabled = true;
    $('span', btn).textContent = 'Sending…';

    // TODO: replace with a real endpoint (Formspree, Resend, your own API).
    setTimeout(() => {
      status.textContent = 'Thanks — your message is on its way. I reply within one business day.';
      form.reset();
      $$('.field', form).forEach(f => f.classList.remove('valid', 'invalid'));
      btn.disabled = false;
      $('span', btn).textContent = 'Send message';
    }, 900);
  });
}

/* ---------- CONTACT PARTICLES ---------- */
const cvs = $('#particles');
if (cvs && !REDUCED) {
  const ctx = cvs.getContext('2d');
  let W, H, dots = [], raf = null, dpr = Math.min(devicePixelRatio || 1, 2);

  function size() {
    const r = cvs.getBoundingClientRect();
    W = r.width; H = r.height;
    cvs.width = W * dpr; cvs.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = clamp(Math.round(W * H / 16000), 24, 90);
    dots = Array.from({ length: n }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - .5) * .25, vy: (Math.random() - .5) * .25,
      r: Math.random() * 1.8 + .6
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    for (let i = 0; i < dots.length; i++) {
      const d = dots[i];
      d.x += d.vx; d.y += d.vy;
      if (d.x < 0 || d.x > W) d.vx *= -1;
      if (d.y < 0 || d.y > H) d.vy *= -1;
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(191,219,254,.55)';
      ctx.fill();
      for (let j = i + 1; j < dots.length; j++) {
        const o = dots[j], dx = d.x - o.x, dy = d.y - o.y, dist2 = dx * dx + dy * dy;
        if (dist2 < 16900) {
          ctx.beginPath();
          ctx.moveTo(d.x, d.y); ctx.lineTo(o.x, o.y);
          ctx.strokeStyle = `rgba(147,197,253,${(1 - dist2 / 16900) * 0.22})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }
    raf = requestAnimationFrame(draw);
  }

  size();
  if (window.ResizeObserver) new ResizeObserver(size).observe(cvs);
  else addEventListener('resize', size, { passive: true });

  // Only animate while the section is on screen.
  new IntersectionObserver(([e]) => {
    if (e.isIntersecting && raf === null) draw();
    else if (!e.isIntersecting && raf !== null) { cancelAnimationFrame(raf); raf = null; }
  }, { threshold: 0.02 }).observe(cvs);
}

/* ---------- MISC ---------- */
$('#year').textContent = new Date().getFullYear();

// Smooth anchor scrolling that also moves keyboard focus (a11y).
$$('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (id === '#' || id.length < 2) return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: REDUCED ? 'auto' : 'smooth', block: 'start' });
    target.setAttribute('tabindex', '-1');
    setTimeout(() => target.focus({ preventScroll: true }), REDUCED ? 0 : 600);
    history.replaceState(null, '', id);
  });
});

})();
