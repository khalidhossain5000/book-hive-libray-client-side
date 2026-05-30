"use client";

import Link from "next/link";
import { AlertCircle } from "lucide-react";

export default function ErrorPage({ error, reset }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 py-24 text-center">
        <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-red-500 text-white shadow-2xl shadow-red-500/20">
          <AlertCircle className="h-12 w-12" />
        </div>
        <div className="space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-5xl">
            Something went wrong
          </h1>
          <p className="mx-auto max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base">
            We encountered an unexpected error while loading the page. Please
            try refreshing or return home.
          </p>
          <pre className="mx-auto max-w-xl overflow-x-auto rounded-3xl border border-slate-200 bg-slate-100 p-4 text-left text-xs text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
            {error?.message}
          </pre>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center justify-center rounded-2xl bg-teal-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-teal-700"
            >
              Retry
            </button>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-teal-400 hover:text-teal-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-teal-500 dark:hover:text-teal-300"
            >
              Go home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
