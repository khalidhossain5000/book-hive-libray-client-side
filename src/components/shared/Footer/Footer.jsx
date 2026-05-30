import Link from "next/link";
import { BookOpen, Mail, MapPin, ArrowUpRight } from "lucide-react";
import { FaGithub, FaTwitter, FaInstagram } from "react-icons/fa";

const footerLinks = [
  {
    title: "Navigate",
    items: [
      { label: "Home", href: "/" },
      { label: "All Books", href: "/all-books" },
      { label: "Dashboard", href: "/dashboard" },
      { label: "Borrowed Books", href: "/borrowed-books" },
    ],
  },
  {
    title: "Resources",
    items: [
      { label: "About Us", href: "/about" },
      { label: "Blog", href: "/blogs" },
      { label: "Help Center", href: "/help" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    title: "Legal",
    items: [
      { label: "Contact", href: "/contact" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Use", href: "/terms" },
      { label: "Site Map", href: "/sitemap" },
    ],
  },
];

const socials = [
  { icon: FaGithub, href: "#", label: "GitHub" },
  { icon: FaTwitter, href: "#", label: "Twitter" },
  { icon: FaInstagram, href: "#", label: "Instagram" },
];

const Footer = () => {
  return (
    <footer className="relative overflow-hidden border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      {/* Top accent line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-teal-500 to-transparent opacity-60" />

      {/* Background decoration */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-teal-500/5 blur-3xl dark:bg-teal-500/10" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-cyan-500/5 blur-3xl dark:bg-cyan-500/10" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Top section */}
        <div className="grid gap-12 py-14 md:grid-cols-[2fr_repeat(3,1fr)]">

          {/* Brand column */}
          <div className="space-y-6">
            <Link href="/" className="inline-flex items-center gap-2.5 group">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-teal-600 shadow-lg shadow-teal-500/25 transition group-hover:bg-teal-500">
                <BookOpen size={18} className="text-white" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-slate-950 dark:text-white">
                Book<span className="text-teal-600">Hive</span>
              </span>
            </Link>

            <p className="max-w-xs text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              Your friendly library marketplace. Explore, borrow, and manage
              your reading life — all from one place.
            </p>

            <div className="space-y-3">
              <a
                href="mailto:support@bookhive.com"
                className="flex items-center gap-2.5 text-sm text-slate-500 transition hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800">
                  <Mail size={12} className="text-teal-600 dark:text-teal-400" />
                </span>
                support@bookhive.com
              </a>
              <div className="flex items-center gap-2.5 text-sm text-slate-500 dark:text-slate-400">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800">
                  <MapPin size={12} className="text-teal-600 dark:text-teal-400" />
                </span>
                123 Book Street, Reading City
              </div>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-2">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-500 transition hover:border-teal-400 hover:bg-teal-50 hover:text-teal-600 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-400 dark:hover:border-teal-600 dark:hover:bg-teal-950/50 dark:hover:text-teal-400"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="mb-5 text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="group inline-flex items-center gap-1 text-sm text-slate-600 transition hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400"
                    >
                      {item.label}
                      <ArrowUpRight
                        size={11}
                        className="opacity-0 -translate-y-0.5 transition group-hover:opacity-100"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-200 py-6 dark:border-slate-800 sm:flex-row">
          <p className="text-xs text-slate-400 dark:text-slate-500">
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold text-slate-600 dark:text-slate-300">
              BookHive
            </span>
            . All rights reserved.
          </p>

          <div className="flex items-center gap-1">
            <span className="text-xs text-slate-400 dark:text-slate-500">Built with</span>
            <span className="mx-1 text-xs font-semibold text-teal-600 dark:text-teal-400">
              Next.js & Tailwind
            </span>
            <span className="text-xs text-slate-400 dark:text-slate-500">· Made with ♥</span>
          </div>

          <div className="flex items-center gap-4">
            {["Privacy", "Terms", "Contact"].map((label) => (
              <Link
                key={label}
                href={`/${label.toLowerCase()}`}
                className="text-xs text-slate-400 transition hover:text-teal-600 dark:text-slate-500 dark:hover:text-teal-400"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;