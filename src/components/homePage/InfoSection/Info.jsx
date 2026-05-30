import React from "react";
import Image from "next/image";
import { Zap, LayoutDashboard, ShieldCheck, MonitorSmartphone } from "lucide-react";
import infoImg from "../../../assets/Info/library-info.png";

const features = [
  {
    icon: Zap,
    title: "Fast borrowing",
    desc: "Instant digital checkout and rapid physical pick-up systems.",
  },
  {
    icon: LayoutDashboard,
    title: "Easy tracking",
    desc: "Comprehensive dashboard for managing your reading queue.",
  },
  {
    icon: ShieldCheck,
    title: "Secure",
    desc: "Enterprise-grade encryption for all member data and history.",
  },
  {
    icon: MonitorSmartphone,
    title: "Responsive",
    desc: "Access your account and books seamlessly on any device.",
  },
];

const Info = () => {
  return (
    <section className="bg-white dark:bg-slate-950 py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">

          {/* ── Left: Text + Features ── */}
          <div>
            <h2 className="text-3xl font-extrabold leading-tight text-slate-950 dark:text-white sm:text-4xl">
              Elevating the Modern <br className="hidden sm:block" />
              Reading Experience
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              We&lsquo;ve re-engineered the library experience for the digital native,
              focusing on three core pillars: speed, security, and accessibility.
            </p>

            {/* Feature grid */}
            <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
              {features.map(({ icon: Icon, title, desc }) => (
                <div key={title}>
                  {/* Icon box */}
                  <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-teal-100 bg-teal-50 dark:border-teal-900/60 dark:bg-teal-950/50">
                    <Icon size={18} className="text-teal-600 dark:text-teal-400" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    {title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Image ── */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[520px]">
              {/* Outer rounded card with light bg */}
              <div className="overflow-hidden rounded-3xl bg-slate-100 p-3 shadow-xl dark:bg-slate-800/60">
                <div className="relative h-[380px] w-full overflow-hidden rounded-2xl sm:h-[420px]">
                  <Image
                    src={infoImg}
                    alt="Modern library interior"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>

              {/* Decorative bg blob */}
              <div className="pointer-events-none absolute -right-6 -top-6 -z-10 h-40 w-40 rounded-full bg-slate-100 dark:bg-slate-800/40" />
              <div className="pointer-events-none absolute -bottom-4 -left-4 -z-10 h-28 w-28 rounded-full bg-teal-50 dark:bg-teal-950/30" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Info;