"use client";

import { useAuth } from "../../hooks/useAuth";
import {
  Bell,
  LogOut,
  CalendarDays,
  UserCircle2,
} from "lucide-react";
import WeatherMini from './WeatherMini';

export default function Header() {
  const { user, logout } = useAuth();

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <header className="sticky top-0 z-40 h-20 border-b border-slate-200 bg-white/80 backdrop-blur-xl">

      <div className="h-full px-8 flex items-center justify-between">

        {/* Left Side */}
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Dashboard
          </h2>

          <div className="flex items-center gap-2 mt-1 text-sm text-slate-500">
            <CalendarDays size={14} />
            <span>{today}</span>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">

          <WeatherMini />

          {/* Notification */}
          <button className="relative p-2 rounded-xl border border-slate-200 hover:bg-slate-100 transition">
            <Bell size={18} />

            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
          </button>

          {/* User Card */}
          <div className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-2">

            <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
              <UserCircle2
                size={24}
                className="text-indigo-600"
              />
            </div>

            <div className="hidden md:block">
              <p className="text-sm font-semibold text-slate-900">
                {user?.name || "Admin"}
              </p>

              <p className="text-xs text-slate-500">
                {user?.email || "Administrator"}
              </p>
            </div>
          </div>

          {/* Logout */}
          <button
            onClick={logout}
            className="flex items-center gap-2 rounded-xl bg-red-50 px-4 py-2 text-red-600 hover:bg-red-100 transition"
          >
            <LogOut size={16} />
            <span className="hidden md:block">
              Logout
            </span>
          </button>

        </div>
      </div>
    </header>
  );
}