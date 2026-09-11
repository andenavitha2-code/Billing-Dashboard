# Billwise — Billing Dashboard

React + Tailwind CSS + React Router DOM + Context API, exactly matching the brief.

## Stack
- **React.js** (Vite)
- **Tailwind CSS** — utility classes, `class`-based dark mode
- **React Router DOM** — real client-side routes (`/`, `/plans`, `/payment-methods`, `/invoices`)
- **Context API** — `ThemeContext` drives light/dark mode app-wide (persisted to `localStorage`)

## Run it

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually http://localhost:5173).

## Project structure

```
src/
  context/ThemeContext.jsx   Light/dark theme provider (Context API)
  data/dummyData.js          Dummy JSON: account, plans, cards, invoices
  components/
    Sidebar.jsx              Nav with React Router NavLinks + theme toggle
    StatCard.jsx             Overview stat card
    Skeleton.jsx             Loading skeleton block
  pages/
    Overview.jsx             Current plan, usage, total due, next billing date
    Plans.jsx                Free / Pro / Enterprise, upgrade/downgrade
    PaymentMethods.jsx       Add / list / delete saved cards
    Invoices.jsx             Search + filter table, mobile card view, download
  App.jsx                    Routes + responsive shell (sidebar + main)
  main.jsx                   BrowserRouter + ThemeProvider root
```

## Notes
- Loading states are simulated with a short timeout per route change — swap in a real fetch/query where noted in `App.jsx`.
- Invoice/card "download"/"add" actions are wired to local state only, per the dummy-data requirement — connect to a real billing API when ready.
- Responsive breakpoints: sidebar collapses to a slide-in drawer below `md` (768px); invoice table becomes stacked cards below `sm` (640px); stat cards reflow 4 → 2 → 1 columns.
