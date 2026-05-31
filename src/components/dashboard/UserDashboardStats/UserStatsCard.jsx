"use client";

import React from "react";
import CountUp from "react-countup";
import { BookCheck, BookMarked, Heart, RotateCcw } from "lucide-react";

const statItems = [
  {
    key: "currentBorrowed",
    title: "Current Borrowed",
    icon: BookMarked,
    className:
      "from-teal-500/18 via-white to-white dark:from-teal-400/15 dark:via-slate-900 dark:to-slate-900",
    iconClass: "bg-teal-100 text-teal-700 dark:bg-teal-400/15 dark:text-teal-300",
  },
  {
    key: "totalBorrowed",
    title: "Total Borrowed",
    icon: BookCheck,
    className:
      "from-sky-500/18 via-white to-white dark:from-sky-400/15 dark:via-slate-900 dark:to-slate-900",
    iconClass: "bg-sky-100 text-sky-700 dark:bg-sky-400/15 dark:text-sky-300",
  },
  // {
  //   key: "returnedBooks",
  //   title: "Returned Books",
  //   icon: RotateCcw,
  //   className:
  //     "from-emerald-500/18 via-white to-white dark:from-emerald-400/15 dark:via-slate-900 dark:to-slate-900",
  //   iconClass: "bg-emerald-100 text-emerald-700 dark:bg-emerald-400/15 dark:text-emerald-300",
  // },
  {
    key: "wishlistItems",
    title: "Wishlist Items",
    icon: Heart,
    className:
      "from-rose-500/18 via-white to-white dark:from-rose-400/15 dark:via-slate-900 dark:to-slate-900",
    iconClass: "bg-rose-100 text-rose-700 dark:bg-rose-400/15 dark:text-rose-300",
  },
];

const UserStatsCard = ({ stats = {} }) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {statItems.map((item) => {
        const Icon = item.icon;
        const value = Number(stats?.[item.key] || 0);

        return (
          <div
            key={item.key}
            className={`overflow-hidden rounded-xl border border-slate-200 bg-gradient-to-br p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 ${item.className}`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground/60">
                  {item.title}
                </p>
                <h3 className="mt-3 text-3xl font-bold leading-none text-foreground font-montserrat">
                  <CountUp end={value} duration={1.1} separator="," />
                </h3>
              </div>

              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${item.iconClass}`}
              >
                <Icon className="h-6 w-6" />
              </div>
            </div>

            <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-slate-200/80 dark:bg-slate-800">
              <div
                className="h-full rounded-full bg-primary"
                style={{ width: `${Math.min(100, Math.max(12, value * 18))}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UserStatsCard;
