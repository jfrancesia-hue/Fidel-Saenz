'use client';

import { useEffect, useState } from 'react';

const initialLead = { name: '', zone: '', need: '', role: 'Vecino/a' };

export default function HomePage() {
  const [lead, setLead] = useState(initialLead);
  const [sent, setSent] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function saveLead(event) {
    event.preventDefault();
    const payload = { ...lead, createdAt: new Date().toISOString(), source: 'landing' };
    const leads = JSON.parse(localStorage.getItem('campaignLeads') || '[]');
    leads.unshift(payload);
    localStorage.setItem('campaignLeads', JSON.stringify(leads.slice(0, 200)));
    setSent(`${lead.name || 'Tu aporte'} quedó registrado en esta demo. No se envió a sistemas externos.`);
    setLead(initialLead);
  }

  return (
    <main className="simple-page">
      <div className="grain" aria-hidden="true" />
      <header className="simple-hero" id="top">
        <nav className={`simple-nav ${scrolled ? 'is-scrolled' : ''} ${menuOpen ? 'menu-open' : ''}`}>
          <a className="brand" href="#top"><span className="brand-mark">PS</span><span className="brand-text"><strong>Pocho Sáenz</strong><small>Catamarca Capital 2027</small></span></a>
          <button className="simple-menu-toggle" type="button" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menú"><span></span><span></span><span></span></button>
          <div className="simple-nav-links" id="simpleNavLinks" onClick={() => setMenuOpen(false)}>
            <a href="#porque">Por qué</a><a href="#propuestas">Propuestas</a><a href="#fe-identidad">Fe</a><a href="#economia">Economía</a><a href="#mas-info">Saber más</a><a href="#compromiso">Compromiso</a><a href="#escucha">Te escuchamos</a><a href="#sumate">Sumate</a><a className="admin-nav-link" href="/admin">Panel demo</a>
          </div>
        </nav>
        <div className="simple-hero-grid">
          <div className="simple-copy reveal visible">
            <span className="eyebrow">Catamarca Capital · San Fernando del Valle</span>
            <h1>Con fe en nuestra gente, Catamarca Capital puede levantarse.</h1>
            <p>Pocho Sáenz propone una ciudad más ordenada, cercana y humana. Una Municipalidad que escuche, resuelva y cuide la esperanza de vivir mejor.</p>
            <div className="hero-actions"><a className="btn primary" href="#escucha">Quiero ser escuchado</a><a className="btn ghost" href="#propuestas">Ver propuestas</a></div>
          </div>
          <figure className="simple-photo reveal visible"><img src="/assets/candidate/fidel-04.jpg" alt="Pocho Sáenz saludando a una vecina"/><figcaption>Pocho Sáenz · cerca de la gente</figcaption></figure>
        </div>
        <div className="values-band reveal visible"><span>Fe</span><i></i><span>Cercanía</span><i></i><span>Gestión</span></div>
      </header>

      <section className="simple-message reveal visible"><p>“La fe nos une. La gestión transforma. La Capital necesita volver a creer.”</p></section>

      <section id="porque" className="simple-section why-simple reveal visible"><span className="section-kicker">Por qué Pocho</span><h2>Experiencia, cercanía y decisión para gobernar.</h2><div className="why-simple-grid"><article><strong>Conoce la gestión</strong><span>Sabe coordinar equipos, recursos y prioridades.</span></article><article><strong>Está cerca</strong><span>Escucha a vecinos, familias, comercios y referentes.</span></article><article><strong>Habla claro</strong><span>Menos vueltas. Problemas concretos, respuestas posibles.</span></article><article><strong>Piensa la ciudad</strong><span>Orden, servicios, trabajo, juventud y futuro para Capital.</span></article></div></section>

      <section id="propuestas" className="simple-section reveal visible"><span className="section-kicker">Propuestas claras</span><h2>Lo que más importa.</h2><div className="simple-cards five plan-compact"><article><span>01</span><h3>Alivio para el bolsillo</h3><p>Menos trabas, tasas claras, ferias, compras locales y ayuda a la economía familiar.</p></article><article><span>02</span><h3>Trabajo y oportunidades</h3><p>Comercios, jóvenes, oficios, emprendedores, cultura y deporte en cada zona.</p></article><article><span>03</span><h3>Servicios que funcionen</h3><p>Limpieza, iluminación, calles, plazas y atención rápida.</p></article><article><span>04</span><h3>Ciudad segura y ordenada</h3><p>Más presencia municipal, espacios cuidados y convivencia.</p></article><article><span>05</span><h3>Trámites simples</h3><p>Menos vueltas, turnos claros y respuestas que se puedan seguir.</p></article></div></section>

      <section id="fe-identidad" className="simple-section faith-identity reveal visible"><span className="section-kicker">Fe e identidad</span><h2>Catamarca Capital también se construye desde su fe y su historia.</h2><p>La Catedral, la Plaza y la vida del centro son parte de lo que nos une. Una ciudad mejor también tiene que cuidar su identidad, sus familias y sus lugares de encuentro.</p><div className="faith-photo-grid"><figure className="faith-wide"><img src="/assets/photos/catamarca-catedral.webp" alt="Catedral Basílica"/><figcaption>Catedral Basílica · Fe del pueblo catamarqueño</figcaption></figure><figure><img src="/assets/photos/catamarca-catedral-detail.webp" alt="Interior de la Catedral"/><figcaption>Identidad</figcaption></figure><figure><img src="/assets/photos/catamarca-plaza-25.webp" alt="Plaza 25 de Mayo"/><figcaption>Encuentro</figcaption></figure></div></section>

      <section id="economia" className="simple-section economy-simple reveal visible"><span className="section-kicker">Lo que más preocupa hoy</span><h2>La economía de cada familia también se cuida desde el municipio.</h2><p>El municipio no puede resolver todo, pero sí puede acompañar mejor: facilitar trámites, apoyar comercios, ordenar ferias, cuidar servicios y generar oportunidades cerca de la gente.</p><div className="economy-grid"><article><strong>Comercios y emprendedores</strong><span>Menos burocracia, habilitaciones más simples y acompañamiento real.</span></article><article><strong>Ferias y compras locales</strong><span>Más espacios para vender, producir y mover la economía de la ciudad.</span></article><article><strong>Oficios y jóvenes</strong><span>Capacitación, deporte, cultura y oportunidades para empezar.</span></article><article><strong>Servicios que alivian</strong><span>Una ciudad limpia, iluminada y ordenada también cuida el bolsillo.</span></article></div></section>

      <section id="mas-info" className="simple-section info-modules reveal visible"><span className="section-kicker">Saber más</span><h2>Más información, si querés profundizar.</h2><p>La web sigue simple, pero estos módulos permiten ampliar sin marear al vecino.</p><div className="module-grid">{['Plan para la Capital','Seguridad urbana','Trabajo y jóvenes','Escucha vecinal'].map((title, i) => <details className="module-card" key={title}><summary><span>{String(i+1).padStart(2,'0')}</span><strong>{title}</strong></summary><p>{['Servicios al día, limpieza, iluminación, calles, plazas cuidadas y atención municipal con seguimiento.','Más iluminación, espacios recuperados, prevención comunitaria y presencia municipal en puntos críticos.','Oficios, comercios, emprendedores, deporte, cultura y oportunidades cerca de cada zona.','Recibir problemas por barrio, ordenar prioridades y volver con respuestas posibles y concretas.'][i]}</p></details>)}</div></section>

      <section id="compromiso" className="simple-section commitment-section reveal visible"><div className="commitment-card"><span className="section-kicker">Compromiso con vos</span><h2>No prometer todo. Hacer lo que se puede cumplir.</h2><p>La Capital necesita una forma distinta de gobernar: escuchar primero, ordenar prioridades y mostrar avances.</p><div className="commitment-points"><article><strong>Escuchar</strong><span>Tu barrio, tu problema, tu propuesta.</span></article><article><strong>Ordenar</strong><span>Prioridades claras, sin improvisar.</span></article><article><strong>Cumplir</strong><span>Respuestas posibles y seguimiento visible.</span></article></div></div></section>

      <section id="escucha" className="simple-section listen-simple reveal visible"><div><span className="section-kicker">Te escuchamos</span><h2>¿Qué necesita tu barrio?</h2><p>Contanos qué pasa en tu zona. La campaña va a ordenar los problemas y convertirlos en propuestas concretas.</p></div><div className="simple-cards two"><article><h3>Problemas frecuentes</h3><ul><li>Calles y veredas</li><li>Iluminación</li><li>Limpieza</li><li>Trámites</li><li>Seguridad urbana</li></ul></article><article><h3>Cómo se responde</h3><ul><li>Escuchar</li><li>Priorizar</li><li>Armar propuesta</li><li>Volver al barrio</li></ul></article></div></section>

      <section className="simple-section photo-strip reveal visible"><figure><img src="/assets/candidate/fidel-02.jpg" alt="Pocho con vecinos"/><figcaption>Cercanía</figcaption></figure><figure><img src="/assets/photos/catamarca-plaza-25.webp" alt="Catamarca Capital"/><figcaption>Capital</figcaption></figure><figure><img src="/assets/candidate/fidel-05.jpg" alt="Pocho junto a vecinos"/><figcaption>Territorio</figcaption></figure></section>

      <section id="sumate" className="simple-section final-simple reveal visible"><div><span className="section-kicker">Sumate</span><h2>Ayudanos a construir una Capital mejor.</h2><p>Podés sumarte como vecino, voluntario, fiscal o referente de tu zona.</p><a className="btn primary" href="https://wa.me/5493830000000?text=Hola%2C%20quiero%20sumarme%20a%20la%20campaña%20de%20Pocho%20Sáenz" target="_blank" rel="noopener">Sumarme por WhatsApp</a></div><form className="join-form" onSubmit={saveLead}><label>Nombre<input value={lead.name} onChange={e=>setLead({...lead,name:e.target.value})} placeholder="Ej: Mariana"/></label><label>Barrio o zona<input value={lead.zone} onChange={e=>setLead({...lead,zone:e.target.value})} placeholder="Ej: Centro / Norte"/></label><label>¿Qué necesitás que se resuelva?<input value={lead.need} onChange={e=>setLead({...lead,need:e.target.value})} placeholder="Ej: trabajo, comercio, luz"/></label><div className="chips">{['Vecino/a','Voluntario/a','Fiscal'].map(r=><button key={r} className="chip" type="button" aria-pressed={lead.role===r} onClick={()=>setLead({...lead,role:r})}>{r}</button>)}</div><button className="btn primary" type="submit">Enviar</button><p className="confirm">{sent}</p></form></section>

      <section className="poster-close reveal visible"><div className="poster-inner"><span>Capital 2027</span><h2>Pocho Sáenz</h2><p>Catamarca Capital más ordenada, cercana y con futuro.</p><a className="btn primary" href="#sumate">Sumate</a></div></section>
      <footer className="footer"><span>Demo estratégica · Catamarca Capital · contenido editable</span><span><a href="/admin">Panel demo</a> · Nativos Consultora Digital · Catamarca</span></footer>
      <a className="float-whatsapp" href="https://wa.me/5493830000000" target="_blank" rel="noopener">WhatsApp</a><a className="mobile-bottom-cta" href="#sumate">Sumarme</a><a className="back-to-top" href="#top">↑</a>
    </main>
  );
}
