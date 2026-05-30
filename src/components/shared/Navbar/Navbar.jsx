"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Bell, Menu, Moon, Search, LogOut } from "lucide-react";

import CommonButton from "../commonButton/SecondaryButton";
import MobileNavbar from "./MobileNav";
import { ModeToggle } from "../ThemeToggle/ModeToggle";
import PrimaryButton from "../commonButton/PrimaryButton";
import SecondaryButton from "../commonButton/SecondaryButton";
import useAuth from "@/hooks/useAuth";
import { toast } from "sonner";

export const navLinks = [
  {
    id: 1,
    name: "Home",
    path: "/",
  },
  {
    id: 2,
    name: "All Books",
    path: "/all-books",
  },
  {
    id: 3,
    name: "Borrowed Books",
    path: "/borrowed-books",
    private: true,
  },
  {
    id: 4,
    name: "Dashboard",
    path: "/dashboard",
    private: true,
  },
];
const Navbar = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { user, loading, logOutUser } = useAuth();
  const filteredNavLinks = user
    ? navLinks
    : navLinks.filter((link) => !link.private);

  const handleLogout = async () => {
    logOutUser().then(() => {
      toast.success(`Log Out Successfull`, {
        position: "top-center",
        className: "w-[260px] h-[72px] text-sm font-semibold",
        removeDelay: 1200,
        iconTheme: {
          primary: "#f87171",
          secondary: "#fee2e2",
        },
        style: {
          border: "1px solid rgba(248, 113, 113, 0.65)",
          color: "white",
          backgroundImage: "linear-gradient(135deg, #dc2626, #ef4444, #f87171)",
          boxShadow:
            "0 20px 40px rgba(220, 38, 38, 0.35), 0 0 25px rgba(248, 113, 113, 0.45)",
        },
      });
    });
  };

  if (loading) return <h2>Loadings......</h2>;

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
            {filteredNavLinks.map((link) => (
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

            {/* AUTH: show user info and logout when signed in, otherwise show auth buttons */}
            {user ? (
              <div className="hidden md:flex items-center gap-3">
                <Link
                  href="/dashboard"
                  className="flex items-center hover:opacity-80 transition-opacity duration-200"
                >
                  {user.photoURL ? (
                    <Image
                      src={user.photoURL}
                      alt={user.displayName || "User"}
                      width={40}
                      height={40}
                      className="w-12 h-12 rounded-full object-cover border-2 border-teal-600 hover:border-teal-700 transition-colors duration-200"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-teal-600 text-white flex items-center justify-center font-semibold text-lg">
                      {user.displayName?.charAt(0).toUpperCase() || "U"}
                    </div>
                  )}
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center gap-2 px-3 md:px-4 py-2 rounded-lg bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 font-medium text-sm md:text-base hover:bg-red-100 dark:hover:bg-red-950/60 transition-all duration-300 hover:scale-105 active:scale-95 border border-red-200 dark:border-red-800 cursor-pointer"
                  title="Logout"
                >
                  <LogOut size={18} className="md:w-5 md:h-5" />
                  <span className="hidden lg:inline">Logout</span>
                </button>
              </div>
            ) : (
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
            )}

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
          navLinks={filteredNavLinks}
          user={user}
          handleLogout={handleLogout}
        />
      </div>
    </header>
  );
};

export default Navbar;
