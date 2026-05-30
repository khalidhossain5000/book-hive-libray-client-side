"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import {
  Star,
  BookOpen,
  ChevronRight,
  Bookmark,
  Share2,
  ArrowLeft,
  CheckCircle2,
  Loader2,
  Users,
  Hash,
  BookMarked,
} from "lucide-react";
import useAxiosSecure from "@/hooks/useAxiosSecure";

// ─── Star Rating ───────────────────────────────────────────────────────────────
const StarRating = ({ rating }) => {
  const val = parseFloat(rating) || 0;
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={14}
          className={
            i <= Math.round(val)
              ? "fill-amber-400 text-amber-400"
              : "fill-transparent text-slate-300 dark:text-slate-600"
          }
        />
      ))}
      <span className="ml-1.5 text-sm font-semibold text-slate-700 dark:text-slate-300">
        {val.toFixed(1)}
      </span>
    </div>
  );
};

// ─── Stat Pill ─────────────────────────────────────────────────────────────────
const StatCard = ({ label, value }) => (
  <div className="flex flex-col gap-1 rounded-2xl border border-slate-200 bg-white px-5 py-4 dark:border-slate-700/60 dark:bg-slate-800/60">
    <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
      {label}
    </span>
    <span className="text-base font-bold text-slate-900 dark:text-white">
      {value}
    </span>
  </div>
);

// ─── Skeleton ──────────────────────────────────────────────────────────────────
const Skeleton = () => (
  <div className="mx-auto max-w-screen-xl animate-pulse px-4 py-10 sm:px-6 lg:px-10">
    <div className="mb-8 h-4 w-48 rounded-full bg-slate-200 dark:bg-slate-800" />
    <div className="grid gap-12 lg:grid-cols-[380px_1fr]">
      <div className="aspect-[3/4] w-full rounded-3xl bg-slate-200 dark:bg-slate-800" />
      <div className="space-y-4 pt-4">
        <div className="h-3 w-24 rounded-full bg-slate-200 dark:bg-slate-800" />
        <div className="h-10 w-3/4 rounded-xl bg-slate-200 dark:bg-slate-800" />
        <div className="h-4 w-32 rounded-full bg-slate-200 dark:bg-slate-800" />
        <div className="mt-6 h-px bg-slate-200 dark:bg-slate-800" />
        <div className="space-y-2 pt-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-3 w-full rounded-full bg-slate-200 dark:bg-slate-800" />
          ))}
        </div>
        <div className="mt-6 grid grid-cols-4 gap-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-20 rounded-2xl bg-slate-200 dark:bg-slate-800" />
          ))}
        </div>
      </div>
    </div>
  </div>
);

