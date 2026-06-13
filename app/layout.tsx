import './globals.css';
import AdminShell from '../components/layout/AdminShell';

export default function AdminLayout({ children }: { children: React.ReactNode }){
  return (
    <html lang="en">
      <body className="bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100">
        <AdminShell>
          {children}
        </AdminShell>
      </body>
    </html>
  );
}
