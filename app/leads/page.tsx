"use client";

import { useEffect, useState } from "react";
import {
  Search,
  Trash2,
  Eye,
  Users,
  Mail,
  Phone,
} from "lucide-react";

import { getLeads, deleteLead } from "../../services/leadService";
import type { Lead } from "../../types";
import toast from "react-hot-toast";
import LeadModal from "../../components/ui/LeadModal";

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Lead | null>(null);

  const fetchLeads = async () => {
    try {
      const res = await getLeads();
      setLeads(res.leads || res);
    } catch (err) {
      toast.error("Failed to load leads");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this lead?")) return;

    try {
      await deleteLead(id);

      setLeads((prev) =>
        prev.filter((lead) => lead._id !== id)
      );

      toast.success("Lead deleted");
    } catch {
      toast.error("Delete failed");
    }
  };

  const filteredLeads = leads.filter(
    (lead) =>
      lead.fullName
        ?.toLowerCase()
        .includes(query.toLowerCase()) ||
      lead.email
        ?.toLowerCase()
        .includes(query.toLowerCase())
  );

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

        <div>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
            Lead Management
          </h1>

          <p className="mt-2 text-slate-500">
            Manage and track all incoming leads.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-50 text-indigo-700 font-medium">
          <Users size={18} />
          {filteredLeads.length} Leads
        </div>

      </div>

      {/* Search */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-5">

        <div className="relative">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search by name or email..."
            value={query}
            onChange={(e) =>
              setQuery(e.target.value)
            }
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

      </div>

      {/* Table Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">

        <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800">

          <h2 className="text-xl font-semibold">
            All Leads
          </h2>

        </div>

        {loading ? (
          <div className="p-10 text-center text-slate-500">
            Loading leads...
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="p-16 text-center">

            <Users
              size={48}
              className="mx-auto text-slate-300"
            />

            <h3 className="mt-4 text-lg font-semibold">
              No Leads Found
            </h3>

            <p className="text-slate-500 mt-2">
              Try searching with another keyword.
            </p>

          </div>
        ) : (
          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/50">

                  <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider">
                    Lead
                  </th>

                  <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider">
                    Contact
                  </th>

                  <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider">
                    Service
                  </th>

                  <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider">
                    Date
                  </th>

                  <th className="text-right px-6 py-4 text-xs font-semibold uppercase tracking-wider">
                    Actions
                  </th>

                </tr>
              </thead>

              <tbody>

                {filteredLeads.map((lead) => (
                  <tr
                    key={lead._id}
                    className="border-t border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition"
                  >

                    {/* Lead */}
                    <td className="px-6 py-4">

                      <div className="flex items-center gap-3">

                        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                          {lead.fullName?.charAt(0)}
                        </div>

                        <div>
                          <div className="font-medium">
                            {lead.fullName}
                          </div>

                          <div className="text-xs text-slate-500">
                            Potential Customer
                          </div>
                        </div>

                      </div>

                    </td>

                    {/* Contact */}
                    <td className="px-6 py-4">

                      <div className="space-y-1">

                        <div className="flex items-center gap-2 text-sm">
                          <Mail size={14} />
                          {lead.email}
                        </div>

                        <div className="flex items-center gap-2 text-sm text-slate-500">
                          <Phone size={14} />
                          {lead.phone}
                        </div>

                      </div>

                    </td>

                    {/* Service */}
                    <td className="px-6 py-4">

                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-medium">
                        {lead.service}
                      </span>

                    </td>

                    {/* Date */}
                    <td className="px-6 py-4 text-sm text-slate-500">

                      {new Date(
                        lead.createdAt
                      ).toLocaleDateString()}

                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">

                      <div className="flex justify-end gap-2">

                        <button
                          onClick={() =>
                            setSelected(lead)
                          }
                          className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition"
                        >
                          <Eye size={16} />
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(lead._id)
                          }
                          className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 transition"
                        >
                          <Trash2 size={16} />
                        </button>

                      </div>

                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>
        )}
      </div>

      <LeadModal
        open={!!selected}
        lead={selected}
        onClose={() => setSelected(null)}
      />
    </div>
  );
}