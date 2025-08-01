import React from "react";

export default function Forward({ className }: { className?: string }) {
  return (
    <div className={className}>
      <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
        <path d="M14.586 12L7.543 4.96l1.414-1.42L17.414 12l-8.457 8.46-1.414-1.42L14.586 12z"></path>
      </svg>
    </div>
  );
}
