"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import GlobalLoading from "@/components/shared/GlobalLoading";
import useRole from "@/hooks/useRole";

const PrivateRoute = ({ children, allowedRoles = [] }) => {
  const {role,roleLoading:loading}=useRole()
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !role) {
      router.replace(`/auth/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [loading, role, router, pathname]);

  if (loading) return <GlobalLoading />;
  if (!role) return null;
  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    router.replace("/auth/login");
    return null;
  }
console.log("private route done over here",role)
  return <>{children}</>;
};

export default PrivateRoute;
