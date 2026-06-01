"use client";

import BooksDetails from "@/components/BooksDetailsPage/BooksDetails";
import PrivateRoute from "@/components/PrivateRoute/PrivateRoute";
import React from "react";

const BooksDetailsPage = () => {
  return (
    <PrivateRoute allowedRoles={["admin", "user"]}>
      <BooksDetails />
    </PrivateRoute>
  );
};

export default BooksDetailsPage;
