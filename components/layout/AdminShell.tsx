"use client";
import React from 'react';
import { usePathname } from 'next/navigation';
import AuthGuard from '../../middleware/authGuard';
import Sidebar from './Sidebar';
import Header from './Header';

export default function AdminShell({ children }: { children: React.ReactNode }){
  const pathname = usePathname();

  // keep login (and any /login/*) routes free of the admin chrome
  const isAuthRoute = pathname && pathname.startsWith('/login');

  if (isAuthRoute) {
    return <>{children}</>;
  }

  return (
    <AuthGuard>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 min-h-screen ml-64">
          <Header />
          <main className="p-6">{children}</main>
        </div>
      </div>
    </AuthGuard>
  );
}
