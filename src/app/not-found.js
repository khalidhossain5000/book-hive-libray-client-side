import Link from "next/link";
import { Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 py-24 text-center">
        <div className="mb-8 rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 p-6 text-white shadow-2xl shadow-cyan-500/20">
          <Search className="h-12 w-12" />
        </div>
        <div className="space-y-4">
          <h1 className="text-5xl font-extrabold tracking-tight text-slate-950 dark:text-white">
            Page not found
          </h1>
          <p className="mx-auto max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base">
            The page you are looking for doesn’t exist or has been moved.
            Explore the library again from the homepage.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-2xl bg-teal-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-teal-700"
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
