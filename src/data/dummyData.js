export const ACCOUNT = {
  planName: "Pro",
  usageUsed: 68,
  usageLimit: 100,
  usageUnit: "GB",
  totalAmount: 49.0,
  nextBillingDate: "Oct 4, 2026",
};

export const PLANS = [
  {
    id: "free",
    name: "Free",
    price: 0,
    features: ["1 project", "5 GB storage", "Community support", "Basic analytics"],
  },
  {
    id: "pro",
    name: "Pro",
    price: 49,
    features: [
      "Unlimited projects",
      "100 GB storage",
      "Priority email support",
      "Advanced analytics",
      "Team roles & permissions",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 199,
    features: [
      "Unlimited everything",
      "1 TB storage",
      "Dedicated account manager",
      "SSO & audit logs",
      "Custom contracts",
    ],
  },
];

export const INITIAL_CARDS = [
  { id: "c1", brand: "VISA", last4: "4417", exp: "08/28", holder: "N. Reddy" },
  { id: "c2", brand: "MC", last4: "1092", exp: "02/27", holder: "N. Reddy" },
];

export const INVOICES = [
  { id: "INV-2026-014", date: "Sep 4, 2026", amount: 49.0, status: "Paid" },
  { id: "INV-2026-013", date: "Aug 4, 2026", amount: 49.0, status: "Paid" },
  { id: "INV-2026-012", date: "Jul 4, 2026", amount: 49.0, status: "Paid" },
  { id: "INV-2026-011", date: "Jun 4, 2026", amount: 29.0, status: "Pending" },
  { id: "INV-2026-010", date: "May 4, 2026", amount: 29.0, status: "Paid" },
  { id: "INV-2026-009", date: "Apr 4, 2026", amount: 29.0, status: "Pending" },
];
