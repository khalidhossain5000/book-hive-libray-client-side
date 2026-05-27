import React from "react";
import Link from "next/link";
import Image from "next/image"; // Recommended for Next.js
import { ArrowRight } from "lucide-react";

// Assuming these images are in your public folder or imported correctly
import compImg from "@/assets/HomeCategorieImg/com&programming.jpg";
import scifiImg from "@/assets/HomeCategorieImg/science-fictions.jpg";
import sportsImg from "@/assets/HomeCategorieImg/sports&games.jpg";
import selfdevImg from "@/assets/HomeCategorieImg/Self-Development & Meditation.jpg";

const CategoriesSection = () => {
  const categories = [
    { 
      name: "Computer & Coding", 
      image: compImg, 
      des: 'Learn programming languages, software development, and the fundamentals of computer science.' 
    },
    { 
      name: "Science-Fiction", 
      image: scifiImg, 
      des: 'Stories blending imagination and science—future technologies, space travel, and mysterious life forms.' 
    },
    { 
      name: "Sports & Games", 
      image: sportsImg, 
      des: 'From football to cricket, indoor games to eSports—news, tips, and tricks.'
    },
    { 
      name: "Self-Development", 
      image: selfdevImg, 
      des: 'Inspiration and meditation techniques to improve yourself and find mental peace.' 
    },
  ];

  return (
    <div className="py-16 px-6 lg:px-20 bg-[#f8f9ff] dark:bg-slate-950 transition-colors duration-300">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-12">
        <div className="text-center md:text-left">
          <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white">
            Curated Collections
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm mt-2 max-w-md">
            Explore our library by specialized genre and discipline to find your next great read.
          </p>
        </div>
        
        <Link href="/categories" className="group">
          <div className="flex items-center text-teal-600 dark:text-teal-400 gap-2 font-bold hover:text-teal-500 dark:hover:text-teal-400 transition-all duration-300">
            View All Categories
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {categories.map((cat, i) => (
          <div 
            key={i}
            className="group relative flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            {/* Image Wrapper */}
            <div className="relative h-48 w-full overflow-hidden">
              <Image 
                src={cat.image} 
                alt={cat.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                {cat.name}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3 mb-6">
                {cat.des}
              </p>
              
              <div className="mt-auto">
                <Link 
                  href={`/book-categories/${cat.name.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
                  className="inline-flex items-center text-sm font-semibold text-slate-900 dark:text-slate-100 border-b-2 border-teal-500/0 hover:border-teal-500 pb-1 transition-all duration-200"
                >
                  Explore Books
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesSection;