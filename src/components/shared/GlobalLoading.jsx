"use client";

import React from "react";

export default function GlobalLoading({
  fullScreen = true,
  message = "Loading...",
  size = 48,
  className = "",
}) {
  const spinner = (
    <svg
      role="status"
      className="animate-spin text-white"
      style={{ width: size, height: size }}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
        fill="none"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  );

  const content = (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      <div className="p-2 rounded-full bg-black/60">{spinner}</div>
      {message && <div className="text-sm text-slate-100">{message}</div>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
        {content}
      </div>
    );
  }

  return content;
}
