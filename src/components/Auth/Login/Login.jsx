import React from "react";
import Image from "next/image";
import Link from "next/link";
import loginImg from "../../../assets/AuthBg/auth-pagesbds.png";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4 transition-colors duration-300">
      {/* Main Container */}
      <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden min-h-[600px]">
        {/* Left Side: Image & Branding */}
        <div className="relative w-full md:w-1/2 hidden md:flex flex-col justify-end p-10 text-white">
          <Image
            src={loginImg}
            alt="Login Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-teal-900/40 dark:bg-teal-950/60" />

          <div className="relative z-10">
            <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[10px] uppercase tracking-widest font-bold mb-4 border border-white/30">
              Premium Intelligence
            </span>
            <h1 className="text-3xl lg:text-4xl font-bold leading-tight mb-4">
              Master Your Collection with BookiHive.
            </h1>
            <p className="text-slate-100/90 text-sm font-light max-w-sm">
              Precision library management for the modern era. Join a community
              of elite administrators and readers.
            </p>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="w-full md:w-1/2 p-8 lg:p-16 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full">
            <h2 className="text-2xl lg:text-3xl font-bold text-teal-900 dark:text-white mb-2">
              Welcome Back
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-8">
              Access your dashboard and manage your library books.
            </p>

            <form className="space-y-5">
              {/* Email Field */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="admin@bookihive.com"
                  className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-teal-500 outline-none transition-all dark:text-white cursor-text"
                />
              </div>

              {/* Password Field */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Password
                  </label>
                  <Link
                    href="/auth/forgot-password"
                    className="text-[10px] font-bold text-teal-600 hover:underline cursor-pointer"
                  >
                    Forgot password?
                  </Link>
                </div>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-teal-500 outline-none transition-all dark:text-white cursor-text"
                />
              </div>

              {/* Sign In Button */}
              <button className="w-full py-3 bg-teal-800 hover:bg-teal-700 text-white font-bold rounded-lg transition-all active:scale-[0.98] shadow-lg shadow-teal-900/20 mt-2 cursor-pointer">
                Sign In
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-8 text-center">
              <hr className="border-slate-200 dark:border-slate-700" />
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-slate-900 px-4 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                Or continue with
              </span>
            </div>

            {/* Social Buttons - Only Google */}
            <div className="flex justify-center">
              <button className="flex items-center justify-center gap-3 w-full py-3 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-[0.98] dark:text-white text-sm font-medium cursor-pointer">
                <FcGoogle size={22} />
                Sign in with Google
              </button>
            </div>

            <p className="text-center mt-10 text-xs text-slate-500">
              New to BookiHive?{" "}
              <Link
                href="/auth/register"
                className="text-teal-600 font-bold hover:underline cursor-pointer"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
