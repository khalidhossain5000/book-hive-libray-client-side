"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { Send, BookOpen } from "lucide-react";

const Cta = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return toast.error("Please enter a valid email!");

    // Simulate sending
    toast.success("Email send successful, we will reach soon", {
      description: "Thank you for joining our intellectual journey.",
      duration: 4000,
    });
    setEmail("");
  };

  return (
    <section className="py-16 px-4 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-6xl mx-auto relative overflow-hidden bg-white dark:bg-slate-900 rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-16 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800">
        {/* Background Decorative Icon (Matching Image) */}
        <div className="absolute top-10 right-10 opacity-5 dark:opacity-10 pointer-events-none">
          <BookOpen size={180} className="text-slate-900 dark:text-white" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          {/* Heading */}
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white leading-tight mb-6">
            Ready to start your <br />
            <span className="text-teal-700 dark:text-teal-500">
              intellectual journey?
            </span>
          </h2>

          {/* Description */}
          <p className="text-slate-600 dark:text-slate-400 text-sm md:text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            Join over 5,000 active readers and gain access to our premium
            institutional resources today.
          </p>

          {/* Subscription Form */}
          <form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row items-center gap-3 max-w-lg mx-auto"
          >
            <div className="relative w-full">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-teal-500 outline-none transition-all dark:text-white text-sm"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-teal-800 hover:bg-teal-700 text-white font-bold rounded-2xl transition-all active:scale-95 shadow-lg shadow-teal-900/20 cursor-pointer whitespace-nowrap"
            >
              Subscribe Now
              <Send size={18} />
            </button>
          </form>

          <p className="mt-6 text-xs text-slate-400 dark:text-slate-500">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Cta;
