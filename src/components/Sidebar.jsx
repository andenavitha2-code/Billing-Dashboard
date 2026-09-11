import React from "react";
import { NavLink } from "react-router-dom";
import { LayoutGrid, Layers, CreditCard, Receipt, Sun, Moon, X, ChevronRight } from "lucide-react";
import { useTheme } from "../context/ThemeContext.jsx";

const NAV_ITEMS = [
  { to: "/", label: "Overview", icon: LayoutGrid, end: true },
  { to: "/plans", label: "Plans", icon: Layers },
  { to: "/payment-methods", label: "Payment methods", icon: CreditCard },
  { to: "/invoices", label: "Invoices", icon: Receipt },
];

export default function Sidebar({ open, onClose }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <aside
      className={`
        fixed inset-y-0 left-0 z-30 flex h-screen w-60 flex-col border-r
        border-border bg-surface p-4 dark:border-border-dark dark:bg-surface-dark
        md:sticky md:top-0 md:translate-x-0
        ${open ? "translate-x-0" : "-translate-x-full"}
        transition-transform duration-200 md:transition-none
      `}
    >
      <div>
        <div className="mb-4 flex items-center gap-2.5 border-b border-border pb-5 pt-1 dark:border-border-dark">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gold font-head text-sm font-bold text-white dark:bg-gold-dark dark:text-surface-dark">
            B
          </div>
          <span className="font-head text-base font-semibold text-ink dark:text-ink-dark">
            Billwise
          </span>
          <button
            className="ml-auto text-inksoft hover:text-ink dark:text-inksoft-dark dark:hover:text-ink-dark md:hidden"
            onClick={onClose}
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex flex-col gap-0.5">
          {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "border-l-2 border-gold bg-surfacealt pl-[10px] text-ink dark:border-gold-dark dark:bg-surfacealt-dark dark:text-ink-dark"
                    : "text-inksoft hover:bg-surfacealt hover:text-ink dark:text-inksoft-dark dark:hover:bg-surfacealt-dark dark:hover:text-ink-dark"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon size={17} />
                  {label}
                  <ChevronRight
                    size={14}
                    className={`ml-auto ${isActive ? "opacity-100" : "opacity-0"}`}
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="mt-auto border-t border-border pt-3.5 dark:border-border-dark">
        <button
          onClick={toggleTheme}
          className="flex w-full items-center justify-between rounded-lg border border-border bg-surfacealt px-3 py-2.5 text-sm text-ink dark:border-border-dark dark:bg-surfacealt-dark dark:text-ink-dark"
        >
          <span className="flex items-center gap-2">
            {theme === "light" ? <Sun size={15} /> : <Moon size={15} />}
            {theme === "light" ? "Light mode" : "Dark mode"}
          </span>
          <span className="opacity-60">Toggle</span>
        </button>
      </div>
    </aside>
  );
}
