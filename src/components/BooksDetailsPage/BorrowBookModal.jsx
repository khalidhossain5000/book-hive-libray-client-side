"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { X, CalendarDays, BookOpen, User, Loader2 } from "lucide-react";
import useAxiosSecure from "@/hooks/useAxiosSecure";

const BorrowBookModal = ({ book, user, open, onClose, onSuccess }) => {
  const axiosSecure = useAxiosSecure();
  const [returnDate, setReturnDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const minReturnDate = useMemo(() => {
    const date = new Date();
    return date.toISOString().split("T")[0];
  }, []);

  const handleConfirm = async (event) => {
    event.preventDefault();
    if (!returnDate) {
      toast.error("Please select a return date.", { position: "top-center" });
      return;
    }

    if (!user?.email) {
      toast.error("You must be logged in to borrow a book.", {
        position: "top-center",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const borrowPayload = {
        bookId: book._id || book.id,
        bookTitle: book.title,
        bookAuthor: book.author,
        userEmail: user.email,
        userName: user.displayName || user.email,
        returnDate,
        borrowedAt: new Date().toISOString(),
      };

      await axiosSecure.post(
        `/borrow-books/${book._id || book.id}`,
        borrowPayload,
      );
      await axiosSecure.patch(
        `/allBooks/decrease-quantity/${book._id || book.id}`,
      );

      toast.success("Book borrowed successfully.", { position: "top-center" });
      onSuccess?.();
      onClose?.();
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to borrow the book.",
        { position: "top-center" },
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 px-4 py-6 sm:px-6 sm:py-8">
      <div className="mx-auto w-full max-w-2xl rounded-[32px] border border-slate-200 bg-white py-4 shadow-2xl shadow-slate-900/20 dark:border-slate-800 dark:bg-slate-950 dark:shadow-black/40">
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-5 py-4 dark:border-slate-800">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-teal-600 dark:text-teal-400">
              Borrow book
            </p>
            <h2 className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">
              Confirm borrowing details
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <X size={18} />
          </button>
        </div>

        <form
          onSubmit={handleConfirm}
          className="space-y-6 overflow-hidden px-5 py-5 sm:px-6 sm:py-6"
        >
          <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-5 rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900/70">
              <div className="flex items-center gap-4">
                <div className="relative h-20 w-16 overflow-hidden rounded-3xl bg-slate-200 dark:bg-slate-800">
                  {book.image ? (
                    <Image
                      src={book.image}
                      alt={book.title || "Book cover"}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-slate-500 dark:text-slate-400">
                      <BookOpen size={24} />
                    </div>
                  )}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    {book.title || "Untitled book"}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {book.author || "Unknown author"}
                  </p>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-3xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
                  <p className="text-[11px] uppercase tracking-[0.24em] text-slate-400 dark:text-slate-500">
                    Book ID
                  </p>
                  <p className="mt-2 truncate text-sm font-medium text-slate-900 dark:text-white">
                    {book._id || book.id}
                  </p>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
                  <p className="text-[11px] uppercase tracking-[0.24em] text-slate-400 dark:text-slate-500">
                    Available copies
                  </p>
                  <p className="mt-2 text-sm font-medium text-slate-900 dark:text-white">
                    {book.quantity ?? 0}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-5 rounded-3xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950">
              <div className="flex items-center gap-3 rounded-3xl border border-slate-200 bg-slate-100 px-4 py-3 dark:border-slate-700 dark:bg-slate-900">
                <User size={18} className="text-teal-600 dark:text-teal-400" />
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-400 dark:text-slate-500">
                    Borrower
                  </p>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">
                    {user.displayName || "Guest user"}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {user.email}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-900 dark:text-white">
                  Return Date
                </label>
                <div className="relative rounded-2xl border border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-900">
                  <input
                    type="date"
                    min={minReturnDate}
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className="w-full cursor-pointer bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400 dark:text-slate-100"
                  />
                  <CalendarDays
                    size={18}
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500"
                  />
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
                <p className="font-semibold text-slate-900 dark:text-white">
                  What happens next?
                </p>
                <p className="mt-2 leading-6">
                  Confirming this borrow will record your request and update the
                  available quantity of this book.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={onClose}
              className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center rounded-2xl bg-teal-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="mr-2 animate-spin" /> Confirm
                  Borrow
                </>
              ) : (
                "Confirm Borrow"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BorrowBookModal;
