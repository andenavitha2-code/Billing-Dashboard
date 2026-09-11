import React, { useState } from "react";
import { Plus, Trash2, X } from "lucide-react";
import Skeleton from "../components/Skeleton.jsx";
import { INITIAL_CARDS } from "../data/dummyData.js";
import { useToast } from "../context/ToastContext.jsx";

export default function PaymentMethods({ loading }) {
  const [cards, setCards] = useState(INITIAL_CARDS);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ number: "", name: "", exp: "", cvc: "" });
  const { showToast } = useToast();

  const addCard = (e) => {
    e.preventDefault();
    if (!form.number || !form.name || !form.exp) return;
    const last4 = form.number.replace(/\s/g, "").slice(-4) || "0000";
    setCards((c) => [
      ...c,
      { id: `c${Date.now()}`, brand: "VISA", last4, exp: form.exp, holder: form.name },
    ]);
    setForm({ number: "", name: "", exp: "", cvc: "" });
    setShowModal(false);
    showToast("Card added");
  };

  const removeCard = (id) => {
    setCards((c) => c.filter((card) => card.id !== id));
    showToast("Card removed");
  };

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="font-head text-2xl font-semibold text-ink dark:text-ink-dark">
            Payment methods
          </h1>
          <p className="mt-1 text-sm text-inksoft dark:text-inksoft-dark">
            Manage the cards used for your subscription charges.
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-1.5 rounded-lg bg-ink px-4 py-2.5 text-sm font-semibold text-white dark:bg-gold-dark dark:text-surface-dark"
        >
          <Plus size={16} /> Add new card
        </button>
      </div>

      <div className="mt-6 rounded-card border border-border bg-surface p-2 dark:border-border-dark dark:bg-surface-dark">
        {loading ? (
          <div className="flex flex-col gap-3.5 p-3">
            <Skeleton h={40} />
            <Skeleton h={40} />
          </div>
        ) : cards.length === 0 ? (
          <div className="p-10 text-center text-sm text-inksoft dark:text-inksoft-dark">
            No saved cards yet. Add one to keep your subscription active.
          </div>
        ) : (
          cards.map((c) => (
            <div
              key={c.id}
              className="flex items-center justify-between border-b border-border px-2.5 py-3.5 last:border-0 dark:border-border-dark"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-[30px] w-[42px] items-center justify-center rounded-md border border-border bg-surfacealt text-[10px] font-bold text-inksoft dark:border-border-dark dark:bg-surfacealt-dark dark:text-inksoft-dark">
                  {c.brand}
                </div>
                <div>
                  <div className="tabular text-sm font-medium text-ink dark:text-ink-dark">
                    •••• •••• •••• {c.last4}
                  </div>
                  <div className="mt-0.5 text-xs text-inksoft dark:text-inksoft-dark">
                    Expires {c.exp} · {c.holder}
                  </div>
                </div>
              </div>
              <button
                onClick={() => removeCard(c.id)}
                aria-label="Delete card"
                className="rounded-md p-2 text-inksoft hover:text-red dark:text-inksoft-dark dark:hover:text-red-dark"
              >
                <Trash2 size={17} />
              </button>
            </div>
          ))
        )}
      </div>

      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-5"
          onClick={() => setShowModal(false)}
        >
          <div
            className="w-full max-w-sm rounded-2xl border border-border bg-surface p-6 dark:border-border-dark dark:bg-surface-dark"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-semibold text-ink dark:text-ink-dark">Add new card</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-inksoft hover:text-ink dark:text-inksoft-dark dark:hover:text-ink-dark"
              >
                <X size={18} />
              </button>
            </div>
            <form onSubmit={addCard} className="flex flex-col gap-3.5">
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-inksoft dark:text-inksoft-dark">
                  Card number
                </label>
                <input
                  placeholder="1234 5678 9012 3456"
                  value={form.number}
                  onChange={(e) => setForm({ ...form, number: e.target.value })}
                  className="w-full rounded-lg border border-border bg-bg px-3 py-2.5 text-sm text-ink outline-none focus:border-gold dark:border-border-dark dark:bg-bg-dark dark:text-ink-dark dark:focus:border-gold-dark"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-inksoft dark:text-inksoft-dark">
                  Cardholder name
                </label>
                <input
                  placeholder="Full name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-lg border border-border bg-bg px-3 py-2.5 text-sm text-ink outline-none focus:border-gold dark:border-border-dark dark:bg-bg-dark dark:text-ink-dark dark:focus:border-gold-dark"
                />
              </div>
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="mb-1.5 block text-xs font-semibold text-inksoft dark:text-inksoft-dark">
                    Expiry
                  </label>
                  <input
                    placeholder="MM/YY"
                    value={form.exp}
                    onChange={(e) => setForm({ ...form, exp: e.target.value })}
                    className="w-full rounded-lg border border-border bg-bg px-3 py-2.5 text-sm text-ink outline-none focus:border-gold dark:border-border-dark dark:bg-bg-dark dark:text-ink-dark dark:focus:border-gold-dark"
                  />
                </div>
                <div className="flex-1">
                  <label className="mb-1.5 block text-xs font-semibold text-inksoft dark:text-inksoft-dark">
                    CVC
                  </label>
                  <input
                    placeholder="123"
                    value={form.cvc}
                    onChange={(e) => setForm({ ...form, cvc: e.target.value })}
                    className="w-full rounded-lg border border-border bg-bg px-3 py-2.5 text-sm text-ink outline-none focus:border-gold dark:border-border-dark dark:bg-bg-dark dark:text-ink-dark dark:focus:border-gold-dark"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="mt-1 rounded-lg bg-ink py-2.5 text-sm font-semibold text-white dark:bg-gold-dark dark:text-surface-dark"
              >
                Save card
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
