import { Loader2 } from "lucide-react";

export default function LoadingPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 py-24 text-center">
        <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 text-white shadow-2xl shadow-cyan-500/20">
          <Loader2 className="h-12 w-12 animate-spin" />
        </div>
        <div className="space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-5xl">
            Loading your library
          </h1>
          <p className="mx-auto max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base">
            One moment while we fetch your books, wishlist, and dashboard
            content. The bookshelf is almost ready.
          </p>
        </div>
      </div>
    </div>
  );
}
