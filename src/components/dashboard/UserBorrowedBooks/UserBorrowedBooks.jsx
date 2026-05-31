"use client";

import Image from "next/image";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useAuth from "@/hooks/useAuth";
import GlobalLoading from "@/components/shared/GlobalLoading";
import { toast } from "sonner";
import Swal from "sweetalert2";
import { BookOpen } from "lucide-react";

const UserBorrowedBooks = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

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
console.log(borrowedBooks,'data here')
  const returnBookMutation = useMutation({
    mutationFn: async ({ borrowedRecordId, bookId }) => {
      await axiosSecure.patch(`/all-books/quantity/${bookId}`);
      await axiosSecure.delete(`/borrowed-books/${borrowedRecordId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["borrowedBooks", user?.email]);
      toast.success("Book returned successfully.", { position: "top-right" });
    },
    onError: (err) => {
      toast.error(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to return the book.",
        { position: "top-right" },
      );
    },
  });

  const handleReturnConfirm = async (borrow) => {
    const result = await Swal.fire({
      title: "Return this book?",
      text: "Returning will increase stock and remove it from your borrowed list.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, return it",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#64748b",
    });

    if (!result.isConfirmed) return;

    returnBookMutation.mutate({
      borrowedRecordId: borrow._id,
      bookId: borrow.bookId,
    });
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
              const image = item.bookImage || item.imageUrl || item.image;
              return (
                <tr
                  key={item._id || item.bookId || title}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-12 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800">
                        {image ? (
                          <Image
                            src={image}
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
                      onClick={() => handleReturnConfirm(item)}
                      disabled={returnBookMutation.isPending}
                      className="inline-flex items-center justify-center rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-xs font-semibold text-red-700 hover:bg-red-100 dark:border-red-900/50 dark:bg-red-900/20 dark:text-red-300 dark:hover:bg-red-900/40 transition disabled:opacity-50 disabled:cursor-not-allowed"
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
          const image = item.bookImage || item.imageUrl || item.image;
          return (
            <div
              key={item._id || item.bookId || title}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm overflow-hidden"
            >
              <div className="p-4 sm:p-5">
                <div className="flex items-start gap-4">
                  <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800">
                    {image ? (
                      <Image
                        src={image}
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
                  onClick={() => handleReturnConfirm(item)}
                  disabled={returnBookMutation.isPending}
                  className="w-full rounded-2xl bg-red-600 px-4 py-3 text-sm font-semibold text-white hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {returnBookMutation.isPending ? "Returning..." : "Return"}
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
    </div>
  );
};

export default UserBorrowedBooks;
