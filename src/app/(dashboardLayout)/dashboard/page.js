"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { BarChart3, BookUser, RefreshCw } from "lucide-react";
import AdminStatsCard from "@/components/dashboard/AdminStats/AdminStatsCard";
import AdminStatsChart from "@/components/dashboard/AdminStats/AdminStatsChart";
import UserStatsCard from "@/components/dashboard/UserDashboardStats/UserStatsCard";
import UserStatsChart from "@/components/dashboard/UserDashboardStats/UserStatsChart";
import UserRecentBorrows from "@/components/dashboard/UserDashboardStats/UserRecentBorrows";
import GlobalLoading from "@/components/shared/GlobalLoading";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useAuth from "@/hooks/useAuth";
import useRole from "@/hooks/useRole";

const DashboardHome = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading: authLoading } = useAuth();
  const { role, roleLoading } = useRole();
  const isAdmin = role === "admin";

  const {
    data: adminData,
    isLoading: adminLoading,
    isError: adminError,
    error: adminErrorInfo,
    refetch: refetchAdminStats,
    isFetching: adminFetching,
  } = useQuery({
    queryKey: ["admin-dashboard-stats"],
    enabled: !authLoading && !roleLoading && isAdmin,
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/dashboard-stats");
      return res.data;
    },
  });

  const {
    data: userData,
    isLoading: userStatsLoading,
    isError: userStatsError,
    error: userStatsErrorInfo,
    refetch: refetchUserStats,
    isFetching: userStatsFetching,
  } = useQuery({
    queryKey: ["user-dashboard-stats", user?.email],
    enabled: !authLoading && !roleLoading && !isAdmin && !!user?.email,
    queryFn: async () => {
      const email = encodeURIComponent(user.email);
      const res = await axiosSecure.get(`/user/dashboard-stats?email=${email}`);
      return res.data;
    },
  });

  if (authLoading || roleLoading || adminLoading || userStatsLoading) {
    return <GlobalLoading message="Loading dashboard stats..." />;
  }

  const activeError = isAdmin ? adminError : userStatsError;
  const activeErrorInfo = isAdmin ? adminErrorInfo : userStatsErrorInfo;

  if (activeError) {
    return (
      <div className="rounded-xl border border-rose-200 bg-rose-50 p-6 text-rose-700 shadow-sm dark:border-rose-900/60 dark:bg-rose-950/30 dark:text-rose-300">
        <h2 className="text-lg font-bold font-montserrat">Dashboard stats failed to load</h2>
        <p className="mt-2 text-sm">{activeErrorInfo?.message || "Please try again."}</p>
      </div>
    );
  }

  if (isAdmin) {
    return (
      <div className="space-y-6">
        <DashboardHeader
          title="Admin Overview"
          description="Live library totals, catalog spread, and availability status."
          icon={BarChart3}
          onRefresh={refetchAdminStats}
          isFetching={adminFetching}
        />

        <AdminStatsCard stats={adminData?.stats} />
        <AdminStatsChart charts={adminData?.charts} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <DashboardHeader
        title="My Reading Overview"
        description="Your borrowed books, returns, wishlist activity, and recent history."
        icon={BookUser}
        onRefresh={refetchUserStats}
        isFetching={userStatsFetching}
      />

      <UserStatsCard stats={userData?.stats} />
      <UserStatsChart charts={userData?.charts} />
      <UserRecentBorrows recentBorrows={userData?.recentBorrows} />
    </div>
  );
};

const DashboardHeader = ({ title, description, icon: Icon, onRefresh, isFetching }) => (
  <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:flex-row sm:items-center sm:justify-between">
    <div className="flex items-start gap-4">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <Icon className="h-6 w-6" />
      </div>
      <div>
        <h2 className="text-2xl font-bold text-foreground font-montserrat">
          {title}
        </h2>
        <p className="mt-1 text-sm text-foreground/60">
          {description}
        </p>
      </div>
    </div>

    <button
      type="button"
      onClick={() => onRefresh()}
      disabled={isFetching}
      className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-white transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70 dark:text-slate-950"
    >
      <RefreshCw className={`h-4 w-4 ${isFetching ? "animate-spin" : ""}`} />
      Refresh
    </button>
  </div>
);

export default DashboardHome;
