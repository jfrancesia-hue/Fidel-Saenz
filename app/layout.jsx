import './globals.css';
import './admin/admin.css';

export const metadata = {
  title: 'Pocho Sáenz — Catamarca Capital 2027',
  description: 'Plataforma digital de campaña para Catamarca Capital.',
  robots: 'index, follow',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
