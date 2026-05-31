"use client";

import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import {
  ArrowRight,
  BookOpenCheck,
  Building2,
  CalendarClock,
  CheckCircle2,
  Clock3,
  Headphones,
  HelpCircle,
  LibraryBig,
  Mail,
  MapPin,
  MessageSquareText,
  Phone,
  Send,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import heroImage from "@/assets/LibraryBg/bg-img-ii.jpg";

const contactMethods = [
  {
    title: "Email Support",
    value: "support@bookhive.com",
    detail: "For account, borrowing, and wishlist questions.",
    icon: Mail,
  },
  {
    title: "Library Desk",
    value: "+1 (555) 014-2048",
    detail: "Talk with the BookHive operations team.",
    icon: Phone,
  },
  {
    title: "Visit Us",
    value: "123 Book Street",
    detail: "Reading City, Library District.",
    icon: MapPin,
  },
];

const departments = [
  {
    title: "Borrowing Help",
    detail: "Return dates, active loans, borrowing limits, and book availability.",
    icon: BookOpenCheck,
  },
  {
    title: "Member Accounts",
    detail: "Profile updates, login support, role access, and dashboard help.",
    icon: Users,
  },
  {
    title: "Admin Support",
    detail: "Catalog updates, user management, book images, and analytics.",
    icon: ShieldCheck,
  },
  {
    title: "Library Partnerships",
    detail: "School, club, and community library onboarding conversations.",
    icon: Building2,
  },
];

const supportSteps = [
  {
    title: "Share the Details",
    detail: "Tell us the page, book title, or dashboard action involved.",
  },
  {
    title: "We Review",
    detail: "The right team checks your account, catalog, or borrowing record.",
  },
  {
    title: "You Get Clarity",
    detail: "We respond with next steps, fixes, or guidance for your library task.",
  },
];

const faqs = [
  {
    question: "Can I ask about a borrowed book?",
    answer: "Yes. Include the book title and the email used on your BookHive account.",
  },
  {
    question: "Do admins use the same contact form?",
    answer: "Yes. Choose Admin Support in the subject so your request is routed clearly.",
  },
  {
    question: "Can I suggest a new book category?",
    answer: "Absolutely. Send the category name and a few example books you want grouped there.",
  },
  {
    question: "How fast do you reply?",
    answer: "Most messages receive a response within one business day.",
  },
];

const ContactPage = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    event.currentTarget.reset();
    toast.success("Message received. The BookHive team will follow up soon.", {
      position: "top-center",
    });
  };

  return (
    <div className="bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-slate-100">
      <section className="relative min-h-[72vh] overflow-hidden">
        <Image
          src={heroImage}
          alt="Library shelves and reading space"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-slate-950/70 dark:bg-slate-950/78" />
        <div className="relative mx-auto flex min-h-[72vh] max-w-7xl flex-col justify-end px-4 pb-12 pt-28 sm:px-6 lg:px-8 lg:pb-16">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-teal-100 backdrop-blur">
              <Headphones className="h-4 w-4" />
              BookHive Support
            </span>
            <h1 className="mt-6 text-4xl font-extrabold leading-tight text-white font-montserrat sm:text-5xl lg:text-6xl">
              Contact BookHive
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-200 sm:text-lg">
              Reach the team for borrowing help, account questions, catalog
              updates, admin dashboard support, or library partnership requests.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#contact-form"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-teal-600 px-5 text-sm font-bold text-white shadow-lg shadow-teal-950/25 transition hover:bg-teal-500"
              >
                Send Message
                <Send className="h-4 w-4" />
              </a>
              <a
                href="mailto:support@bookhive.com"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-white/25 bg-white/10 px-5 text-sm font-bold text-white backdrop-blur transition hover:bg-white/15"
              >
                Email Support
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white py-12 dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
          {contactMethods.map(({ title, value, detail, icon: Icon }) => (
            <div
              key={title}
              className="rounded-xl border border-slate-200 bg-slate-50 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-100 text-teal-700 dark:bg-teal-400/15 dark:text-teal-300">
                <Icon className="h-5 w-5" />
              </div>
              <h2 className="mt-4 text-lg font-bold font-montserrat">{title}</h2>
              <p className="mt-2 text-sm font-semibold text-teal-700 dark:text-teal-300">
                {value}
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                {detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="contact-form" className="py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-teal-100 px-3 py-1 text-xs font-bold uppercase tracking-widest text-teal-800 dark:bg-teal-400/15 dark:text-teal-200">
              <MessageSquareText className="h-4 w-4" />
              Message Desk
            </span>
            <h2 className="mt-5 text-3xl font-extrabold text-slate-950 font-montserrat dark:text-white sm:text-4xl">
              Tell us what you need
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-400">
              Send a clear note about your account, book, category, dashboard
              action, or partnership idea. We will route it to the right place.
            </p>
            <div className="mt-8 grid gap-3">
              {["Include your account email", "Mention the book title if relevant", "Choose the closest subject"].map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="h-5 w-5 text-teal-600 dark:text-teal-300" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                Name
                <input
                  required
                  name="name"
                  type="text"
                  placeholder="Your name"
                  className="h-11 rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm font-normal outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                />
              </label>
              <label className="grid gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                Email
                <input
                  required
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  className="h-11 rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm font-normal outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                />
              </label>
            </div>
            <label className="mt-4 grid gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
              Subject
              <select
                name="subject"
                className="h-11 rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm font-normal outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              >
                <option>Borrowing help</option>
                <option>Account support</option>
                <option>Admin dashboard</option>
                <option>Catalog request</option>
                <option>Partnership</option>
              </select>
            </label>
            <label className="mt-4 grid gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
              Message
              <textarea
                required
                name="message"
                rows={6}
                placeholder="Write your message..."
                className="resize-none rounded-lg border border-slate-200 bg-slate-50 px-3 py-3 text-sm font-normal outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              />
            </label>
            <button
              type="submit"
              className="mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-teal-700 px-5 text-sm font-bold text-white transition hover:bg-teal-600"
            >
              Submit Message
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </section>

      <section className="bg-white py-16 dark:bg-slate-900 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-extrabold font-montserrat sm:text-4xl">
              Find the right team
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-400">
              BookHive support is organized around common library workflows.
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {departments.map(({ title, detail, icon: Icon }) => (
              <div
                key={title}
                className="rounded-xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950"
              >
                <Icon className="h-7 w-7 text-teal-600 dark:text-teal-300" />
                <h3 className="mt-5 text-base font-bold font-montserrat">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                  {detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:col-span-2">
            <div className="flex items-center gap-3">
              <MapPin className="h-6 w-6 text-teal-600 dark:text-teal-300" />
              <h2 className="text-2xl font-extrabold font-montserrat">Location</h2>
            </div>
            <div className="mt-6 min-h-[260px] rounded-lg border border-slate-200 bg-[linear-gradient(135deg,#e2e8f0_25%,transparent_25%),linear-gradient(225deg,#e2e8f0_25%,transparent_25%),linear-gradient(45deg,#e2e8f0_25%,transparent_25%),linear-gradient(315deg,#e2e8f0_25%,#f8fafc_25%)] bg-[length:28px_28px] bg-[position:14px_0,14px_0,0_0,0_0] dark:border-slate-800 dark:bg-[linear-gradient(135deg,#1e293b_25%,transparent_25%),linear-gradient(225deg,#1e293b_25%,transparent_25%),linear-gradient(45deg,#1e293b_25%,transparent_25%),linear-gradient(315deg,#1e293b_25%,#020617_25%)]">
              <div className="flex min-h-[260px] items-center justify-center p-6 text-center">
                <div>
                  <LibraryBig className="mx-auto h-12 w-12 text-teal-600 dark:text-teal-300" />
                  <p className="mt-4 text-lg font-bold">BookHive Library Desk</p>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                    123 Book Street, Reading City
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center gap-3">
              <Clock3 className="h-6 w-6 text-teal-600 dark:text-teal-300" />
              <h2 className="text-2xl font-extrabold font-montserrat">Hours</h2>
            </div>
            <div className="mt-6 space-y-4 text-sm">
              {[
                ["Monday to Thursday", "9:00 AM - 6:00 PM"],
                ["Friday", "9:00 AM - 4:00 PM"],
                ["Saturday", "10:00 AM - 2:00 PM"],
                ["Sunday", "Closed"],
              ].map(([day, time]) => (
                <div key={day} className="flex items-center justify-between gap-3 border-b border-slate-200 pb-3 dark:border-slate-800">
                  <span className="text-slate-600 dark:text-slate-400">{day}</span>
                  <span className="font-semibold">{time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 dark:bg-slate-900 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-teal-100 px-3 py-1 text-xs font-bold uppercase tracking-widest text-teal-800 dark:bg-teal-400/15 dark:text-teal-200">
                <CalendarClock className="h-4 w-4" />
                Support Flow
              </span>
              <h2 className="mt-5 text-3xl font-extrabold font-montserrat sm:text-4xl">
                How messages move through BookHive
              </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {supportSteps.map((step, index) => (
                <div
                  key={step.title}
                  className="rounded-xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-600 text-sm font-bold text-white">
                    {index + 1}
                  </div>
                  <h3 className="mt-5 font-bold font-montserrat">{step.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                    {step.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-teal-100 px-3 py-1 text-xs font-bold uppercase tracking-widest text-teal-800 dark:bg-teal-400/15 dark:text-teal-200">
              <HelpCircle className="h-4 w-4" />
              Quick Answers
            </span>
            <h2 className="mt-5 text-3xl font-extrabold font-montserrat sm:text-4xl">
              Contact FAQ
            </h2>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
              >
                <h3 className="font-bold font-montserrat">{faq.question}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                  {faq.answer}
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
              Keep Reading
            </span>
            <h2 className="mt-5 text-3xl font-extrabold font-montserrat sm:text-4xl">
              Need a book before you contact support?
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              Browse the catalog, save favorites, and check availability while
              the support team reviews your message.
            </p>
          </div>
          <Link
            href="/all-books"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-teal-600 px-6 text-sm font-bold text-white transition hover:bg-teal-500"
          >
            Explore Books
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
