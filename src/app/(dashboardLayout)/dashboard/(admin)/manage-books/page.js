import React from "react";
import ManageBooks from "@/components/dashboard/ManageBooks/ManageBooks";
import PrivateRoute from "@/components/PrivateRoute/PrivateRoute";

const ManageBooksPageAdminRoute = () => {
  return (
    <PrivateRoute allowedRoles={["admin"]}>
      <ManageBooks />
    </PrivateRoute>
  );
};

export default ManageBooksPageAdminRoute;
