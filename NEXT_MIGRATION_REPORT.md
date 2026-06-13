# NEXT MIGRATION REPORT — Fidel Sáenz Campaign Platform

Fecha: 2026-06-12 / 2026-06-13 ART

## Objetivo

Convertir la landing estática en una app de campaña más completa para demostrar capacidad de plataforma:

- Landing pública en `/`.
- Admin demo en `/admin`.
- Formulario dinámico con persistencia local demo.
- Dashboard con leads, Meta/Google simulados, zonas y recomendaciones.

## Stack agregado

- Next.js
- React
- App Router

Archivos principales:

- `package.json`
- `next.config.js`
- `app/layout.jsx`
- `app/page.jsx`
- `app/admin/page.jsx`
- `app/globals.css`
- `app/admin/admin.css`
- `public/assets/`

## Rutas

- `/` — landing pública React/Next.
- `/admin` — panel privado demo.

Credenciales demo:

- Usuario: `admin`
- Clave: `capital2027`

## Qué es dinámico ahora

- El formulario de la landing guarda leads demo en `localStorage` (`campaignLeads`).
- El dashboard lee esos leads y los mezcla con datos demo.
- Login demo usa `localStorage` (`pochoAdminDemo`).

## Verificación

`npm install`:

- OK.
- npm reportó 2 vulnerabilidades moderadas. No se aplicó `npm audit fix --force` para no romper versiones.

`npm run build`:

- OK.
- Rutas generadas:
  - `/`
  - `/_not-found`
  - `/admin`

Prueba local con `npm start -- -p 4190`:

- `/` → 200
- `/admin` → 200

## Importante

Esto sigue siendo demo funcional, no producción segura.

Para producción real:

1. Auth real (Supabase Auth/Auth.js/etc.).
2. Base de datos real.
3. API routes para leads.
4. Conexiones read-only con Meta Ads y Google Ads.
5. Variables `.env` seguras.
6. Roles y auditoría.
7. Aviso de privacidad para captura de datos.
