import React from "react";
import { ArrowRight } from "lucide-react";

const steps = [
  {
    number: 1,
    title: "Discover",
    desc: "Browse our extensive digital catalog using advanced smart filters.",
  },
  {
    number: 2,
    title: "Reserve",
    desc: "Instantly reserve your chosen titles with a single click in the app.",
  },
  {
    number: 3,
    title: "Collect",
    desc: "Pick up from your nearest hub or enjoy instant digital access.",
  },
];

const Flow = () => {
  return (
    <section
      id="borrowing-flow"
      className="scroll-mt-24 bg-[#e8edf5] dark:bg-slate-900 py-16"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-extrabold text-slate-950 dark:text-white sm:text-4xl">
            Seamless Borrowing Flow
          </h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Three simple steps to unlock a world of knowledge.
          </p>
        </div>

        {/* Steps */}
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start sm:gap-4">
          {steps.map((step, idx) => (
            <React.Fragment key={step.number}>
              {/* Card */}
              <div className="relative w-full flex-1 rounded-2xl bg-white px-6 pb-7 pt-10 shadow-sm dark:bg-slate-800">
                {/* Number bubble — overlapping top edge */}
                <div className="absolute -top-5 left-6 flex h-10 w-10 items-center justify-center rounded-full bg-teal-700 text-sm font-bold text-white shadow-md dark:bg-teal-600">
                  {step.number}
                </div>
                <h3 className="mb-2 text-base font-bold text-slate-900 dark:text-white">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                  {step.desc}
                </p>
              </div>

              {/* Arrow between cards */}
              {idx < steps.length - 1 && (
                <div className="flex shrink-0 items-center justify-center sm:mt-8">
                  <ArrowRight
                    size={20}
                    className="rotate-90 text-slate-400 dark:text-slate-500 sm:rotate-0"
                  />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Flow;
