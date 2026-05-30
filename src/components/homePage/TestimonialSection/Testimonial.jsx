/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

// Swiper styles
import "swiper/css";

const Testimonial = () => {
  // Dummy Data (12 entries)
  const reviews = [
    {
      id: 1,
      name: "Elena Wright",
      role: "PhD Candidate",
      image: "https://i.pravatar.cc/150?u=1",
      quote:
        "BookiHive has completely transformed how I manage my research. The interface is intuitive and the speed of borrowing is unmatched.",
    },
    {
      id: 2,
      name: "David Chen",
      role: "Creative Director",
      image: "https://i.pravatar.cc/150?u=2",
      quote:
        "The curated collections are fantastic. I've discovered so many rare titles that I couldn't find elsewhere. Highly recommended.",
    },
    {
      id: 3,
      name: "Sarah Miller",
      role: "Library Architect",
      image: "https://i.pravatar.cc/150?u=3",
      quote:
        "Institutional library management done right. The tracking features help me stay on top of my reading list without any hassle.",
    },
    {
      id: 4,
      name: "Julian Thorne",
      role: "Digital Archivist",
      image: "https://i.pravatar.cc/150?u=4",
      quote:
        "A masterpiece of UI design. Managing thousands of digital records has never been this fluid and visually pleasing.",
    },
    {
      id: 5,
      name: "Sophia Loren",
      role: "Historian",
      image: "https://i.pravatar.cc/150?u=5",
      quote:
        "The precision in search and categorization is life-saving for my research projects. Truly a premium experience.",
    },
    {
      id: 6,
      name: "Marcus Vane",
      role: "Software Engineer",
      image: "https://i.pravatar.cc/150?u=6",
      quote:
        "As a dev, I appreciate the speed and performance. The dark mode is easy on the eyes during late-night reading sessions.",
    },
    {
      id: 7,
      name: "Olivia Grace",
      role: "Literature Professor",
      image: "https://i.pravatar.cc/150?u=7",
      quote:
        "I recommend BookiHive to all my students. It's not just a library tool; it's a gateway to organized knowledge.",
    },
    {
      id: 8,
      name: "Liam Knight",
      role: "Content Curator",
      image: "https://i.pravatar.cc/150?u=8",
      quote:
        "The recommendation engine is spooky good. It knows exactly what I want to read next before I even do.",
    },
    {
      id: 9,
      name: "Emma Watson",
      role: "Bibliophile",
      image: "https://i.pravatar.cc/150?u=9",
      quote:
        "The community features and ease of use make BookiHive stand out from any other platform I've tried.",
    },
    {
      id: 10,
      name: "Noah Brooks",
      role: "Journalist",
      image: "https://i.pravatar.cc/150?u=10",
      quote:
        "Fast, reliable, and secure. It's the only platform I trust for managing my extensive collection of references.",
    },
    {
      id: 11,
      name: "Isabella Rose",
      role: "Visual Artist",
      image: "https://i.pravatar.cc/150?u=11",
      quote:
        "The aesthetic of this site matches my creative workflow perfectly. It's a joy to use every single day.",
    },
    {
      id: 12,
      name: "Ethan Hunt",
      role: "Strategy Analyst",
      image: "https://i.pravatar.cc/150?u=12",
      quote:
        "Efficiency at its peak. BookiHive makes data-heavy library management feel like a walk in the park.",
    },
  ];

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-950 transition-colors duration-300 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            What Our Members Say
          </h2>
        </div>

        {/* Swiper Slider */}
        <Swiper
          modules={[Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-12"
        >
          {reviews.map((review) => (
            <SwiperSlide key={review.id}>
              <div className="h-full bg-white dark:bg-slate-900 p-8 md:p-10 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none transition-all hover:border-teal-500/30 flex flex-col justify-between">
                {/* Quote */}
                <p className="text-slate-600 dark:text-slate-400 text-lg italic leading-relaxed mb-8">
                  &quot;{review.quote}&ldquo;
                </p>

                {/* User Info */}
                <div className="flex items-center gap-4">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-teal-500/20">
                    <img
                      src={review.image}
                      alt={review.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                      {review.name}
                    </h4>
                    <p className="text-sm font-medium text-slate-500 dark:text-teal-500/80">
                      {review.role}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonial;
