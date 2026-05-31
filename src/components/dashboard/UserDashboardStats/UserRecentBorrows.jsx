"use client";

import React from "react";
import { BookOpen, CalendarDays, Clock } from "lucide-react";

const formatDate = (value) => {
  if (!value) return "-";

  try {
    return new Date(value).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return value;
  }
};

const UserRecentBorrows = ({ recentBorrows = [] }) => {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-5 flex flex-col gap-1">
        <h3 className="text-lg font-bold text-foreground font-montserrat">
          Recent Borrows
        </h3>
        <p className="text-sm text-foreground/60">
          Latest books added to your borrowed history.
        </p>
      </div>

      {recentBorrows.length > 0 ? (
        <div className="grid gap-3">
          {recentBorrows.map((item) => (
            <div
              key={item._id || item.bookId || item.bookTitle}
              className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/45 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex min-w-0 items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <BookOpen className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <h4 className="truncate font-semibold text-foreground">
                    {item.bookTitle || "Untitled book"}
                  </h4>
                  <p className="mt-1 truncate text-sm text-foreground/60">
                    {item.bookAuthor || "Unknown author"}
                  </p>
                </div>
              </div>

              <div className="grid gap-2 text-sm text-foreground/65 sm:min-w-[260px] sm:grid-cols-2">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>{formatDate(item.borrowedAt)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-primary" />
                  <span>{formatDate(item.returnDate)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex min-h-[150px] items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 px-4 text-center text-sm font-medium text-foreground/50 dark:border-slate-700 dark:bg-slate-800/35">
          No recent borrowed books yet.
        </div>
      )}
    </section>
  );
};

export default UserRecentBorrows;
