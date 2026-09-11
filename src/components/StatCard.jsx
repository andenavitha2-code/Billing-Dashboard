import React from "react";
import Skeleton from "./Skeleton.jsx";

export default function StatCard({ label, value, foot, loading }) {
  return (
    <div className="rounded-card border border-border dark:border-border-dark bg-surface dark:bg-surface-dark p-4">
      <div className="text-xs font-medium text-inksoft dark:text-inksoft-dark">{label}</div>
      {loading ? (
        <div className="mt-2.5">
          <Skeleton w="70%" h={22} />
        </div>
      ) : (
        <div className="mt-2 font-head text-2xl font-semibold text-ink dark:text-ink-dark tabular">
          {value}
        </div>
      )}
      {!loading && foot && (
        <div className="mt-2 text-xs text-inksoft dark:text-inksoft-dark">{foot}</div>
      )}
    </div>
  );
}
