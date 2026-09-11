import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { ToastProvider } from "./context/ToastContext.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Overview from "./pages/Overview.jsx";
import Plans from "./pages/Plans.jsx";
import PaymentMethods from "./pages/PaymentMethods.jsx";
import Invoices from "./pages/Invoices.jsx";

function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // Simulate a network fetch whenever the route changes
  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 650);
    return () => clearTimeout(t);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-bg font-body dark:bg-bg-dark">
      <div className="flex">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {sidebarOpen && (
          <div
            className="fixed inset-0 z-20 bg-black/40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <main className="w-full min-w-0 px-4 pb-16 pt-4 sm:px-6 sm:pt-6 md:px-7">
          <button
            className="mb-4 inline-flex items-center rounded-lg border border-border bg-surface p-2 text-ink dark:border-border-dark dark:bg-surface-dark dark:text-ink-dark md:hidden"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={18} />
          </button>

          <div className="mx-auto max-w-5xl">
            <Routes>
              <Route path="/" element={<Overview loading={loading} />} />
              <Route path="/plans" element={<Plans loading={loading} />} />
              <Route path="/payment-methods" element={<PaymentMethods loading={loading} />} />
              <Route path="/invoices" element={<Invoices loading={loading} />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <DashboardLayout />
      </ToastProvider>
    </ThemeProvider>
  );
}
