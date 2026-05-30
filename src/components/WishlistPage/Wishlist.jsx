"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { BookOpen, Heart, ArrowLeft, Loader2 } from "lucide-react";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useAuth from "@/hooks/useAuth";
import BorrowBookModal from "@/components/BooksDetailsPage/BorrowBookModal";

const Wishlist = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();
  const [selectedBook, setSelectedBook] = useState(null);
  const [isBorrowOpen, setIsBorrowOpen] = useState(false);

  const canFetch =
    !loading &&
    user?.email &&
    axiosSecure &&
    typeof axiosSecure.get === "function";

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["wishlist", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/wishlist", {
        params: { email: user.email },
      });
      return data;
    },
    enabled: canFetch,
    staleTime: 1000 * 60 * 2,
    retry: false,
    onError: (err) => {
      toast.error(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to load wishlist.",
        { position: "top-center" },
      );
    },
  });

  const items = data?.data || [];

  const handleOpenBorrow = (item) => {
    setSelectedBook({
      ...item,
      id: item.bookId,
      quantity: item.quantity ?? 1,
    });
    setIsBorrowOpen(true);
  };

  const renderEmptyState = () => (
    <div className="rounded-[32px] border border-slate-200 bg-white p-10 text-center shadow-sm dark:border-slate-700 dark:bg-slate-950">
      <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-slate-100 text-slate-600 dark:bg-slate-900 dark:text-slate-300">
        <BookOpen size={32} />
      </div>
      <h2 className="mt-6 text-2xl font-semibold text-slate-900 dark:text-white">
        Your wishlist is empty
      </h2>
      <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
        Save books from the catalog and they will appear here so you can borrow
        them later.
      </p>
      <Link
        href="/all-books"
        className="mt-6 inline-flex items-center justify-center rounded-2xl bg-teal-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-teal-700"
      >
        Browse books
      </Link>
    </div>
  );

  if (loading || isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#0d1117] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[32px] border border-slate-200 bg-white p-10 shadow-sm dark:border-slate-700 dark:bg-slate-950">
            <div className="animate-pulse space-y-4">
              <div className="h-8 w-48 rounded-full bg-slate-200 dark:bg-slate-800" />
              <div className="h-6 w-96 rounded-full bg-slate-200 dark:bg-slate-800" />
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className="h-64 rounded-[28px] bg-slate-200 dark:bg-slate-800"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user && !loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#0d1117] py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <div className="rounded-[32px] border border-slate-200 bg-white p-12 shadow-sm dark:border-slate-700 dark:bg-slate-950">
            <Heart size={32} className="mx-auto text-red-500" />
            <h2 className="mt-6 text-2xl font-semibold text-slate-900 dark:text-white">
              Sign in to view your wishlist
            </h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Wishlist items are saved per account. Please log in to see your
              saved books.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/auth/login"
                className="rounded-2xl bg-teal-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-teal-700"
              >
                Login
              </Link>
              <Link
                href="/auth/register"
                className="rounded-2xl border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-900"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0d1117]">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 rounded-[32px] border border-slate-200 bg-white p-10 shadow-sm dark:border-slate-700 dark:bg-slate-950">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-teal-600 dark:text-teal-400">
              Wishlist
            </p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-950 dark:text-white">
              Saved books
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
              These are the books you favorited for later. Borrow them directly
              from your wishlist anytime.
            </p>
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
              {items.length} item{items.length === 1 ? "" : "s"}
            </span>
            <Link
              href="/all-books"
              className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-teal-400 hover:text-teal-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-teal-500 dark:hover:text-teal-300"
            >
              Browse more books
            </Link>
          </div>
        </div>

        {items.length === 0 ? (
          renderEmptyState()
        ) : (
          <div className="grid gap-6">
            {items.map((item) => (
              <div
                key={item._id || item.bookId}
                className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-700 dark:bg-slate-950"
              >
                <div className="grid gap-6 lg:grid-cols-[220px_1fr] p-6">
                  <div className="relative overflow-hidden rounded-3xl bg-slate-100 dark:bg-slate-900">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.title || "Wishlist book cover"}
                        width={380}
                        height={520}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full min-h-[320px] items-center justify-center text-slate-500 dark:text-slate-400">
                        <BookOpen size={36} />
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col justify-between gap-6">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-3 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-teal-700 dark:border-teal-800/60 dark:bg-teal-950/40 dark:text-teal-300">
                          <Heart size={14} className="text-red-500" />
                          Wishlisted
                        </span>
                        <span className="rounded-full bg-slate-100 px-3 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 dark:bg-slate-900 dark:text-slate-400">
                          {item.category || "General"}
                        </span>
                      </div>

                      <h2 className="mt-5 text-2xl font-semibold text-slate-950 dark:text-white">
                        {item.title}
                      </h2>
                      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                        by{" "}
                        <span className="font-semibold text-slate-900 dark:text-white">
                          {item.author || "Unknown author"}
                        </span>
                      </p>

                      {item.description || item.shortDescription ? (
                        <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300">
                          {item.description || item.shortDescription}
                        </p>
                      ) : (
                        <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300">
                          No additional description is available for this book.
                        </p>
                      )}
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900">
                        <p className="text-[11px] uppercase tracking-[0.24em] text-slate-400 dark:text-slate-500">
                          Added on
                        </p>
                        <p className="mt-2 text-sm font-semibold text-slate-900 dark:text-white">
                          {item.addedAt
                            ? new Date(item.addedAt).toLocaleDateString()
                            : "Unknown"}
                        </p>
                      </div>
                      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900">
                        <p className="text-[11px] uppercase tracking-[0.24em] text-slate-400 dark:text-slate-500">
                          Book id
                        </p>
                        <p className="mt-2 truncate text-sm font-semibold text-slate-900 dark:text-white">
                          {item.bookId}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        onClick={() => handleOpenBorrow(item)}
                        className="inline-flex items-center justify-center rounded-2xl bg-teal-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        Borrow
                      </button>
                      <Link
                        href={`/all-books/${item.bookId}`}
                        className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-teal-400 hover:text-teal-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-teal-500 dark:hover:text-teal-300"
                      >
                        View book
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <BorrowBookModal
        open={isBorrowOpen}
        book={selectedBook}
        user={user}
        onClose={() => setIsBorrowOpen(false)}
        onSuccess={() => {
          setIsBorrowOpen(false);
          refetch();
        }}
      />
    </div>
  );
};

export default Wishlist;
