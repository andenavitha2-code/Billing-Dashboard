import React, { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import Skeleton from "../components/Skeleton.jsx";
import { PLANS } from "../data/dummyData.js";
import { useToast } from "../context/ToastContext.jsx";

export default function Plans({ loading }) {
  const [activePlan, setActivePlan] = useState("pro");
  const { showToast } = useToast();

  const handleSelectPlan = (plan, isDowngrade) => {
    setActivePlan(plan.id);
    showToast(`${isDowngrade ? "Downgraded" : "Upgraded"} to ${plan.name} plan`);
  };

  return (
    <div>
      <h1 className="font-head text-2xl font-semibold text-ink dark:text-ink-dark">
        Subscription plans
      </h1>
      <p className="mt-1 text-sm text-inksoft dark:text-inksoft-dark">
        Change plans any time — changes apply from your next billing cycle.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        {PLANS.map((plan) => {
          const isCurrent = plan.id === activePlan;
          const isDowngrade =
            PLANS.findIndex((p) => p.id === plan.id) <
            PLANS.findIndex((p) => p.id === activePlan);

          return (
            <div
              key={plan.id}
              onClick={() => !isCurrent && !loading && handleSelectPlan(plan, isDowngrade)}
              className={`relative flex flex-col rounded-card border bg-surface p-5 transition-colors dark:bg-surface-dark ${
                isCurrent
                  ? "border-gold dark:border-gold-dark"
                  : "cursor-pointer border-border hover:border-gold dark:border-border-dark dark:hover:border-gold-dark"
              }`}
            >
              {isCurrent && (
                <span className="absolute -top-2.5 right-4 rounded-full bg-gold px-2.5 py-0.5 text-[11px] font-semibold text-white dark:bg-gold-dark dark:text-surface-dark">
                  Current plan
                </span>
              )}

              {loading ? (
                <>
                  <Skeleton w="50%" h={18} />
                  <div className="mt-3">
                    <Skeleton w="40%" h={30} />
                  </div>
                  <div className="mt-4 flex flex-col gap-2">
                    <Skeleton h={12} />
                    <Skeleton h={12} />
                    <Skeleton h={12} />
                  </div>
                </>
              ) : (
                <>
                  <div className="font-head text-lg font-semibold text-ink dark:text-ink-dark">
                    {plan.name}
                  </div>
                  <div className="mt-2.5 font-head text-3xl font-bold text-ink dark:text-ink-dark">
                    ${plan.price}
                    <span className="ml-1 font-body text-sm font-medium text-inksoft dark:text-inksoft-dark">
                      /month
                    </span>
                  </div>
                  <ul className="my-4 flex flex-col gap-2">
                    {plan.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-2 text-sm text-inksoft dark:text-inksoft-dark"
                      >
                        <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-green dark:text-green-dark" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button
                    disabled={isCurrent}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectPlan(plan, isDowngrade);
                    }}
                    className={`mt-auto rounded-lg py-2.5 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-55 ${
                      isCurrent
                        ? "border border-border text-ink dark:border-border-dark dark:text-ink-dark"
                        : "bg-ink text-white dark:bg-gold-dark dark:text-surface-dark"
                    }`}
                  >
                    {isCurrent ? "Current plan" : isDowngrade ? "Downgrade" : "Upgrade"}
                  </button>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
