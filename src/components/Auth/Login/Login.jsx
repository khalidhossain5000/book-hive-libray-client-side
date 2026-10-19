"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import loginImg from "../../../assets/AuthBg/auth-pagesbds.png";
import { FcGoogle } from "react-icons/fc";
import { ShieldCheck } from "lucide-react";
import useAuth from "@/hooks/useAuth";
import useAxios from "@/hooks/useAxios";

const adminCredentials = {
  email: "admin@bookhive.com",
  password: "admin@bookhive.comKk",
};

const Login = () => {
  const router = useRouter();
  const [wrongPassword, setWrongPassword] = useState("");
  const { logInUser, handleGoogleUser, loading ,setLoading} = useAuth();
  const axiosInstance=useAxios()

  const loginWithCredentials = (email, password, redirectPath = "/") => {
    setWrongPassword("");

    return logInUser(email, password)
      .then((result) => {
        
toast.success("Logged in successfully", {
  position: "top-center",
  className: "w-[260px] h-[72px] text-sm font-semibold",
  duration: 1200,
  iconTheme: {
    primary: "#22c55e",
    secondary: "#dcfce7",
  },
  style: {
    border: "1px solid rgba(34, 197, 94, 0.65)",
    borderRadius: "12px",
    color: "#ffffff",
    backgroundImage: "linear-gradient(135deg, #065f46, #16a34a)",
    boxShadow:
      "0 16px 30px rgba(22, 163, 74, 0.25), 0 0 18px rgba(74, 222, 128, 0.25)",
  },
});

        console.log(result);
        router.push(redirectPath);
      })
      .catch((error) => {
        const message =
          error.code === "auth/wrong-password"
            ? "Wrong password. Please check and try again."
            : "Invalid email or password.";
        setWrongPassword(message);
        toast.error(message, {
          position: "top-center",
          className: "w-[260px] h-[72px] text-sm font-semibold",
          removeDelay: 1800,
          iconTheme: {
            primary: "#b91c1c",
            secondary: "#fee2e2",
          },
          style: {
            border: "1px solid rgba(220, 38, 38, 0.75)",
            color: "white",
            backgroundImage: "linear-gradient(135deg, #7f1d1d, #dc2626)",
            boxShadow:
              "0 16px 30px rgba(220, 38, 38, 0.3), 0 0 18px rgba(220, 38, 38, 0.4)",
          },
        });
        setLoading(false)
      });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const { email, password } = Object.fromEntries(formData.entries());
    loginWithCredentials(email, password);
  };

  const handleAdminLogin = () => {
    loginWithCredentials(
      adminCredentials.email,
      adminCredentials.password,
      "/dashboard",
    );
  };

  //google login

  const handleGoogleLogin = () => {
    handleGoogleUser()
      .then((result) => {
        toast.success("Google Logged In Successfull", {
          className: "w-[300px] h-[50px] text-xl font-bold",
          removeDelay: 1000,
          position: "top-left",
          iconTheme: {
            primary: "#16061e",
            secondary: "#ef54e2",
          },
          style: {
            border: "1px solid black",
            color: "white",
            backgroundImage:
              "linear-gradient(to bottom right, #31c3df, #3a47d5)",
          },
        });
        
        
         const userInfo = {
          name:result?.user.displayName,
                  email:result?.user?.email,
                  role: "user", //default role
                };
                axiosInstance
                  .post("/users", userInfo)
                  .then(() => {})
                  .catch((error) => {
                    const message = error.message || "Unable to save user.";
                    setShowError(message);
                    toast.error(`Unable to save user: ${message}`, {
                      position: "top-right",
                    });
                    console.log(error);
                  });
       
        router.push("/");
      })
      .catch((error) => {
     
        toast.error(`Opps--${error?.code}`, {
          className: "w-[300px] h-[50px] text-xl font-bold ",
          removeDelay: 1000,
          iconTheme: {
            primary: "#16061e",
            secondary: "#ef54e2",
          },
          style: {
            border: "1px solid black",
            color: "white",
            backgroundImage:
              "linear-gradient(to bottom right,#0d0518,#87d0c3, #600e8c)",
          },
        });
      });
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4 transition-colors duration-300">
      {/* Main Container */}
      <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden min-h-150">
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

            <form className="space-y-5" onSubmit={handleLogin}>
              {/* Email Field */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
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
                  name="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-teal-500 outline-none transition-all dark:text-white cursor-text"
                />
                {wrongPassword && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-300">
                    {wrongPassword}
                  </p>
                )}
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                disabled={loading}
                className={`cursor-pointer w-full py-3 ${loading ? "bg-slate-400 cursor-not-allowed" : "bg-teal-800 hover:bg-teal-700"} text-white font-bold rounded-lg transition-all active:scale-[0.98] shadow-lg shadow-teal-900/20 mt-2`}
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>

              <button
                type="button"
                onClick={handleAdminLogin}
                disabled={loading}
                className={`cursor-pointer flex w-full items-center justify-center gap-2 rounded-lg border py-3 font-bold transition-all active:scale-[0.98] ${
                  loading
                    ? "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400 dark:border-slate-700 dark:bg-slate-800"
                    : "border-teal-200 bg-teal-50 text-teal-800 hover:bg-teal-100 dark:border-teal-500/30 dark:bg-teal-400/10 dark:text-teal-200 dark:hover:bg-teal-400/15"
                }`}
              >
                <ShieldCheck className="h-5 w-5" />
                {loading ? "Signing In..." : "Login as Admin"}
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
              <button
                onClick={handleGoogleLogin}
                className="flex items-center justify-center gap-3 w-full py-3 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-[0.98] dark:text-white text-sm font-medium cursor-pointer"
              >
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
