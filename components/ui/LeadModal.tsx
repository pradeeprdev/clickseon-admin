"use client";
import React from 'react';

export default function LeadModal({ open, lead, onClose }: { open: boolean; lead: any | null; onClose: () => void }){
  if (!open || !lead) return null;
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white dark:bg-slate-800 p-6 rounded shadow max-w-lg w-full">
        <h3 className="text-lg font-semibold">{lead.fullName}</h3>
        <div className="text-sm text-slate-600 dark:text-slate-300 mt-2">{lead.email} · {lead.phone}</div>
        <div className="mt-4">
          <strong>Service:</strong> {lead.service || '—'}
        </div>
        <div className="mt-2">
          <strong>Message:</strong>
          <p className="mt-1 whitespace-pre-wrap text-sm text-slate-700 dark:text-slate-200">{lead.message || '—'}</p>
        </div>
        <div className="mt-4 flex justify-end">
          <button onClick={onClose} className="px-3 py-2 rounded bg-slate-200 dark:bg-slate-700">Close</button>
        </div>
      </div>
    </div>
  );
}
