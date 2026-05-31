import AllCategories from "@/components/CategoriesPage/AllCategories";
import PrivateRoute from "@/components/PrivateRoute/PrivateRoute";
import React from "react";

const CategoriesPage = () => {
  return (
    <PrivateRoute>
      <AllCategories/>
    </PrivateRoute>
  );
};

export default CategoriesPage;
