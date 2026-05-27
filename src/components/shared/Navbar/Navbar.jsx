"use client";

import React, { useState } from "react";
import Link from "next/link";

import { Bell, Menu, Moon, Search } from "lucide-react";

import CommonButton from "../commonButton/SecondaryButton";
import MobileNavbar from "./MobileNav";
import { ModeToggle } from "../ThemeToggle/ModeToggle";
import PrimaryButton from "../commonButton/PrimaryButton";
import SecondaryButton from "../commonButton/SecondaryButton";

export const navLinks = [
  {
    id: 1,
    name: "Home",
    path: "/",
  },
  {
    id: 2,
    name: "All Books",
    path: "/books",
  },
  {
    id: 3,
    name: "Add Book",
    path: "/add-book",
  },
  {
    id: 4,
    name: "Borrowed Books",
    path: "/borrowed-books",
  },
];
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full border-b dark:border-b-0 dark:shadow-2xl shadow-sm border-gray-200 bg-white dark:bg-background z-999999">
      <nav className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="h-[80px] flex items-center justify-between">
          {/* LEFT SIDE */}
          <div className="flex items-center gap-10">
            {/* LOGO */}
            <Link href="/">
              <h1 className="text-3xl font-extrabold font-montserrat">
                <span className="text-gray-900 dark:text-text-primary">
                  Book
                </span>
                <span className="text-teal-600 dark:text-primary">Hive</span>
              </h1>
            </Link>
          </div>
          {/* middle side */}
          {/* DESKTOP NAV */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.id}
                href={link.path}
                className="relative px-4 py-2 text-gray-600 dark:text-text-primary font-medium rounded-lg hover:text-teal-600 transition-all duration-300 group"
              >
                {link.name}

                {/* Hover Underline */}
                <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-teal-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>
          {/* RIGHT SIDE */}
          <div className="flex items-center gap-3 relative z-[999999999999999999999999]">
            {/* Theme toggle */}
            <ModeToggle />

            {/* LOGIN BUTTON */}
            <div className="hidden md:flex items-center gap-4 font-inter">
              <Link href="/auth/register">
                <PrimaryButton className="rounded-md px-4 lg:px-6 py-2 ">
                  Register
                </PrimaryButton>
              </Link>
              <Link href="/auth/login">
                <SecondaryButton className="rounded-md px-4 lg:px-6 py-2">
                  Login
                </SecondaryButton>
              </Link>
            </div>

            {/* MOBILE MENU BUTTON */}
            <button
              onClick={() => setIsOpen(true)}
              className="md:hidden flex items-center justify-center w-11 h-11 rounded-full hover:bg-gray-100 transition"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE NAVBAR */}
      <div className="lg:hidden">
        <MobileNavbar
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          navLinks={navLinks}
        />
      </div>
    </header>
  );
};

export default Navbar;
