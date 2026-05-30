"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import GlobalLoading from "@/components/shared/GlobalLoading";

const PrivateRoute = ({ children, allowedRoles = [] }) => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) {
      router.replace(`/auth/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [loading, user, router, pathname]);

  if (loading) return <GlobalLoading />;
  if (!user) return null;
  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    router.replace("/auth/login");
    return null;
  }

  return <>{children}</>;
};

export default PrivateRoute;
