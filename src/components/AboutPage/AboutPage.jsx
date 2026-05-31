import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  BookHeart,
  BookOpenCheck,
  CheckCircle2,
  Clock3,
  Database,
  HeartHandshake,
  LibraryBig,
  Lightbulb,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import heroImage from "@/assets/LibraryBg/bg-img.jpg";
import infoImage from "@/assets/Info/library-info.png";
import readerImage from "@/assets/TestimonialImg/latest/lst-vih.jpg";

const pillars = [
  {
    title: "Simple Borrowing",
    detail: "Readers can discover books, borrow with dates, and track returns without friction.",
    icon: BookOpenCheck,
  },
  {
    title: "Admin Control",
    detail: "Library teams manage books, users, stock, categories, and activity from one dashboard.",
    icon: ShieldCheck,
  },
  {
    title: "Useful Insights",
    detail: "Charts and stats make borrowing behavior, availability, and catalog health easier to read.",
    icon: BarChart3,
  },
];

const stats = [
  ["6+", "Core Library Workflows"],
  ["24/7", "Online Catalog Access"],
  ["2", "Role-Based Dashboards"],
  ["100%", "Responsive Experience"],
];

const values = [
  "Make book discovery easier for every reader.",
  "Give admins fast tools instead of heavy manual work.",
  "Keep borrowing records clear, visible, and accountable.",
  "Design every screen to feel calm and useful.",
];

const timeline = [
  {
    year: "Step 01",
    title: "Discover",
    detail: "Readers browse categories, popular books, and detailed book pages.",
  },
  {
    year: "Step 02",
    title: "Borrow",
    detail: "Members borrow books with return dates and see active loans in their dashboard.",
  },
  {
    year: "Step 03",
    title: "Manage",
    detail: "Admins maintain the catalog, review users, and monitor library statistics.",
  },
  {
    year: "Step 04",
    title: "Improve",
    detail: "Dashboards reveal what is being borrowed, returned, saved, and requested.",
  },
];

const audience = [
  {
    title: "Readers",
    detail: "A smoother way to find books, save favorites, and follow borrowing history.",
    icon: BookHeart,
  },
  {
    title: "Administrators",
    detail: "Focused tools for maintaining books, members, images, and availability.",
    icon: Database,
  },
  {
    title: "Communities",
    detail: "A digital layer for schools, clubs, and small libraries to stay organized.",
    icon: HeartHandshake,
  },
];

