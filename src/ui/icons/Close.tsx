import React from "react";

export default function Close({ className }: { className?: string }) {
  return (
    <div className={className}>
      <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
        <path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"></path>
      </svg>
    </div>
  );
}
