import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";

import categoryBg from "@/assets/BookCatImg/categoryBg.png";
import computerBg from "@/assets/BookCatImg/computerBg.jpg";
import scienceBg from "@/assets/BookCatImg/science-ficBg.jpg";
import sportsBg from "@/assets/BookCatImg/sportsBg.jpg";
import mysteryBg from "@/assets/HomeCategorieImg/mystery.png";
import selfBg from "@/assets/BookCatImg/selfBg.jpg";
import libraryBg from "@/assets/LibraryBg/bg-img.jpg";

const categories = [
  {
    name: "Novel",
    image: libraryBg,
    description:
      "Character-driven stories, modern classics, and literary journeys for thoughtful everyday reading.",
  },
  {
    name: "Sports & Games",
    image: sportsBg,
    description:
      "Training guides, game strategy, athlete stories, and playful reads for competitive minds.",
  },
  {
    name: "Computer & Coding",
    image: computerBg,
    description:
      "Programming, software design, data structures, and practical guides for building digital skills.",
  },
  {
    name: "Sci-Fi",
    image: scienceBg,
    description:
      "Future worlds, space exploration, artificial intelligence, and big ideas powered by imagination.",
  },
  {
    name: "History",
    image: categoryBg,
    description:
      "Civilizations, movements, timelines, and true accounts that explain how the present took shape.",
  },
  {
    name: "Biography",
    image: selfBg,
    description:
      "Real lives, personal struggles, leadership stories, and achievements told with human detail.",
  },
  {
    name: "Technology",
    image: computerBg,
    description:
      "Emerging tools, digital culture, innovation, and systems shaping work, learning, and society.",
  },
  {
    name: "Fantasy",
    image: scienceBg,
    description:
      "Mythic worlds, magic, quests, and immersive adventures beyond the edge of ordinary life.",
  },
  {
    name: "Mystery",
    image: mysteryBg,
    description:
      "Suspenseful plots, hidden clues, investigations, and page-turning reveals for curious readers.",
  },
  {
    name: "Education",
    image: categoryBg,
    description:
      "Academic support, learning methods, reference material, and books built for steady progress.",
  },
  {
    name: "Other",
    image: libraryBg,
    description:
      "A flexible shelf for unique titles, mixed subjects, and discoveries that do not fit one label.",
  },
];

const AllCategories = () => {
  return (
    <section className="min-h-screen bg-[#f8f9ff] px-4 py-14 transition-colors duration-300 dark:bg-slate-950 sm:px-6 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-4 md:mb-12 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl text-center md:text-left">
            <span className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-teal-700 dark:border-teal-900 dark:bg-teal-950/50 dark:text-teal-300">
              <BookOpen size={14} />
              Book Categories
            </span>
            <h1 className="mt-4 text-3xl font-extrabold text-slate-950 dark:text-white sm:text-4xl lg:text-5xl">
              Browse Books by Collection
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400 sm:text-base">
              Choose a focused category and jump straight into books that match
              your reading mood, course needs, or next research topic.
            </p>
          </div>

          <Link
            href="/all-books"
            className="mx-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-bold text-slate-800 shadow-sm transition hover:border-teal-500 hover:text-teal-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-teal-500 dark:hover:text-teal-300 md:mx-0"
          >
            View Full Catalog
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categories.map((category) => (
            <article
              key={category.name}
              className="group flex min-h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-teal-300 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900 dark:hover:border-teal-700"
            >
              <div className="relative h-48 w-full overflow-hidden bg-slate-200 dark:bg-slate-800">
                <Image
                  src={category.image}
                  alt={`${category.name} books`}
                  fill
                  sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent" />
                <span className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-teal-700 shadow-sm backdrop-blur dark:bg-slate-950/90 dark:text-teal-300">
                  {category.name}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <h2 className="text-lg font-bold text-slate-950 transition-colors group-hover:text-teal-700 dark:text-white dark:group-hover:text-teal-300">
                  {category.name}
                </h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {category.description}
                </p>

                <Link
                  href={`/all-books?category=${encodeURIComponent(
                    category.name
                  )}`}
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-teal-700 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 dark:bg-teal-500 dark:text-slate-950 dark:hover:bg-teal-400 dark:focus:ring-offset-slate-900"
                >
                  View {category.name} Books
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllCategories;
