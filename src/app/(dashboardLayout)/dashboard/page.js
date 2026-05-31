"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { BarChart3, RefreshCw } from "lucide-react";
import AdminStatsCard from "@/components/dashboard/AdminStats/AdminStatsCard";
import AdminStatsChart from "@/components/dashboard/AdminStats/AdminStatsChart";
import GlobalLoading from "@/components/shared/GlobalLoading";
import useAxiosSecure from "@/hooks/useAxiosSecure";

const DashboardHome = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["admin-dashboard-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/dashboard-stats");
      return res.data;
    },
  });

  if (isLoading) {
    return <GlobalLoading message="Loading dashboard stats..." />;
  }

  if (isError) {
    return (
      <div className="rounded-xl border border-rose-200 bg-rose-50 p-6 text-rose-700 shadow-sm dark:border-rose-900/60 dark:bg-rose-950/30 dark:text-rose-300">
        <h2 className="text-lg font-bold font-montserrat">Dashboard stats failed to load</h2>
        <p className="mt-2 text-sm">{error?.message || "Please try again."}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <BarChart3 className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground font-montserrat">
              Admin Overview
            </h2>
            <p className="mt-1 text-sm text-foreground/60">
              Live library totals, catalog spread, and availability status.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => refetch()}
          disabled={isFetching}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-white transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70 dark:text-slate-950"
        >
          <RefreshCw className={`h-4 w-4 ${isFetching ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      <AdminStatsCard stats={data?.stats} />
      <AdminStatsChart charts={data?.charts} />
    </div>
  );
};

export default DashboardHome;
