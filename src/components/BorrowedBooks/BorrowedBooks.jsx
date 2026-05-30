"use client";

import Image from "next/image";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useAuth from "@/hooks/useAuth";
import GlobalLoading from "@/components/shared/GlobalLoading";
import { BookOpen, ArrowRight, X, AlertTriangle } from "lucide-react";
import Link from "next/link";

const BorrowedBooks = () => {
  const router = useRouter();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [selectedBorrow, setSelectedBorrow] = useState(null);
  const [isWarningOpen, setIsWarningOpen] = useState(false);

  const {
    data: borrowedBooks = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["borrowedBooks", user?.email],
    queryFn: async () => {
      const email = encodeURIComponent(user.email);
      const res = await axiosSecure.get(`/borrowed-books/${email}`);
      return res.data;
    },
    enabled: !!user?.email,
    staleTime: 1000 * 60 * 3,
  });

  const openReturnWarning = (borrow) => {
    setSelectedBorrow(borrow);
    setIsWarningOpen(true);
  };

  const closeReturnWarning = () => {
    setSelectedBorrow(null);
    setIsWarningOpen(false);
  };

  const formattedDate = (value) => {
    if (!value) return "-";
    try {
      return new Date(value).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return value;
    }
  };

  if (!user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4 py-10 text-center">
        <div className="max-w-lg rounded-3xl border border-slate-200 bg-white p-8 text-slate-700 shadow-sm dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100">
          <p className="text-lg font-semibold">
            Please log in to view your borrowed books.
          </p>
          <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
            Borrowed books are only visible to authenticated users.
          </p>
        </div>
      </div>
    );
  }

  if (isLoading)
    return <GlobalLoading message="Loading your borrowed books..." />;
  if (isError)
    return (
      <div className="p-6 rounded-3xl bg-red-50 text-red-700 dark:bg-red-950/20 dark:text-red-300 border border-red-200 dark:border-red-900/50">
        Error loading borrowed books: {error?.message || "Unexpected error."}
      </div>
    );

  return (
    <div className="w-full p-12 lg:p-20">
      <div className="mb-8">
        <h2 className="text-2xl font-bold font-montserrat text-foreground">
          My Borrowed Books
        </h2>
        <p className="text-sm text-foreground/60 font-inter mt-1">
          Review your current borrowed book records and see return guidance.
        </p>
      </div>

      <div className="hidden md:block overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
        <table className="w-full text-left text-sm font-inter">
          <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 font-semibold border-b border-slate-200 dark:border-slate-800 uppercase tracking-wider text-xs">
            <tr>
              <th className="px-6 py-4">Book</th>
              <th className="px-6 py-4">Borrowed On</th>
              <th className="px-6 py-4">Return By</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {borrowedBooks.map((item) => {
              const title = item.bookTitle || item.title || "Untitled";
              const author = item.bookAuthor || item.author || "Unknown author";
              const status = item.status || "Borrowed";
              return (
                <tr
                  key={item._id || item.bookId || title}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-12 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800">
                        {item.bookImage ? (
                          <Image
                            src={item.bookImage}
                            alt={title}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-slate-400 dark:text-slate-500">
                            <BookOpen className="w-5 h-5" />
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{title}</p>
                        <p className="text-xs text-foreground/70">{author}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-foreground/70">
                    {formattedDate(item.borrowedAt)}
                  </td>
                  <td className="px-6 py-4 text-foreground/70">
                    {formattedDate(item.returnDate)}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                        status.toLowerCase().includes("overdue")
                          ? "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300"
                          : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200"
                      }`}
                    >
                      {status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => openReturnWarning(item)}
                      className="inline-flex items-center justify-center rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-xs font-semibold text-red-700 hover:bg-red-100 dark:border-red-900/50 dark:bg-red-900/20 dark:text-red-300 dark:hover:bg-red-900/40 transition"
                    >
                      Return
                    </button>
                  </td>
                </tr>
              );
            })}
            {borrowedBooks.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  className="px-6 py-8 text-center text-foreground/50 font-medium"
                >
                  You have no borrowed books at the moment.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 gap-4 md:hidden">
        {borrowedBooks.map((item) => {
          const title = item.bookTitle || item.title || "Untitled";
          const author = item.bookAuthor || item.author || "Unknown author";
          const status = item.status || "Borrowed";
          return (
            <div
              key={item._id || item.bookId || title}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm overflow-hidden"
            >
              <div className="p-4 sm:p-5">
                <div className="flex items-start gap-4">
                  <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800">
                    {item.bookImage ? (
                      <Image
                        src={item.bookImage}
                        alt={title}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-slate-400 dark:text-slate-500">
                        <BookOpen className="w-5 h-5" />
                      </div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base font-semibold text-foreground truncate">
                      {title}
                    </h3>
                    <p className="mt-1 text-sm text-foreground/70 truncate">
                      {author}
                    </p>
                  </div>
                </div>
                <div className="mt-4 grid gap-3 text-sm text-foreground/70">
                  <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 dark:bg-slate-800/60">
                    <span>Borrowed</span>
                    <span>{formattedDate(item.borrowedAt)}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 dark:bg-slate-800/60">
                    <span>Return by</span>
                    <span>{formattedDate(item.returnDate)}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 dark:bg-slate-800/60">
                    <span>Status</span>
                    <span>{status}</span>
                  </div>
                </div>
              </div>
              <div className="border-t border-slate-100 dark:border-slate-800 p-4">
                <button
                  onClick={() => openReturnWarning(item)}
                  className="w-full rounded-2xl bg-red-600 px-4 py-3 text-sm font-semibold text-white hover:bg-red-700 transition"
                >
                  Return
                </button>
              </div>
            </div>
          );
        })}
        {borrowedBooks.length === 0 && (
          <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-foreground/60 dark:border-slate-800 dark:bg-slate-900">
            You have no borrowed books.
          </div>
        )}
      </div>

      {isWarningOpen && selectedBorrow && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/75 px-4 py-6 sm:px-6 sm:py-8">
          <div className="w-full max-w-xl rounded-[32px] border border-red-200 bg-white shadow-2xl shadow-red-900/10 dark:border-red-900/40 dark:bg-slate-950">
            <div className="flex items-start justify-between gap-4 border-b border-red-200 px-6 py-5 dark:border-red-900/40">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-red-600 dark:text-red-400">
                  Return required
                </p>
                <h3 className="mt-3 text-xl font-semibold text-slate-950 dark:text-white">
                  You need to return the book from the dashboard
                </h3>
              </div>
              <Link href={`/dashboard/borrowed-books`}>
              <button
             
                onClick={closeReturnWarning}
                className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 cursor-pointer"
              >
                <X size={18} />
              </button>
              </Link>
            </div>
            <div className="space-y-6 px-6 py-6 text-slate-700 dark:text-slate-200">
              <div className="flex items-center gap-3 rounded-3xl border border-red-100 bg-red-50 p-4 dark:border-red-900/40 dark:bg-red-950/20">
                <AlertTriangle
                  size={22}
                  className="text-red-600 dark:text-red-400"
                />
                <p className="text-sm leading-6">
                  To return this book, please go to the dashboard borrowed books
                  section. Returning is handled there for secure processing.
                </p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/60">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-400 dark:text-slate-500">
                  Book
                </p>
                <p className="mt-2 font-semibold text-foreground dark:text-white">
                  {selectedBorrow.bookTitle ||
                    selectedBorrow.title ||
                    "Untitled"}
                </p>
                <p className="text-sm text-foreground/70 dark:text-slate-400">
                  {selectedBorrow.bookAuthor ||
                    selectedBorrow.author ||
                    "Unknown author"}
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-3xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
                  <p className="text-[11px] uppercase tracking-[0.24em] text-slate-400 dark:text-slate-500">
                    Borrowed on
                  </p>
                  <p className="mt-2 text-sm font-medium text-foreground dark:text-white">
                    {formattedDate(selectedBorrow.borrowedAt)}
                  </p>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
                  <p className="text-[11px] uppercase tracking-[0.24em] text-slate-400 dark:text-slate-500">
                    Return by
                  </p>
                  <p className="mt-2 text-sm font-medium text-foreground dark:text-white">
                    {formattedDate(selectedBorrow.returnDate)}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3 border-t border-red-200 px-6 py-5 dark:border-red-900/40 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={closeReturnWarning}
                className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 transition"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  closeReturnWarning();
                  router.push("/dashboard/borrowed-books");
                }}
                className="inline-flex items-center justify-center rounded-2xl bg-red-600 px-5 py-3 text-sm font-semibold text-white hover:bg-red-700 transition"
              >
                <ArrowRight size={16} />
                Go to dashboard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BorrowedBooks;
