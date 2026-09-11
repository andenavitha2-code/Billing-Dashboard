import React from "react";

export default function Skeleton({ w = "100%", h = 14, className = "" }) {
  return (
    <div
      className={`animate-pulse rounded-md bg-surfacealt dark:bg-border ${className}`}
      style={{ width: w, height: h }}
    />
  );
}
