"use client";
import Link from "next/link";
import { X, LogOut } from "lucide-react";
import PrimaryButton from "../commonButton/PrimaryButton";
import SecondaryButton from "../commonButton/SecondaryButton";

const MobileNavbar = ({ isOpen, setIsOpen, navLinks, user, handleLogout }) => {
  return (
    <div
      className={`flex flex-col justify-between pb-5 fixed top-0 right-0 h-screen w-[280px] bg-white z-[999] shadow-2xl transition-all duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-5 border-b border-gray-200">
        <div></div>
        <button
          onClick={() => setIsOpen(false)}
          className="p-2 rounded-full hover:bg-gray-100 transition"
        >
          <X size={24} />
        </button>
      </div>

      {/* Nav Links */}
      <div className="flex flex-col p-5 gap-3">
        {navLinks.map((link) => (
          <Link
            key={link.id}
            href={link.path}
            onClick={() => setIsOpen(false)}
            className="px-4 py-3 rounded-xl font-medium text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition-all duration-300"
          >
            {link.name}
          </Link>
        ))}
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
