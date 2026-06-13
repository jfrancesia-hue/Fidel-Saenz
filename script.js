const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (prefersReduced) document.body.classList.add('reduce-motion');

const fmt = new Intl.NumberFormat('es-AR');
const zones = [
  { name: 'Centro', adh: 412, force: 86 },
  { name: 'Norte', adh: 307, force: 64 },
  { name: 'Sur', adh: 249, force: 52 },
  { name: 'Oeste', adh: 196, force: 41 },
  { name: 'Este', adh: 158, force: 33 }
];

function levelFor(force) {
  if (force >= 75) return { text: 'fuerte', color: '#207a55' };
  if (force >= 55) return { text: 'media-alta', color: '#88a943' };
  if (force >= 42) return { text: 'media', color: '#d6a92d' };
  return { text: 'baja', color: '#d96a35' };
}

function initScrollNav() {
  const nav = document.querySelector('.simple-nav') || document.querySelector('.nav');
  if (!nav) return;
  function update() {
    nav.classList.toggle('is-scrolled', window.scrollY > 28);
  }
  update();
  window.addEventListener('scroll', update, { passive: true });
}

function initReveal() {
  const items = document.querySelectorAll('.reveal');
  if (prefersReduced || !('IntersectionObserver' in window)) {
    items.forEach(el => el.classList.add('visible'));
    return;
  }
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: .12 });
  items.forEach(el => io.observe(el));
}

function animateNumber(el, to, suffix = '') {
  if (prefersReduced) {
    el.textContent = fmt.format(to) + suffix;
    return;
  }
  const start = performance.now();
  const duration = 1100;
  function tick(now) {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = fmt.format(Math.round(to * eased)) + suffix;
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  const run = el => animateNumber(el, Number(el.dataset.count), el.dataset.suffix || '');
  if (prefersReduced || !('IntersectionObserver' in window)) {
    counters.forEach(run);
    return;
  }
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        run(entry.target);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: .4 });
  counters.forEach(el => io.observe(el));
}

function initMobileNav() {
  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelectorAll('#primaryNav a');
  if (!nav || !toggle) return;
  function setOpen(open) {
    nav.classList.toggle('open', open);
    document.body.classList.toggle('no-scroll', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  }
  toggle.addEventListener('click', () => setOpen(!nav.classList.contains('open')));
  links.forEach(link => link.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') setOpen(false); });
}

function initMap() {
  const zoneEls = document.querySelectorAll('.zone');
  const title = document.getElementById('zoneTitle');
  const adh = document.getElementById('zoneAdh');
  const level = document.getElementById('zoneLevel');
  const force = document.getElementById('zoneForce');
  const bar = document.getElementById('zoneBar');
  function select(el) {
    zoneEls.forEach(z => z.classList.remove('active'));
    el.classList.add('active');
    const f = Number(el.dataset.f);
    const state = levelFor(f);
    title.textContent = el.dataset.zone;
    adh.textContent = fmt.format(Number(el.dataset.adh));
    level.textContent = state.text;
    force.textContent = f;
    bar.style.background = state.color;
    bar.style.width = f + '%';
  }
  zoneEls.forEach(el => {
    const state = levelFor(Number(el.dataset.f));
    el.style.fill = state.color;
    el.setAttribute('aria-label', `${el.dataset.zone}: ${el.dataset.adh} adhesiones, fuerza ${el.dataset.f} sobre 100`);
    el.addEventListener('click', () => select(el));
    el.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        select(el);
      }
    });
  });
  const first = document.querySelector('.zone[data-zone="Centro"]') || zoneEls[0];
  if (first) select(first);
}

function initSimulator() {
  const base = 1322;
  const weekly = document.getElementById('weekly');
  const weeks = document.getElementById('weeks');
  const weeklyOut = document.getElementById('weeklyOut');
  const weeksOut = document.getElementById('weeksOut');
  const projection = document.getElementById('projection');
  const pace = document.getElementById('paceLabel');
  if (!weekly || !weeks) return;
  function update() {
    const perWeek = Number(weekly.value);
    const totalWeeks = Number(weeks.value);
    weeklyOut.textContent = fmt.format(perWeek);
    weeksOut.textContent = totalWeeks;
    projection.textContent = fmt.format(base + perWeek * totalWeeks);
    pace.textContent = perWeek < 250 ? 'Conservador' : perWeek < 500 ? 'Sostenido' : 'Agresivo';
  }
  weekly.addEventListener('input', update);
  weeks.addEventListener('input', update);
  update();
}

function initCommandBars() {
  const holder = document.getElementById('commandBars');
  if (!holder) return;
  const max = Math.max(...zones.map(z => z.adh));
  holder.innerHTML = zones.map(z => `
    <div class="command-row">
      <span>${z.name}</span>
      <div class="command-track"><div class="command-fill" style="width:${Math.round((z.adh / max) * 100)}%"></div></div>
      <span>${z.adh}</span>
    </div>`).join('');
}

function initModeButtons() {
  const publicBtn = document.getElementById('publicMode');
  const commandBtn = document.getElementById('commandMode');
  if (!publicBtn || !commandBtn) return;
  function set(command) {
    document.body.classList.toggle('command-active', command);
    publicBtn.setAttribute('aria-pressed', String(!command));
    commandBtn.setAttribute('aria-pressed', String(command));
  }
  publicBtn.addEventListener('click', () => set(false));
  commandBtn.addEventListener('click', () => set(true));
}

function initForm() {
  const form = document.getElementById('joinForm');
  const confirm = document.getElementById('confirm');
  const chips = document.querySelectorAll('.chip');
  if (!form) return;
  chips.forEach(chip => chip.addEventListener('click', () => {
    chips.forEach(c => c.setAttribute('aria-pressed', 'false'));
    chip.setAttribute('aria-pressed', 'true');
  }));
  form.addEventListener('submit', event => {
    event.preventDefault();
    const name = document.getElementById('name').value.trim() || 'La persona';
    confirm.textContent = `${name} quedó anotado/a para esta demo. No se guardó información.`;
    form.reset();
    chips.forEach((c, i) => c.setAttribute('aria-pressed', i === 0 ? 'true' : 'false'));
  });
}

initScrollNav();
initReveal();
initCounters();
initMobileNav();
initMap();
initSimulator();
initCommandBars();
initModeButtons();
initForm();
