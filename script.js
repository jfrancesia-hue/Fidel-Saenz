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
      if (force >= 60) return { text: 'media-alta', color: '#76a846' };
      if (force >= 42) return { text: 'media', color: '#d6a92d' };
      return { text: 'baja', color: '#d96a35' };
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
      }, { threshold: .16 });
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
      }, { threshold: .45 });
      counters.forEach(el => io.observe(el));
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
      select(document.querySelector('.zone[data-zone="Centro"]'));
    }

    function initSimulator() {
      const base = 1322;
      const weekly = document.getElementById('weekly');
      const weeks = document.getElementById('weeks');
      const weeklyOut = document.getElementById('weeklyOut');
      const weeksOut = document.getElementById('weeksOut');
      const projection = document.getElementById('projection');
      const chip = document.getElementById('paceChip');
      const line = document.getElementById('chartLine');
      const area = document.getElementById('chartArea');
      let current = base;

      function drawChart(totalWeeks, perWeek) {
        const w = 760, h = 260, pad = 20;
        const max = base + perWeek * totalWeeks;
        const points = [];
        for (let i = 0; i <= totalWeeks; i++) {
          const x = pad + (i / totalWeeks) * (w - pad * 2);
          const y = h - pad - ((base + perWeek * i) / max) * (h - pad * 2);
          points.push([x, y]);
        }
        const d = points.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');
        line.setAttribute('d', d);
        area.setAttribute('d', `${d} L${w-pad},${h-pad} L${pad},${h-pad} Z`);
      }

      function setProjection(value) {
        if (prefersReduced) {
          projection.textContent = fmt.format(value);
          current = value;
          return;
        }
        const from = current;
        const start = performance.now();
        const duration = 420;
        function tick(now) {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          projection.textContent = fmt.format(Math.round(from + (value - from) * eased));
          if (p < 1) requestAnimationFrame(tick);
          else current = value;
        }
        requestAnimationFrame(tick);
      }

      function update() {
        const perWeek = Number(weekly.value);
        const totalWeeks = Number(weeks.value);
        weeklyOut.textContent = fmt.format(perWeek);
        weeksOut.textContent = totalWeeks;
        const value = base + perWeek * totalWeeks;
        chip.textContent = perWeek < 250 ? 'Ritmo conservador' : perWeek < 500 ? 'Ritmo sostenido' : 'Ritmo agresivo';
        setProjection(value);
        drawChart(totalWeeks, perWeek);
      }
      weekly.addEventListener('input', update);
      weeks.addEventListener('input', update);
      update();
    }

    function initFeed() {
      const list = document.getElementById('feedList');
      const names = ['M. Quiroga', 'A. Barrionuevo', 'L. Moreno', 'R. Acosta', 'C. Villagra', 'P. Vera', 'J. Carrizo', 'S. Agüero'];
      const zoneNames = ['Centro', 'Norte', 'Sur', 'Este', 'Oeste'];
      const roles = ['vecino/a', 'voluntario/a', 'fiscal'];
      let index = 0;

      function addItem() {
        const name = names[index % names.length];
        const zone = zoneNames[(index * 2) % zoneNames.length];
        const role = roles[(index * 3 + 1) % roles.length];
        const li = document.createElement('li');
        li.className = 'feed-item';
        li.innerHTML = `<div class="avatar">${name.split('.')[0]}</div><div><strong>${name}</strong> se sumó en <strong>${zone}</strong> como ${role}<br><span>hace instantes</span></div>`;
        list.prepend(li);
        while (list.children.length > 6) list.lastElementChild.remove();
        index++;
      }
      for (let i = 0; i < 4; i++) addItem();
      if (!prefersReduced) window.setInterval(addItem, 4200);
    }

    function initForm() {
      const form = document.getElementById('joinForm');
      const confirm = document.getElementById('confirm');
      const chips = document.querySelectorAll('.chip');
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

    function initCommand() {
      const holder = document.getElementById('commandBars');
      const max = Math.max(...zones.map(z => z.adh));
      holder.innerHTML = zones.map(z => `
        <div class="command-row">
          <span>${z.name}</span>
          <div class="bar-track"><div class="bar-fill command-fill" data-width="${Math.round((z.adh / max) * 100)}"></div></div>
          <span>${z.adh}</span>
        </div>`).join('');
    }

    function animateCommandBars() {
      document.querySelectorAll('.command-fill').forEach(bar => {
        bar.style.width = '0%';
        window.setTimeout(() => { bar.style.width = bar.dataset.width + '%'; }, 80);
      });
    }

    function initModeToggle() {
      const publicBtn = document.getElementById('modePublic');
      const commandBtn = document.getElementById('modeCommand');
      function setMode(command) {
        document.body.classList.toggle('command-mode', command);
        publicBtn.setAttribute('aria-selected', String(!command));
        commandBtn.setAttribute('aria-selected', String(command));
        if (command) {
          animateCommandBars();
          document.getElementById('comando').classList.add('visible');
          document.getElementById('comando').scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth', block: 'start' });
        }
      }
      publicBtn.addEventListener('click', () => setMode(false));
      commandBtn.addEventListener('click', () => setMode(true));
    }

    initReveal();
    initCounters();
    initMap();
    initSimulator();
    initFeed();
    initForm();
    initCommand();
    initModeToggle();
