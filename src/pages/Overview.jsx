import React from "react";
import StatCard from "../components/StatCard.jsx";
import Skeleton from "../components/Skeleton.jsx";
import { ACCOUNT } from "../data/dummyData.js";

export default function Overview({ loading }) {
  const pct = Math.round((ACCOUNT.usageUsed / ACCOUNT.usageLimit) * 100);

  return (
    <div>
      <h1 className="font-head text-2xl font-semibold text-ink dark:text-ink-dark">
        Billing overview
      </h1>
      <p className="mt-1 text-sm text-inksoft dark:text-inksoft-dark">
        A snapshot of your plan, usage, and upcoming charges.
      </p>

      <div className="mt-5 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Current plan" value={ACCOUNT.planName} foot="Renews monthly" loading={loading} />
        <StatCard
          label="Monthly usage"
          value={`${ACCOUNT.usageUsed} / ${ACCOUNT.usageLimit} ${ACCOUNT.usageUnit}`}
          foot={`${pct}% of your limit`}
          loading={loading}
        />
        <StatCard
          label="Total amount due"
          value={`$${ACCOUNT.totalAmount.toFixed(2)}`}
          foot="Billed monthly"
          loading={loading}
        />
        <StatCard
          label="Next billing date"
          value={ACCOUNT.nextBillingDate}
          foot="Auto-charged to card ending 4417"
          loading={loading}
        />
      </div>

      <div className="mt-7 rounded-card border border-border bg-surface p-4 dark:border-border-dark dark:bg-surface-dark">
        <div className="mb-3 flex items-baseline justify-between">
          <div className="text-base font-semibold text-ink dark:text-ink-dark">Storage usage</div>
          <span className="tabular text-xs text-inksoft dark:text-inksoft-dark">{pct}%</span>
        </div>
        {loading ? (
          <Skeleton h={8} />
        ) : (
          <div className="h-2 w-full overflow-hidden rounded-full bg-surfacealt dark:bg-surfacealt-dark">
            <div
              className="h-full rounded-full bg-gold transition-all duration-500 dark:bg-gold-dark"
              style={{ width: `${pct}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
