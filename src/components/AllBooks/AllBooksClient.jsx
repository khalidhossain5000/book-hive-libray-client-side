"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import {
  Search,
  Star,
  BookOpen,
  User,
  Loader2,
  SlidersHorizontal,
  X,
  ChevronRight,
  Library,
  Hash,
} from "lucide-react";
import SidebarContent from "./SidebarContent";
import useAxios from "@/hooks/useAxios";
import PrimaryButton from "../shared/commonButton/PrimaryButton";
import Link from "next/link";

const fetchAllBooks = async (axiosInstance) => {
  const { data } = await axiosInstance.get("/allBooks");
  return data;
};

const StarRating = ({ rating }) => {
  const val = parseFloat(rating) || 0;
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={11}
          className={
            i <= Math.round(val)
              ? "fill-amber-400 text-amber-400"
              : "fill-transparent text-slate-300 dark:text-slate-600"
          }
        />
      ))}
      <span className="ml-1 text-xs font-medium text-slate-500 dark:text-slate-400">
        {val.toFixed(1)}
      </span>
    </div>
  );
};

const AllBooksClient = ({ initialCategory = "All" }) => {
  const axiosInstance = useAxios();
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const {
    data: books = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["allBooks"],
    queryFn: () => fetchAllBooks(axiosInstance),
    staleTime: 1000 * 60 * 2,
  });

  const categories = useMemo(() => {
    const unique = new Set();
    books.forEach((b) => b.category && unique.add(b.category));
    return ["All", ...Array.from(unique).sort()];
  }, [books]);

  const filteredBooks = useMemo(() => {
    const term = searchText.trim().toLowerCase();
    return books.filter((book) => {
      const matchesSearch =
        !term ||
        [book.title, book.author, book.category, book.shortDescription]
          .filter(Boolean)
          .some((f) => f.toLowerCase().includes(term));
      const matchesCategory =
        selectedCategory === "All" || book.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [books, searchText, selectedCategory]);

  return (
    <section className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile sidebar drawer */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-72 overflow-y-auto bg-white p-6 shadow-2xl transition-transform duration-300 dark:bg-slate-900 lg:hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-6 flex items-center justify-between">
          <span className="text-sm font-semibold text-slate-900 dark:text-white">
            Filter Books
          </span>
          <button
            onClick={() => setSidebarOpen(false)}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X size={16} />
          </button>
        </div>
        <SidebarContent
          searchText={searchText}
          setSearchText={setSearchText}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categories={categories}
          books={books}
          filteredBooks={filteredBooks}
        />
      </div>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700 dark:border-teal-800 dark:bg-teal-950/50 dark:text-teal-300">
              <Library size={11} />
              Library Collection
            </span>
          </div>
          <h1 className="text-3xl font-bold text-slate-950 dark:text-white sm:text-4xl">
            Discover Your Next Read
          </h1>
          <p className="mt-2 max-w-xl text-sm text-slate-500 dark:text-slate-400">
            Browse our curated catalog with smart search and category filters.
          </p>
        </div>

        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden w-64 shrink-0 lg:block">
            <div className="sticky top-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <SidebarContent
                searchText={searchText}
                setSearchText={setSearchText}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                categories={categories}
                books={books}
                filteredBooks={filteredBooks}
              />
            </div>
          </aside>

          {/* Main content */}
          <div className="min-w-0 flex-1">
            {/* Toolbar */}
            <div className="mb-5 flex items-center justify-between gap-3">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                <span className="font-semibold text-slate-900 dark:text-white">
                  {filteredBooks.length}
                </span>{" "}
                {filteredBooks.length === 1 ? "book" : "books"} found
              </p>
              <button
                onClick={() => setSidebarOpen(true)}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 lg:hidden"
              >
                <SlidersHorizontal size={14} />
                Filters
              </button>
            </div>

            {/* Loading */}
            {isLoading && (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white py-20 dark:border-slate-800 dark:bg-slate-900">
                <Loader2 className="mb-4 h-8 w-8 animate-spin text-teal-500" />
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  Loading catalog…
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  Fetching from the database
                </p>
              </div>
            )}

            {/* Error */}
            {isError && (
              <div className="rounded-2xl border border-rose-200 bg-rose-50 p-8 text-center dark:border-rose-900/50 dark:bg-rose-950/30">
                <p className="text-sm font-semibold text-rose-800 dark:text-rose-300">
                  Unable to load books
                </p>
                <p className="mt-1 text-xs text-rose-600 dark:text-rose-400">
                  {error?.message || "Please try again later."}
                </p>
              </div>
            )}

            {/* Grid */}
            {!isLoading && !isError && (
              <>
                {filteredBooks.length === 0 ? (
                  <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white py-20 text-center dark:border-slate-700 dark:bg-slate-900">
                    <BookOpen className="mb-4 h-10 w-10 text-slate-300 dark:text-slate-600" />
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">
                      No books matched
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      Try a broader search or different category.
                    </p>
                    <button
                      onClick={() => {
                        setSearchText("");
                        setSelectedCategory("All");
                      }}
                      className="mt-4 rounded-lg bg-teal-600 px-4 py-2 text-xs font-semibold text-white hover:bg-teal-700"
                    >
                      Clear filters
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    {filteredBooks.map((book) => (
                      <div
                        key={book._id || book.id}
                        className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-teal-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-teal-700"
                      >
                        {/* Image */}
                        <div className="relative h-44 overflow-hidden bg-slate-100 dark:bg-slate-800">
                          {book.image ? (
                            <Image
                              src={book.image}
                              alt={book.title || "Book cover"}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center">
                              <BookOpen className="h-10 w-10 text-slate-300 dark:text-slate-600" />
                            </div>
                          )}
                          {/* Category badge */}
                          <div className="absolute left-3 top-3">
                            <span className="rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-slate-700 shadow-sm backdrop-blur-sm dark:bg-slate-900/90 dark:text-slate-200">
                              {book.category || "General"}
                            </span>
                          </div>
                        </div>

                        {/* Body */}
                        <div className="flex flex-1 flex-col p-4">
                          <div className="mb-2 flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500">
                            <User size={11} />
                            <span className="truncate">
                              {book.author || "Unknown"}
                            </span>
                          </div>
                          <h2 className="mb-1.5 line-clamp-2 text-sm font-semibold leading-snug text-slate-900 dark:text-white">
                            {book.title || "Untitled"}
                          </h2>
                          <p className="mb-3 line-clamp-2 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                            {book.shortDescription ||
                              "No description available."}
                          </p>

                          {/* Rating */}
                          <StarRating rating={book.rating} />

                          {/* Footer */}
                          <div className="mt-4 flex items-center justify-between gap-2 border-t border-slate-100 pt-3 dark:border-slate-800">
                            <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                              {book.quantity ?? 0} copies
                            </span>

                            {/* details button */}
                            <Link href={`/all-books/${book._id || book.id}`} >
                              <PrimaryButton className="inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-teal-700 active:scale-95">
                                View Details
                                 <ChevronRight size={12} />
                              </PrimaryButton>

                             
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AllBooksClient;
