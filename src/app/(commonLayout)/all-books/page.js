import React from "react";
import AllBooksClient from "@/components/AllBooks/AllBooksClient";

const AllBooksPage = async ({ searchParams }) => {
  const params = await searchParams;
  const category = Array.isArray(params?.category)
    ? params.category[0]
    : params?.category;

  const initialCategory = category || "All";

  return (
    <AllBooksClient
      key={initialCategory}
      initialCategory={initialCategory}
    />
  );
};

export default AllBooksPage;
