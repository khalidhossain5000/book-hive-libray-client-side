import React from "react";
import ManageUsersClient from "@/components/dashboard/ManageUsers/ManageUsersClient";
import PrivateRoute from "@/components/PrivateRoute/PrivateRoute";

export const metadata = {
  title: "Manage Users | BookHive Dashboard",
  description: "Manage users, assign roles, and handle user permissions.",
};

const ManageUsers = () => {
  return (
    <PrivateRoute allowedRoles={["admin"]}>
      <ManageUsersClient />{" "}
    </PrivateRoute>
  );
};

export default ManageUsers;
