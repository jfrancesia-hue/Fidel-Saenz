# HANDOFF — Fidel Sáenz

Fecha: 2026-06-12

## Trabajo realizado

Se rehizo la dirección visual de la demo porque la versión anterior no alcanzaba nivel premium. Se reemplazó el enfoque de dashboard genérico por una pieza política/institucional más seria, editorial y de alto impacto.

### Cambios principales

- Se separó el CSS embebido a `styles.css`.
- Se separó el JS embebido a `script.js`.
- `index.html` quedó más liviano y mantenible.
- Se agregó SEO/metadata básica:
  - title nuevo;
  - description nueva;
  - theme-color;
  - Open Graph;
  - Twitter card.
- Se agregó una capa `PREMIUM REDESIGN 2026-06-12` en CSS.
- Se agregó menú mobile real con `nav-toggle`, cierre por link y tecla Escape.
- Se auditó GitHub: `origin/main` sigue en `552d18e Add campaign demo`; no se detectaron commits nuevos al momento de revisar.
- Se rehizo:
  - hero editorial de alto impacto;
  - composición visual del candidato sin foto real;
  - navegación premium sticky;
  - manifiesto/quote principal;
  - métricas de gestión;
  - ejes de visión política;
  - mapa territorial;
  - tablero de comando;
  - formulario demo;
  - responsive mobile.
- Se redujo la sensación de template/dashboard genérico.
- Se incorporó una paleta más institucional inspirada en Catamarca Ciudad / Municipalidad SFVC: azul ciudad, celeste, blanco y grises sobrios, bajando el verde/dorado previo.
- Se hizo un híbrido: estructura simple para público masivo, pero primer impacto emocional con fe/esperanza/confianza.
- Se simplificó la web para público masivo/básico:
  - 5 secciones totales;
  - navegación reducida;
  - textos cortos;
  - foco en entender en 10 segundos;
  - CTA claros: contar problema, ver propuestas, sumarse.
- Se agregó una capa de atención/soluciones para que la web no sea solo informativa:
  - sección `La Capital te escucha`;
  - problemas frecuentes: calles, iluminación/seguridad urbana, limpieza/servicios, trámites;
  - método de canal vecino;
  - formulario final con campo “qué necesitás que se resuelva”.
- Se amplió el mensaje para que no quede centrado solo en vivienda/obra: ahora habla de ciudad, servicios, seguridad urbana, trabajo, juventud, comercio, gestión, cercanía y futuro.
- Se convirtió la landing en herramienta de campaña con:
  - claim principal emocional: “Pocho Sáenz: fe, esperanza y gestión para levantar la Capital”.
  - sección `Plan Capital 100 días`.
  - sección `Por qué Pocho`.
  - CTA de conversión política con WhatsApp placeholder y roles de campaña.
- Se reemplazó el mapa SVG ficticio por una sección `Territorio real` con foto de Catamarca Capital, método territorial y tarjetas por zona.
- Se incorporaron imágenes reales locales:
  - Foto real provista por Jorge como hero principal (`assets/candidate/fidel-04.jpg`).
  - Fotos reales de redes provistas por Jorge para perfil, gestión y galería territorial.
  - Plaza 25 de Mayo / Catamarca Capital como soporte de identidad.
  - Catedral/centro histórico como identidad territorial.
- Se documentaron fuentes en `ASSET_SOURCES.json`, `IMAGE_SOURCE_AUDIT.json` y `CANDIDATE_ASSETS.json`.

## Archivos

- `index.html`
- `styles.css`
- `script.js`
- `README.md`
- `AUDIT_REPORT.md`
- `AUDIT_REPORT.json`
- `VERIFY_REPORT.json`
- `REMOTE_AUDIT_REPORT.json`
- `ASSET_SOURCES.json`
- `IMAGE_SOURCE_AUDIT.json`
- `assets/photos/`
- `assets/candidate/`
- `CANDIDATE_ASSETS.json`

## Verificación

`VERIFY_REPORT.json`:

- `ok: true`
- `hybridOk: true`
- `feCount: 2`
- `esperanzaCount: 1`
- `simpleOk: true`
- `sectionCount: 5`
- `solutionsOk/globalOk`: verificado en iteraciones previas
- `viviendaCount: 0
- `territoryOk/messageOk/campaignOk/cssOk`: verificado en iteraciones previas
- anchors faltantes: 0
- ids duplicados: 0
- `jsOk`: sintaxis verificada
- anchors faltantes: 0
- ids duplicados: 0
- refs: `styles.css`, `script.js`

Servidor local:

- `/` → 200
- `/styles.css` → 200
- `/script.js` → 200

## Pendientes recomendados

1. Conseguir retrato oficial de Fidel Sáenz en alta calidad para hero/candidato.
2. Validar permisos/licencia de uso de imágenes antes de publicación pública o campaña real.
3. Validar textos/propuestas con el equipo político.
4. Validar si los números deben seguir como ficticios o pasar a reales.
5. Si se publica, agregar dominio/canonical y quizás favicon.
6. QA visual en navegador real mobile/desktop.
7. Si Jorge autoriza, pushear a GitHub y/o deployar a Vercel.
