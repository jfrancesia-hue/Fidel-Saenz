'use client';

import { useEffect, useMemo, useState } from 'react';

const demoLeads = [
  { name: 'Mariana', zone: 'Norte', need: 'Iluminación y seguridad urbana', role: 'Vecino/a' },
  { name: 'Carlos', zone: 'Centro', need: 'Trámites municipales', role: 'Comerciante' },
  { name: 'Lucía', zone: 'Sur', need: 'Trabajo joven y oficios', role: 'Voluntario/a' }
];

export default function AdminPage() {
  const [logged, setLogged] = useState(false);
  const [error, setError] = useState('');
  const [leads, setLeads] = useState(demoLeads);

  useEffect(() => {
    setLogged(localStorage.getItem('pochoAdminDemo') === '1');
    const stored = JSON.parse(localStorage.getItem('campaignLeads') || '[]');
    if (stored.length) setLeads([...stored, ...demoLeads]);
  }, []);

  const leadStats = useMemo(() => ({ total: leads.length + 1284, whatsapp: 392 + Math.min(leads.length, 99), barrios: new Set(leads.map(l => l.zone).filter(Boolean)).size + 31 }), [leads]);

  function login(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (String(data.get('user')).toLowerCase() === 'admin' && String(data.get('pass')) === 'capital2027') {
      localStorage.setItem('pochoAdminDemo', '1');
      setLogged(true);
      setError('');
    } else setError('Usuario o clave incorrectos para la demo.');
  }

  if (!logged) return <main className="admin-shell"><section className="login-view"><div className="login-card"><div className="brand-pill"><span>PS</span><b>Pocho Sáenz · Capital 2027</b></div><h1>Panel privado de campaña</h1><p>Demo funcional para seguir leads, Meta Ads, Google Ads y necesidades de vecinos.</p><form onSubmit={login}><label>Usuario<input name="user" placeholder="admin" required /></label><label>Clave<input name="pass" type="password" placeholder="capital2027" required /></label><button>Entrar al dashboard</button><small>Demo: usuario <b>admin</b> · clave <b>capital2027</b>. No usar como seguridad real.</small><p className="error">{error}</p></form></div></section></main>;

  return <main className="admin-shell dashboard-view"><aside className="sidebar"><a className="admin-brand" href="/"><span>PS</span><b>Capital 2027</b></a><nav><a href="#resumen">Resumen</a><a href="#ads">Meta / Google</a><a href="#leads">Leads</a><a href="#territorio">Territorio</a><a href="#ia">Recomendaciones</a></nav><button id="logoutBtn" onClick={() => { localStorage.removeItem('pochoAdminDemo'); setLogged(false); }}>Salir</button></aside><div className="dashboard-main"><header className="topbar"><div><span className="eyebrow">Centro de inteligencia electoral</span><h1>Dashboard de campaña</h1><p>Vista demo dinámica con leads locales, pauta simulada, zonas y decisiones.</p></div><div className="status-card"><b>Demo read-only</b><span>Lista para conectar APIs reales</span></div></header><section id="resumen" className="section-block"><div className="kpi-grid"><article><span>Leads totales</span><strong>{leadStats.total}</strong><small>incluye formulario demo</small></article><article><span>Costo por lead</span><strong>$428</strong><small>-12% vs semana anterior</small></article><article><span>WhatsApps iniciados</span><strong>{leadStats.whatsapp}</strong><small>67% desde mobile</small></article><article><span>Barrios activos</span><strong>{leadStats.barrios}</strong><small>zonas priorizadas</small></article></div></section><section id="ads" className="section-block two-col"><Panel title="Meta Ads"><Metric k="Gasto" v="$184.200"/><Metric k="Alcance" v="96.400"/><Metric k="CTR" v="3,8%"/><Metric k="Leads" v="684"/><div className="bar-chart"><i style={{height:'42%'}}/><i style={{height:'68%'}}/><i style={{height:'82%'}}/><i style={{height:'74%'}}/><i style={{height:'92%'}}/><i style={{height:'66%'}}/></div></Panel><Panel title="Google Ads"><Metric k="Gasto" v="$96.800"/><Metric k="Clicks" v="4.821"/><Metric k="Consultas" v="214"/><Metric k="Costo consulta" v="$452"/><div className="search-boxes"><span>trámites municipalidad</span><span>reclamos barrio</span><span>trabajo catamarca</span></div></Panel></section><section id="leads" className="section-block two-col"><Panel title="Últimos aportes"><ul className="needs-list">{leads.slice(0,6).map((l,i)=><li key={i}><b>{l.zone || 'Sin zona'} · {l.need || 'Quiere participar'}</b><span>{l.role || 'Vecino/a'}</span></li>)}</ul></Panel><Panel title="Necesidades frecuentes"><ul className="needs-list"><li><b>Iluminación y seguridad urbana</b><span>Alta</span></li><li><b>Calles, baches y veredas</b><span>Alta</span></li><li><b>Trabajo joven / oficios</b><span>Media-alta</span></li><li><b>Trámites y atención</b><span>Media</span></li></ul></Panel></section><section id="territorio" className="section-block"><div className="panel"><div className="panel-head"><h2>Mapa operativo por zona</h2><span>prioridad semanal</span></div><div className="zone-grid">{[['Centro','Comercio · tránsito · trámites','84%'],['Norte','Iluminación · calles · plazas','72%'],['Sur','Jóvenes · deporte · trabajo','68%'],['Este','Servicios · accesos · limpieza','53%'],['Oeste','Recorridas · referentes','49%']].map(z=><article key={z[0]}><b>{z[0]}</b><span>{z[1]}</span><strong>{z[2]}</strong></article>)}</div></div></section><section id="ia" className="section-block"><div className="panel ai-panel"><div><span className="eyebrow">Recomendación IA demo</span><h2>Qué haría esta semana</h2></div><ol><li>Crear pieza corta sobre economía familiar + comercio local.</li><li>Activar WhatsApp para vecinos con reclamos de calles/veredas.</li><li>Separar leads de “trabajo joven” y convocarlos a escucha específica.</li><li>Medir costo por conversación, no solo clicks.</li></ol></div></section></div></main>;
}

function Panel({ title, children }) { return <article className="panel"><div className="panel-head"><h2>{title}</h2><span className="badge">demo</span></div><div className="metric-list">{children}</div></article>; }
function Metric({ k, v }) { return <p><b>{k}</b><span>{v}</span></p>; }
