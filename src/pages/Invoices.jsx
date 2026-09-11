import React, { useMemo, useState } from "react";
import { Search, Download, CheckCircle2, Clock3 } from "lucide-react";
import Skeleton from "../components/Skeleton.jsx";
import { INVOICES } from "../data/dummyData.js";
import { useToast } from "../context/ToastContext.jsx";

function downloadInvoice(invoice) {
  const content = `INVOICE
-------------------------
Invoice number : ${invoice.id}
Date           : ${invoice.date}
Amount         : $${invoice.amount.toFixed(2)}
Status         : ${invoice.status}
-------------------------
Billwise Inc.
This is a sample invoice generated from dummy data.
`;
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${invoice.id}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function StatusPill({ status }) {
  const isPaid = status === "Paid";
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
        isPaid
          ? "bg-greensoft text-green dark:bg-greensoft-dark dark:text-green-dark"
          : "bg-goldsoft text-gold dark:bg-goldsoft-dark dark:text-gold-dark"
      }`}
    >
      {isPaid ? <CheckCircle2 size={12} /> : <Clock3 size={12} />}
      {status}
    </span>
  );
}

export default function Invoices({ loading }) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const { showToast } = useToast();

  const handleDownload = (invoice) => {
    downloadInvoice(invoice);
    showToast(`Downloaded ${invoice.id}`);
  };

  const filtered = useMemo(() => {
    return INVOICES.filter((inv) => {
      const matchesQuery = inv.id.toLowerCase().includes(query.toLowerCase());
      const matchesStatus = status === "all" || inv.status.toLowerCase() === status;
      return matchesQuery && matchesStatus;
    });
  }, [query, status]);

  return (
    <div>
      <h1 className="font-head text-2xl font-semibold text-ink dark:text-ink-dark">Invoices</h1>
      <p className="mt-1 text-sm text-inksoft dark:text-inksoft-dark">
        Search and download past invoices for your records.
      </p>

      <div className="mt-5 mb-4 flex flex-wrap items-center gap-2.5">
        <div className="flex min-w-[200px] items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2 dark:border-border-dark dark:bg-surface-dark">
          <Search size={15} className="shrink-0 text-inksoft dark:text-inksoft-dark" />
          <input
            placeholder="Search invoice number"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-ink outline-none dark:text-ink-dark"
          />
        </div>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="rounded-lg border border-border bg-surface px-2.5 py-2 text-sm text-ink dark:border-border-dark dark:bg-surface-dark dark:text-ink-dark"
        >
          <option value="all">All statuses</option>
          <option value="paid">Paid</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      <div className="rounded-card border border-border bg-surface p-4 dark:border-border-dark dark:bg-surface-dark">
        {loading ? (
          <div className="flex flex-col gap-3.5">
            <Skeleton h={16} />
            <Skeleton h={16} />
            <Skeleton h={16} />
            <Skeleton h={16} />
          </div>
        ) : (
          <>
            <table className="hidden w-full border-collapse sm:table">
              <thead>
                <tr>
                  {["Invoice", "Date", "Amount", "Status", ""].map((h) => (
                    <th
                      key={h}
                      className="border-b border-border px-2.5 pb-2.5 text-left text-[11px] font-semibold uppercase tracking-wide text-inksoft dark:border-border-dark dark:text-inksoft-dark"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((inv) => (
                  <tr key={inv.id}>
                    <td className="border-b border-border px-2.5 py-3 text-sm text-ink dark:border-border-dark dark:text-ink-dark">
                      {inv.id}
                    </td>
                    <td className="border-b border-border px-2.5 py-3 text-sm text-ink dark:border-border-dark dark:text-ink-dark">
                      {inv.date}
                    </td>
                    <td className="tabular border-b border-border px-2.5 py-3 text-sm text-ink dark:border-border-dark dark:text-ink-dark">
                      ${inv.amount.toFixed(2)}
                    </td>
                    <td className="border-b border-border px-2.5 py-3 dark:border-border-dark">
                      <StatusPill status={inv.status} />
                    </td>
                    <td className="border-b border-border px-2.5 py-3 dark:border-border-dark">
                      <button
                        onClick={() => handleDownload(inv)}
                        className="flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-xs font-semibold text-ink hover:bg-surfacealt dark:border-border-dark dark:text-ink-dark dark:hover:bg-surfacealt-dark"
                      >
                        <Download size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex flex-col gap-3 sm:hidden">
              {filtered.map((inv) => (
                <div key={inv.id} className="rounded-card border border-border p-3.5 dark:border-border-dark">
                  <div className="flex items-center justify-between">
                    <strong className="text-sm text-ink dark:text-ink-dark">{inv.id}</strong>
                    <StatusPill status={inv.status} />
                  </div>
                  <span className="mt-1 block text-xs text-inksoft dark:text-inksoft-dark">{inv.date}</span>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="tabular font-semibold text-ink dark:text-ink-dark">
                      ${inv.amount.toFixed(2)}
                    </span>
                    <button
                      onClick={() => handleDownload(inv)}
                      className="flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-xs font-semibold text-ink dark:border-border-dark dark:text-ink-dark"
                    >
                      <Download size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="p-10 text-center text-sm text-inksoft dark:text-inksoft-dark">
                No invoices match your search.
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
