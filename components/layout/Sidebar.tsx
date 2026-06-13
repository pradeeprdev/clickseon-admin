"use client";
import Link from 'next/link';
import { Home, Users, LogOut } from 'lucide-react';

export default function Sidebar(){
  return (
    <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 h-screen fixed">
      <div className="p-4 font-semibold text-lg">ClickGrow Admin</div>
      <nav className="px-4 py-2 space-y-1">
        <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800">
          <Home className="w-5 h-5" /> <span>Dashboard</span>
        </Link>
        <Link href="/leads" className="flex items-center gap-3 px-3 py-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800">
          <Users className="w-5 h-5" /> <span>Leads</span>
        </Link>
      </nav>
      <div className="mt-auto p-4">
        <button onClick={() => { localStorage.removeItem('token'); window.location.href = '/login'; }} className="w-full flex items-center gap-2 px-3 py-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800">
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </div>
    </aside>
  );
}
