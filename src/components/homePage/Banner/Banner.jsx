/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import Image from "next/image";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
// Import required modules
import { Pagination, Autoplay } from "swiper/modules";
import PrimaryButton from "@/components/shared/commonButton/PrimaryButton";
import SecondaryButton from "@/components/shared/commonButton/SecondaryButton";

const Banner = () => {
  // Dummy images for the carousel
  const slides = [
    {
      id: 1,
      image:
        "https://i.ibb.co.com/HTtWMcrq/Book-Illustration.png",
    },
    {
      id: 2,
      image:
        "https://i.ibb.co.com/mr3h67dT/libray.png",
    },
    {
      id: 3,
      image:
        "https://i.ibb.co.com/WpjthzC4/Gemini-Generated-Image-u1vl4vu1vl4vu1vl.png",
    },{
      id: 4,
      image:
        "https://i.ibb.co.com/CfWWkP9/imgsd.png",
    },
  ];

  return (
    <section className="bg-[#F1F5F9] dark:bg-[#0e0e0e] min-h-[90vh] flex items-center py-12 px-6 lg:px-20">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="space-y-6 ">
          <div className="flex justify-center lg:justify-start">
            <span className="lg:inline-block px-4 py-1 rounded-full bg-[#E2E8F0] text-[#006D5B] text-sm font-semibold font-inter text-center mx-auto lg:mx-0">
            Library Management 2.0
          </span>
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#0F172A] dark:text-text-primary lg:leading-tight font-montserrat text-center lg:text-left">
            Your Gateway to <br />
            <span className="text-[#006D5B] dark:text-primary">Knowledge</span>
          </h1>
          <p className="text-[#475569] dark:text-teal-600 text-lg max-w-lg mx-auto lg:mx-0 text-center lg:text-left lg:leading-relaxed font-inter not-indeterminate:">
            Access a universe of curated literature, scholarly research, and
            institutional resources through our precision-engineered platform.
          </p>
          <div className="flex justify-center lg:justify-start gap-4 pt-4">
          
            <PrimaryButton className="rounded-md px-4 lg:px-6 xl:px-8 py-1 lg:py-2 text-sm md:text-xl lg:text-2xl"> Explore Library </PrimaryButton>
           
            <SecondaryButton className="rounded-md px-4 lg:px-6  py-2 text-sm md:text-xl lg:text-2xl">Quick Tour</SecondaryButton>
          </div>
        </div>

        {/* Right Carousel */}
        <div className="relative w-full max-w-xl mx-auto lg:ml-auto z-10">
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            pagination={{ clickable: true, el: ".custom-pagination" }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop={true}
            className="rounded-3xl overflow-hidden shadow-2xl"
          >
            {slides.map((slide) => (
              <SwiperSlide key={slide.id}>
                <div className="relative w-full h-[80%]">
                  {/* <Image
                                        src={slide.image}
                                        alt="Library view"
                                        fill
                                        className="object-cover"
                                        priority
                                    /> */}

                  <img
                    src={slide.image}
                    alt="Library view"
                    className="object-cover w-full h-[80%]"
                  />
                  {/* Gradient overlay to match the deep aesthetic */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Pagination Container */}
          <div className="custom-pagination flex justify-center mt-6 gap-2"></div>
        </div>
      </div>

      {/* Custom CSS for Swiper dots to match the teal color */}
      <style jsx global>{`
        .custom-pagination .swiper-pagination-bullet {
          background: #cbd5e1 !important;
          opacity: 1;
          width: 10px;
          height: 10px;
        }
        .custom-pagination .swiper-pagination-bullet-active {
          background: #006d5b !important;
          width: 24px;
          border-radius: 5px;
        }
      `}</style>
    </section>
  );
};

export default Banner;
