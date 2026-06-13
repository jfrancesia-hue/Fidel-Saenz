'use client';

import { useEffect, useMemo, useState } from 'react';

const demoLeads = [
  { name: 'Mariana', zone: 'Norte', need: 'Iluminación y seguridad urbana', role: 'Vecino/a', intent: 'Reclamo', score: 92 },
  { name: 'Carlos', zone: 'Centro', need: 'Trámites municipales', role: 'Comerciante', intent: 'Comercio', score: 81 },
  { name: 'Lucía', zone: 'Sur', need: 'Trabajo joven y oficios', role: 'Voluntario/a', intent: 'Sumarse', score: 76 },
  { name: 'Ramón', zone: 'Este', need: 'Limpieza y espacios verdes', role: 'Vecino/a', intent: 'Reclamo', score: 69 }
];

const agenda = [
  ['Lunes', 'Centro', 'Reunión comercios y emprendedores', 'Alta'],
  ['Martes', 'Norte', 'Recorrida iluminación + plazas', 'Alta'],
  ['Jueves', 'Sur', 'Mesa joven: trabajo, deporte y oficios', 'Media'],
  ['Sábado', 'Oeste', 'Encuentro barrial + escucha vecinal', 'Media']
];

const campaigns = [
  ['Meta · Cercanía', 'Video corto', '$82.400', '3,9%', 'Mantener'],
  ['Meta · Economía familiar', 'Carrusel', '$64.100', '4,7%', 'Escalar'],
  ['Google · Trámites', 'Búsqueda', '$38.600', '6,1%', 'Optimizar'],
  ['WhatsApp · Sumate', 'Conversación', '$22.900', '—', 'Responder rápido']
];