const AboutPage = () => {
  return (
    <div className="bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-slate-100">
      <section className="relative min-h-[72vh] overflow-hidden">
        <Image
          src={heroImage}
          alt="BookHive library interior"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-slate-950/68 dark:bg-slate-950/78" />
        <div className="relative mx-auto flex min-h-[72vh] max-w-7xl flex-col justify-end px-4 pb-12 pt-28 sm:px-6 lg:px-8 lg:pb-16">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-teal-100 backdrop-blur transition hover:border-teal-300/60 hover:bg-teal-400/15">
              <LibraryBig className="h-4 w-4" />
              About BookHive
            </span>
            <h1 className="mt-6 text-4xl font-extrabold leading-tight text-white font-montserrat sm:text-5xl lg:text-6xl">
              A smarter home for every library workflow
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-200 sm:text-lg">
              BookHive brings readers and library managers into one clean
              platform for discovery, borrowing, wishlists, catalog control, and
              meaningful dashboard insights.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/all-books"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-teal-600 px-5 text-sm font-bold text-white shadow-lg shadow-teal-950/25 transition duration-300 hover:-translate-y-0.5 hover:bg-teal-500 hover:shadow-xl"
              >
                Browse Books
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-white/25 bg-white/10 px-5 text-sm font-bold text-white backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:bg-white/15"
              >
                Contact Team
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-8">
          <div className="relative min-h-[320px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
            <Image
              src={infoImage}
              alt="Library management illustration"
              fill
              className="object-contain p-8"
            />
          </div>
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-teal-100 px-3 py-1 text-xs font-bold uppercase tracking-widest text-teal-800 dark:bg-teal-400/15 dark:text-teal-200">
              <Sparkles className="h-4 w-4" />
              Our Mission
            </span>
            <h2 className="mt-5 text-3xl font-extrabold font-montserrat sm:text-4xl">
              Help libraries feel organized, modern, and easy to use
            </h2>
            <p className="mt-5 text-sm leading-7 text-slate-600 dark:text-slate-400">
              BookHive was built for the everyday moments that make library
              systems feel either smooth or stressful: finding a book, checking
              availability, borrowing with a return date, managing stock, and
              seeing what is happening across the collection.
            </p>
            <div className="mt-7 grid gap-3">
              {values.map((value) => (
                <div
                  key={value}
                  className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-3 text-sm text-slate-700 transition duration-300 hover:border-teal-300 hover:bg-teal-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-teal-500/40 dark:hover:bg-teal-400/10"
                >
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-teal-600 dark:text-teal-300" />
                  {value}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 dark:bg-slate-900 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-teal-100 px-3 py-1 text-xs font-bold uppercase tracking-widest text-teal-800 dark:bg-teal-400/15 dark:text-teal-200">
              <Lightbulb className="h-4 w-4" />
              Platform Pillars
            </span>
            <h2 className="mt-5 text-3xl font-extrabold font-montserrat sm:text-4xl">
              Built around real library needs
            </h2>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {pillars.map(({ title, detail, icon: Icon }) => (
              <div
                key={title}
                className="group rounded-xl border border-slate-200 bg-slate-50 p-6 transition duration-300 hover:-translate-y-1 hover:border-teal-300 hover:bg-white hover:shadow-xl dark:border-slate-800 dark:bg-slate-950 dark:hover:border-teal-500/40 dark:hover:bg-slate-900"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-100 text-teal-700 transition duration-300 group-hover:scale-110 dark:bg-teal-400/15 dark:text-teal-300">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-lg font-bold font-montserrat">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                  {detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-8">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-teal-100 px-3 py-1 text-xs font-bold uppercase tracking-widest text-teal-800 dark:bg-teal-400/15 dark:text-teal-200">
              <Clock3 className="h-4 w-4" />
              Our Story
            </span>
            <h2 className="mt-5 text-3xl font-extrabold font-montserrat sm:text-4xl">
              From scattered records to one dependable library hub
            </h2>
            <p className="mt-5 text-sm leading-7 text-slate-600 dark:text-slate-400">
              The idea behind BookHive is simple: readers should not need to
              guess what is available, and admins should not need to wrestle
              with disconnected workflows. The app brings catalog management,
              borrowing records, user roles, wishlists, and analytics into one
              friendly interface.
            </p>
          </div>
          <div className="relative min-h-[360px] overflow-hidden rounded-2xl border border-slate-200 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800">
            <Image
              src={readerImage}
              alt="Reader in a library"
              fill
              className="object-cover transition duration-500 hover:scale-105"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/85 to-transparent p-6 text-white">
              <p className="text-sm font-semibold">Designed for daily reading life</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white py-12 dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          {stats.map(([value, label]) => (
            <div
              key={label}
              className="rounded-xl border border-slate-200 bg-slate-50 p-5 text-center transition duration-300 hover:-translate-y-1 hover:border-teal-300 hover:shadow-lg dark:border-slate-800 dark:bg-slate-950 dark:hover:border-teal-500/40"
            >
              <p className="text-3xl font-extrabold text-teal-700 font-montserrat dark:text-teal-300">
                {value}
              </p>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-teal-100 px-3 py-1 text-xs font-bold uppercase tracking-widest text-teal-800 dark:bg-teal-400/15 dark:text-teal-200">
              <Users className="h-4 w-4" />
              Who We Serve
            </span>
            <h2 className="mt-5 text-3xl font-extrabold font-montserrat sm:text-4xl">
              A better experience for every side of the library
            </h2>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {audience.map(({ title, detail, icon: Icon }) => (
              <div
                key={title}
                className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-teal-300 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900 dark:hover:border-teal-500/40"
              >
                <Icon className="h-8 w-8 text-teal-600 dark:text-teal-300" />
                <h3 className="mt-5 text-lg font-bold font-montserrat">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                  {detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 dark:bg-slate-900 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-teal-100 px-3 py-1 text-xs font-bold uppercase tracking-widest text-teal-800 dark:bg-teal-400/15 dark:text-teal-200">
              <ArrowRight className="h-4 w-4" />
              How It Works
            </span>
            <h2 className="mt-5 text-3xl font-extrabold font-montserrat sm:text-4xl">
              The BookHive flow
            </h2>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {timeline.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-slate-200 bg-slate-50 p-5 transition duration-300 hover:-translate-y-1 hover:border-teal-300 hover:bg-white hover:shadow-xl dark:border-slate-800 dark:bg-slate-950 dark:hover:border-teal-500/40 dark:hover:bg-slate-900"
              >
                <p className="text-xs font-bold uppercase tracking-widest text-teal-700 dark:text-teal-300">
                  {item.year}
                </p>
                <h3 className="mt-4 text-lg font-bold font-montserrat">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-16 text-white dark:bg-black sm:py-20">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-teal-100">
              <Sparkles className="h-4 w-4" />
              Start Exploring
            </span>
            <h2 className="mt-5 text-3xl font-extrabold font-montserrat sm:text-4xl">
              Ready to see BookHive in action?
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              Browse the collection, sign in, save favorites, or visit the
              dashboard to experience the library tools directly.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/all-books"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-teal-600 px-6 text-sm font-bold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-teal-500"
            >
              View Catalog
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/auth/register"
              className="inline-flex h-12 items-center justify-center rounded-lg border border-white/20 bg-white/10 px-6 text-sm font-bold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-white/15"
            >
              Join BookHive
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
