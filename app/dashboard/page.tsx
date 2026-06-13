"use client";

import { useEffect, useState } from "react";
import { getStats } from "../../services/dashboardService";
import { StatsResponse } from "../../types";
import dynamic from "next/dynamic";
import {
  Users,
  MessageSquare,
  TrendingUp,
  Activity,
  ArrowUpRight,
} from "lucide-react";
import WeatherCard from '../../components/dashboard/WeatherCard';

const Charts = dynamic(
  () => import("../../components/dashboard/Charts"),
  { ssr: false }
);

export default function DashboardPage() {
  const [stats, setStats] = useState<StatsResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await getStats();
        setStats(res);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const conversionRate = Math.min(
    100,
    Math.round(
      ((stats?.todayLeads || 0) /
        Math.max(1, stats?.totalLeads || 1)) *
        100
    )
  );

  const statCards = [
    {
      title: "Total Leads",
      value: stats?.totalLeads || 0,
      icon: Users,
      gradient:
        "from-blue-500 via-indigo-500 to-purple-600",
    },
    {
      title: "Today's Leads",
      value: stats?.todayLeads || 0,
      icon: TrendingUp,
      gradient:
        "from-emerald-500 via-green-500 to-teal-600",
    },
    {
      title: "Total Chats",
      value: stats?.totalChats || 0,
      icon: MessageSquare,
      gradient:
        "from-orange-500 via-pink-500 to-rose-600",
    },
    {
      title: "Conversion Rate",
      value: `${conversionRate}%`,
      icon: Activity,
      gradient:
        "from-purple-500 via-fuchsia-500 to-pink-600",
    },
  ];

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">

        <div>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
            Dashboard
          </h1>

          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Monitor leads, chats, growth, and business
            performance in one place.
          </p>
        </div>

        <div className="mt-4 lg:mt-0">
          <button className="inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-indigo-600 to-purple-600 px-5 py-3 text-white font-medium shadow-lg hover:scale-105 transition">
            View Reports
            <ArrowUpRight size={18} />
          </button>
        </div>

      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        {statCards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className={`relative overflow-hidden rounded-3xl bg-linear-to-r ${card.gradient} p-px`}
            >
              <div className="rounded-3xl bg-white dark:bg-slate-900 p-6 h-full">

                <div className="flex items-center justify-between">

                  <div>
                    <p className="text-sm text-slate-500">
                      {card.title}
                    </p>

                    <h3 className="mt-3 text-4xl font-bold text-slate-900 dark:text-white">
                      {loading ? "—" : card.value}
                    </h3>
                  </div>

                  <div
                    className={`h-14 w-14 rounded-2xl bg-linear-to-r ${card.gradient} flex items-center justify-center text-white shadow-lg`}
                  >
                    <Icon size={24} />
                  </div>
                </div>

                <div className="mt-5 flex items-center gap-2 text-emerald-500 text-sm font-medium">
                  ↑ Growth Active
                </div>

              </div>
            </div>
          );
        })}

      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">

          <div className="mb-6">
            <h3 className="text-xl font-semibold">
              Leads Analytics
            </h3>

            <p className="text-sm text-slate-500">
              Daily lead generation trends
            </p>
          </div>

          <Charts type="daily" />
        </div>

        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">

          <div className="mb-6">
            <h3 className="text-xl font-semibold">
              Growth Overview
            </h3>

            <p className="text-sm text-slate-500">
              Monthly business performance
            </p>
          </div>

          <Charts type="monthly" />
        </div>

      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* Activity */}
        <div className="xl:col-span-2 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">

          <h3 className="text-xl font-semibold mb-6">
            Recent Activity
          </h3>

          <div className="space-y-4">

            <div className="flex items-center gap-4">
              <div className="h-3 w-3 rounded-full bg-emerald-500" />
              <p className="text-sm text-slate-600 dark:text-slate-300">
                New lead submitted from website.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="h-3 w-3 rounded-full bg-indigo-500" />
              <p className="text-sm text-slate-600 dark:text-slate-300">
                AI chatbot handled customer inquiry.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="h-3 w-3 rounded-full bg-orange-500" />
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Automation workflow triggered.
              </p>
            </div>

          </div>
        </div>

        {/* Quick Stats */}
        <div className="rounded-3xl bg-linear-to-br from-indigo-600 via-purple-600 to-pink-600 text-white p-6 shadow-xl">

          <h3 className="text-xl font-semibold">
            Business Health
          </h3>

          <p className="mt-2 text-white/80">
            Your business performance summary.
          </p>

          <div className="mt-8 space-y-5">

            <div>
              <div className="text-sm text-white/70">
                Lead Growth
              </div>
              <div className="text-3xl font-bold">
                +32%
              </div>
            </div>

            <div>
              <div className="text-sm text-white/70">
                Engagement
              </div>
              <div className="text-3xl font-bold">
                87%
              </div>
            </div>

            <div>
              <div className="text-sm text-white/70">
                Conversion
              </div>
              <div className="text-3xl font-bold">
                {conversionRate}%
              </div>
            </div>

          </div>
        </div>

        {/* Weather */}
        <div className="xl:col-span-1">
          <WeatherCard />
        </div>

      </div>
    </div>
  );
}