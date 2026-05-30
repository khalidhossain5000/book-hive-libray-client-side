"use client";

import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { Book, Users, Globe, Clock } from "lucide-react";

const stats = [
  { 
    value: 12, 
    suffix: "k+", 
    label: "Total Books", 
    icon: <Book size={24} />,
    color: "text-teal-600 dark:text-teal-400"
  },
  { 
    value: 5,  
    suffix: "k+", 
    label: "Active Readers", 
    icon: <Users size={24} />,
    color: "text-emerald-600 dark:text-emerald-400"
  },
  { 
    value: 48, 
    suffix: "",   
    label: "Global Partners", 
    icon: <Globe size={24} />,
    color: "text-cyan-600 dark:text-cyan-400"
  },
  { 
    value: 24, 
    suffix: "/7", 
    label: "Digital Access", 
    icon: <Clock size={24} />,
    color: "text-blue-600 dark:text-blue-400"
  },
];

const Stats = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section 
      ref={ref}
      className="py-20 bg-white dark:bg-[#020617] transition-colors duration-300"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-y-12 gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map(({ value, suffix, label, icon, color }) => (
            <div
              key={label}
              className="relative flex flex-col items-center lg:items-start p-8 rounded-[2rem] bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800 transition-all duration-300 hover:shadow-2xl hover:shadow-teal-500/10 hover:-translate-y-2 group"
            >
              {/* Icon Section */}
              <div className={`mb-6 p-4 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700 ${color} transition-transform duration-300 group-hover:scale-110`}>
                {icon}
              </div>

              {/* Numbers Section */}
              <div className="text-center lg:text-left">
                <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
                  {inView ? (
                    <CountUp
                      start={0}
                      end={value}
                      duration={3}
                      useEasing={true}
                    />
                  ) : (
                    "0"
                  )}
                  <span className="text-teal-500">{suffix}</span>
                </h2>

                <p className="mt-3 text-sm font-bold uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400">
                  {label}
                </p>
              </div>

              {/* Bottom Decorative Line */}
              <div className="absolute bottom-0 left-1/2 lg:left-8 -translate-x-1/2 lg:translate-x-0 w-0 h-1 bg-teal-500 rounded-full transition-all duration-500 group-hover:w-20"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;