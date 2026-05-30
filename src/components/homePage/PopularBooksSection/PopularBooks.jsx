"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Star, BookOpen } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import useAxios from "@/hooks/useAxios";
import Link from "next/link";

const PopularBooks = () => {
  const axiosInstance = useAxios();
  const router = useRouter();

  const { data: books = [], isLoading } = useQuery({
    queryKey: ["allBooks"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/allBooks");
      return data;
    },
    staleTime: 1000 * 60 * 5,
  });

  const popularBooks = [...books]
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 8);

  return (
    <section className="py-16 bg-[#e8edf5] dark:bg-slate-950">
      <style>{`
        .pop-swiper .swiper-pagination {
          position: relative;
          margin-top: 28px;
        }
        .pop-swiper .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: #94a3b8;
          opacity: 1;
          transition: all 0.3s;
        }
        .pop-swiper .swiper-pagination-bullet-active {
          background: #0f766e;
          width: 24px;
          border-radius: 4px;
        }
        .dark .pop-swiper .swiper-pagination-bullet {
          background: #475569;
        }
        .dark .pop-swiper .swiper-pagination-bullet-active {
          background: #2dd4bf;
        }
      `}</style>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">
            Trending This Month
          </h2>
          <p className="mt-3 mx-auto max-w-lg text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            Highly rated additions to our repository that are currently engaging our global reader community.
          </p>
        </div>

        {/* Skeleton */}
        {isLoading ? (
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse rounded-2xl bg-white dark:bg-slate-800 overflow-hidden">
                <div className="bg-slate-200 dark:bg-slate-700" style={{ height: "340px" }} />
                <div className="p-4 space-y-2">
                  <div className="h-4 w-3/4 rounded bg-slate-200 dark:bg-slate-700" />
                  <div className="h-3 w-1/2 rounded bg-slate-200 dark:bg-slate-700" />
                  <div className="h-9 w-full rounded-lg bg-slate-200 dark:bg-slate-700 mt-2" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Swiper
            modules={[Pagination, Autoplay, A11y]}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }}
            loop={true}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              500:  { slidesPerView: 2, spaceBetween: 16 },
              768:  { slidesPerView: 3, spaceBetween: 20 },
              1024: { slidesPerView: 4, spaceBetween: 24 },
            }}
            className="pop-swiper"
          >
            {popularBooks.map((book) => (
              <SwiperSlide key={book._id}>
                <div className="group flex flex-col rounded-2xl bg-white dark:bg-slate-900 overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

                  {/* ── Image ── */}
                  <div
                    className="relative w-full overflow-hidden bg-slate-200 dark:bg-slate-800"
                    style={{ height: "340px" }}
                  >
                    {book.image ? (
                      <Image
                        src={book.image}
                        alt={book.title || "Book"}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <BookOpen className="h-16 w-16 text-slate-300 dark:text-slate-600" />
                      </div>
                    )}

                    {/* Rating badge */}
                    <div className="absolute right-3 top-3 flex items-center gap-1 rounded-md bg-amber-500 px-2.5 py-1.5 shadow-lg">
                      <Star size={11} className="fill-white text-white" />
                      <span className="text-xs font-bold text-white leading-none">
                        {parseFloat(book.rating || 0).toFixed(1)}
                      </span>
                    </div>
                  </div>

                  {/* ── Body ── */}
                  <div className="flex flex-col p-4 gap-0.5">
                    <h3 className="text-[15px] font-bold text-slate-900 dark:text-white line-clamp-1">
                      {book.title || "Untitled"}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                      {book.author || "Unknown Author"}
                    </p>
                    <Link href={`/all-books/${book._id}`}>
                    <button
                      
                      className="w-full rounded-xl border border-slate-300 bg-transparent py-2.5 text-xs font-semibold text-slate-700 transition hover:border-teal-500 hover:text-teal-700 dark:border-slate-700 dark:text-slate-200 dark:hover:border-teal-500 dark:hover:text-teal-400 cursor-pointer"
                    >
                      View Details
                    </button>
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
};

export default PopularBooks;