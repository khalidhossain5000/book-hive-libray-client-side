"use client";
import Link from "next/link";
import { X, LogOut } from "lucide-react";
import PrimaryButton from "../commonButton/PrimaryButton";
import SecondaryButton from "../commonButton/SecondaryButton";

const isActiveRoute = (pathname, path) => {
  if (path === "/") return pathname === "/";
  return pathname === path || pathname.startsWith(`${path}/`);
};

const MobileNavbar = ({
  isOpen,
  setIsOpen,
  navLinks,
  user,
  handleLogout,
  currentPath,
}) => {
  return (
    <div
      className={`fixed right-0 top-0 z-[999] flex h-screen w-[280px] flex-col justify-between bg-white pb-5 shadow-2xl transition-all duration-300 dark:bg-slate-950 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 p-5 dark:border-slate-800">
        <div></div>
        <button
          onClick={() => setIsOpen(false)}
          className="rounded-full p-2 transition hover:bg-gray-100 dark:text-slate-100 dark:hover:bg-slate-800"
        >
          <X size={24} />
        </button>
      </div>

      {/* Nav Links */}
      <div className="flex flex-col p-5 gap-3">
        {navLinks.map((link) => {
          const isActive = isActiveRoute(currentPath, link.path);

          return (
            <Link
              key={link.id}
              href={link.path}
              onClick={() => setIsOpen(false)}
              aria-current={isActive ? "page" : undefined}
              className={`rounded-xl px-4 py-3 font-medium transition-all duration-300 ${
                isActive
                  ? "bg-teal-50 text-teal-700 dark:bg-teal-950/40 dark:text-teal-300"
                  : "text-gray-700 hover:bg-teal-50 hover:text-teal-600 dark:text-slate-200 dark:hover:bg-slate-900 dark:hover:text-teal-300"
              }`}
            >
              {link.name}
            </Link>
          );
        })}
      </div>
      {/* auth buttons */}
      <div className="flex flex-col gap-3 font-inter px-5 mt-auto mb-5">
        {user ? (
          <>
            <Link href="/dashboard" onClick={() => setIsOpen(false)}>
              <PrimaryButton className="w-full rounded-md px-4 lg:px-6 py-2">
                Dashboard
              </PrimaryButton>
            </Link>
            <button
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
              className="flex items-center justify-center gap-2 w-full rounded-md px-4 lg:px-6 py-2 bg-red-50 text-red-600 hover:bg-red-100 transition"
            >
              <LogOut size={18} />
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/auth/register" onClick={() => setIsOpen(false)}>
              <PrimaryButton className="w-full rounded-md px-4 lg:px-6 py-2">
                Register
              </PrimaryButton>
            </Link>
            <Link href="/auth/login" onClick={() => setIsOpen(false)}>
              <SecondaryButton className="w-full rounded-md px-4 lg:px-6 py-2">
                Login
              </SecondaryButton>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default MobileNavbar;