// ─── Main Component ────────────────────────────────────────────────────────────
const BooksDetails = () => {
  const { id } = useParams();
  const router = useRouter();
  const axiosSecure = useAxiosSecure();

  const {
    data: book,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["book", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/allBooks/${id}`);
      return data;
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) return <Skeleton />;

  if (isError)
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4">
        <BookOpen className="h-12 w-12 text-slate-300 dark:text-slate-600" />
        <p className="text-lg font-semibold text-slate-900 dark:text-white">
          Failed to load book
        </p>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {error?.message || "Something went wrong."}
        </p>
        <button
          onClick={() => router.back()}
          className="mt-2 inline-flex items-center gap-2 rounded-xl bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-teal-700"
        >
          <ArrowLeft size={15} /> Go Back
        </button>
      </div>
    );

  if (!book) return null;

  const isAvailable = (book.quantity ?? 0) > 0;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0d1117]">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-10">

        {/* ── Breadcrumb ── */}
        <nav className="mb-8 flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500">
          <Link href="/" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
            Catalog
          </Link>
          <ChevronRight size={12} />
          <Link
            href="/allBooks"
            className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
          >
            {book.category || "Books"}
          </Link>
          <ChevronRight size={12} />
          <span className="text-teal-600 dark:text-teal-400 font-medium line-clamp-1 max-w-[180px]">
            {book.title}
          </span>
        </nav>

        {/* ── Hero Grid ── */}
        <div className="grid gap-10 lg:grid-cols-[360px_1fr] xl:gap-16">

          {/* Left — Book Cover */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative w-full max-w-[340px]">
              {/* Glow behind image */}
              <div className="absolute -inset-4 rounded-3xl bg-teal-500/10 blur-2xl dark:bg-teal-500/20" />
              <div className="relative overflow-hidden rounded-3xl border border-slate-200/60 bg-white shadow-2xl shadow-slate-300/40 dark:border-slate-700/40 dark:bg-slate-800 dark:shadow-black/60">
                {book.image ? (
                  <div className="relative aspect-[3/4] w-full">
                    <Image
                      src={book.image}
                      alt={book.title || "Book cover"}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                ) : (
                  <div className="flex aspect-[3/4] w-full items-center justify-center bg-gradient-to-br from-teal-50 to-slate-100 dark:from-teal-950/40 dark:to-slate-800">
                    <BookOpen className="h-20 w-20 text-teal-300 dark:text-teal-700" />
                  </div>
                )}
                {/* Rating badge */}
                <div className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-amber-400 px-3 py-1.5 shadow-lg">
                  <Star size={12} className="fill-white text-white" />
                  <span className="text-xs font-bold text-white">
                    {parseFloat(book.rating || 0).toFixed(1)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Details */}
          <div className="flex flex-col justify-center">

            {/* Tags row */}
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700 dark:border-teal-800/60 dark:bg-teal-950/50 dark:text-teal-300">
                <Hash size={10} />
                {book.category || "General"}
              </span>
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                  isAvailable
                    ? "border border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800/60 dark:bg-emerald-950/40 dark:text-emerald-400"
                    : "border border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-800/60 dark:bg-rose-950/40 dark:text-rose-400"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${isAvailable ? "bg-emerald-500" : "bg-rose-500"}`}
                />
                {isAvailable ? "Available" : "Unavailable"}
              </span>
            </div>

            {/* Title */}
            <h1 className="mb-2 text-3xl font-extrabold leading-tight text-slate-950 dark:text-white sm:text-4xl xl:text-5xl">
              {book.title || "Untitled"}
            </h1>

            {/* Author */}
            <p className="mb-1 text-sm text-slate-500 dark:text-slate-400">
              by{" "}
              <span className="font-semibold text-teal-600 dark:text-teal-400">
                {book.author || "Unknown Author"}
              </span>
            </p>

            {/* Star rating */}
            <div className="mb-6">
              <StarRating rating={book.rating} />
            </div>

            {/* Divider */}
            <div className="mb-6 h-px bg-slate-200 dark:bg-slate-700/60" />

            {/* Summary */}
            <div className="mb-6">
              <h2 className="mb-2 text-xs font-semibold uppercase tracking-widest text-teal-600 dark:text-teal-400">
                Summary
              </h2>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {book.content || book.shortDescription || "No description available."}
              </p>
            </div>

            {/* Stat cards */}
            <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <StatCard label="Copies" value={book.quantity ?? 0} />
              <StatCard label="Category" value={book.category || "—"} />
              <StatCard label="Rating" value={`${parseFloat(book.rating || 0).toFixed(1)} / 5`} />
              <StatCard label="Status" value={isAvailable ? "In Stock" : "Out"} />
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                disabled={!isAvailable}
                className="inline-flex items-center gap-2 rounded-2xl bg-teal-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-500/25 transition hover:bg-teal-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <BookMarked size={16} />
                Borrow Book
              </button>
              <button className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-teal-400 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-200 dark:hover:border-teal-600">
                <Bookmark size={16} />
                Save for Later
              </button>
              <button className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-teal-400 hover:text-teal-600 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-400 dark:hover:border-teal-600 dark:hover:text-teal-400">
                <Share2 size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* ── Short Description Section ── */}
        {book.shortDescription && book.content && (
          <div className="mt-14 rounded-3xl border border-slate-200 bg-white p-8 dark:border-slate-700/60 dark:bg-slate-800/40">
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-teal-600 dark:text-teal-400">
              About this book
            </h2>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              {book.shortDescription}
            </p>
          </div>
        )}

        {/* ── Back button ── */}
        <div className="mt-10">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400"
          >
            <ArrowLeft size={15} />
            Back to catalog
          </button>
        </div>
      </div>
    </div>
  );
};

export default BooksDetails;