export default function AdminPage() {
  const [logged, setLogged] = useState(false);
  const [error, setError] = useState('');
  const [leads, setLeads] = useState(demoLeads);

  useEffect(() => {
    setLogged(localStorage.getItem('pochoAdminDemo') === '1');
    const stored = JSON.parse(localStorage.getItem('campaignLeads') || '[]').map((l, i) => ({ ...l, intent: l.role || 'Vecino/a', score: 88 - i * 3 }));
    if (stored.length) setLeads([...stored, ...demoLeads]);
  }, []);

  const leadStats = useMemo(() => ({
    total: leads.length + 1284,
    whatsapp: 392 + Math.min(leads.length, 99),
    barrios: new Set(leads.map(l => l.zone).filter(Boolean)).size + 31,
    hot: leads.filter(l => (l.score || 0) >= 80).length + 214
  }), [leads]);

  function login(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (String(data.get('user')).toLowerCase() === 'admin' && String(data.get('pass')) === 'capital2027') {
      localStorage.setItem('pochoAdminDemo', '1');
      setLogged(true);
      setError('');
    } else setError('Usuario o clave incorrectos para la demo.');
  }

  function exportDemo() {
    const blob = new Blob([JSON.stringify({ generatedAt: new Date().toISOString(), leads, campaigns, agenda }, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'pocho-saenz-campaign-demo-report.json';
    a.click();
    URL.revokeObjectURL(url);
  }

  if (!logged) return <main className="admin-shell"><section className="login-view"><div className="login-card"><div className="brand-pill"><span>PS</span><b>Pocho Sáenz · Capital 2027</b></div><h1>Panel privado de campaña</h1><p>Demo funcional para seguir leads, pauta, agenda territorial y prioridades de vecinos.</p><form onSubmit={login}><label>Usuario<input name="user" placeholder="admin" required /></label><label>Clave<input name="pass" type="password" placeholder="capital2027" required /></label><button>Entrar al dashboard</button><small>Demo: usuario <b>admin</b> · clave <b>capital2027</b>. No usar como seguridad real.</small><p className="error">{error}</p></form></div></section></main>;

  return <main className="admin-shell dashboard-view"><aside className="sidebar"><a className="admin-brand" href="/"><span>PS</span><b>Capital 2027</b></a><nav><a href="#resumen">Resumen</a><a href="#ads">Campañas</a><a href="#crm">CRM</a><a href="#territorio">Territorio</a><a href="#agenda">Agenda</a><a href="#ia">IA</a></nav><button id="logoutBtn" onClick={() => { localStorage.removeItem('pochoAdminDemo'); setLogged(false); }}>Salir</button></aside><div className="dashboard-main"><header className="topbar"><div><span className="eyebrow">Centro de inteligencia electoral</span><h1>Plataforma de campaña</h1><p>Vista demo dinámica con leads locales, campañas simuladas, CRM, agenda territorial y recomendaciones.</p></div><div className="status-card"><b>Demo read-only</b><span>Lista para conectar Supabase + Meta/Google</span><button className="mini-action" onClick={exportDemo}>Exportar reporte</button></div></header>

  <section id="resumen" className="section-block"><div className="kpi-grid"><article><span>Leads totales</span><strong>{leadStats.total}</strong><small>incluye formulario demo</small></article><article><span>Costo por lead</span><strong>$428</strong><small>-12% vs semana anterior</small></article><article><span>WhatsApps iniciados</span><strong>{leadStats.whatsapp}</strong><small>67% desde mobile</small></article><article><span>Leads calientes</span><strong>{leadStats.hot}</strong><small>prioridad de contacto</small></article></div></section>

  <section id="ads" className="section-block"><div className="panel"><div className="panel-head"><h2>Campañas activas</h2><span>Meta · Google · WhatsApp</span></div><div className="campaign-table"><b>Canal</b><b>Pieza</b><b>Gasto</b><b>CTR</b><b>Acción</b>{campaigns.map((c,i)=><Row key={i} cells={c}/>)}</div></div></section>

  <section id="crm" className="section-block two-col"><Panel title="CRM de vecinos"><div className="lead-cards">{leads.slice(0,7).map((l,i)=><article key={i}><strong>{l.name || 'Vecino/a'}</strong><span>{l.zone || 'Sin zona'} · {l.intent || l.role || 'Contacto'}</span><p>{l.need || 'Quiere recibir información'}</p><em>{l.score || 72}% prioridad</em></article>)}</div></Panel><Panel title="Necesidades frecuentes"><ul className="needs-list"><li><b>Iluminación y seguridad urbana</b><span>Alta</span></li><li><b>Calles, baches y veredas</b><span>Alta</span></li><li><b>Trabajo joven / oficios</b><span>Media-alta</span></li><li><b>Comercios y habilitaciones</b><span>Media</span></li><li><b>Trámites y atención municipal</b><span>Media</span></li></ul></Panel></section>

  <section id="territorio" className="section-block"><div className="panel"><div className="panel-head"><h2>Mapa operativo por zona</h2><span>{leadStats.barrios} barrios activos</span></div><div className="zone-grid">{[['Centro','Comercio · tránsito · trámites','84%'],['Norte','Iluminación · calles · plazas','72%'],['Sur','Jóvenes · deporte · trabajo','68%'],['Este','Servicios · accesos · limpieza','53%'],['Oeste','Recorridas · referentes','49%']].map(z=><article key={z[0]}><b>{z[0]}</b><span>{z[1]}</span><strong>{z[2]}</strong></article>)}</div></div></section>

  <section id="agenda" className="section-block"><div className="panel"><div className="panel-head"><h2>Agenda territorial sugerida</h2><span>próxima semana</span></div><div className="agenda-grid">{agenda.map((a,i)=><article key={i}><b>{a[0]}</b><strong>{a[1]}</strong><span>{a[2]}</span><em>{a[3]}</em></article>)}</div></div></section>

  <section id="ia" className="section-block"><div className="panel ai-panel"><div><span className="eyebrow">Recomendación IA demo</span><h2>Qué haría esta semana</h2></div><ol><li>Subir pieza sobre economía familiar + comercio local, porque el CTR viene mejor.</li><li>Contactar primero leads con score mayor a 80% y reclamos de iluminación/calles.</li><li>Hacer recorrida Norte/Centro antes del fin de semana y registrar respuestas.</li><li>Medir conversaciones reales y vecinos contactados, no solo clicks.</li><li>Preparar un reporte simple para equipo político con 3 prioridades por zona.</li></ol></div></section></div></main>;
}

function Panel({ title, children }) { return <article className="panel"><div className="panel-head"><h2>{title}</h2><span className="badge">demo</span></div><div className="metric-list">{children}</div></article>; }
function Row({ cells }) { return <>{cells.map((c,i)=><span key={i}>{c}</span>)}</>; }
