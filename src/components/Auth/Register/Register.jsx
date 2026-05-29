"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import authImg from "../../../assets/AuthBg/auth-pagesbds.png";
// React Icon Import
import { FcGoogle } from "react-icons/fc";
import useAxios from "@/hooks/useAxios";
import useAuth from "@/hooks/useAuth";

const Register = () => {
  const router = useRouter();
  const axiosInstance = useAxios();
  const [passwordError, setPasswordError] = useState("");
  const [showError, setShowError] = useState("");
  const { createUser, updateUserProfile, setUser, loading } = useAuth();

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const { email, password, name } = Object.fromEntries(formData.entries());
    console.log(email, password, name, "this is form data over here");
    setPasswordError("");
    setShowError("");
    // password validation start
    const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/;
    if (passwordPattern.test(password) == false) {
      setPasswordError(
        "Password Length must be at least 6 characters And Must have an Uppercase and a Lowercase letter",
      );
      return;
    }
    // password validation end
    // FIREBASE USER
    createUser(email, password)
      .then((result) => {
        const user = result.user;
        setShowError("");
        // data sending to the DB START
        const userInfo = {
          name,
          email,
          role: "user", //default role
          profilePic: "https://i.ibb.co/fGHXvNYc/profile-i.jpg", //default profile pic
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
        // data sending to the DB ENDS
        //update profile here
        updateUserProfile({
          displayName: name,
          photoURL: "https://i.ibb.co/fGHXvNYc/profile-i.jpg",
        })
          .then(() => {
            setUser({
              ...user,
              displayName: name,
              photoURL: "https://i.ibb.co.com/fGHXvNYc/profile-i.jpg",
            });
            toast.success("User registered successfully.", {
              position: "top-center",
            });
            router.push("/");
          })
          .catch((error) => {
            const message = error.message || "please try again";
            setShowError(message);
            toast.error(`Profile update failed: ${message}`, {
              position: "top-right",
            });
            console.log(error);
          });
        // navigate(`${registerLocation.state?.from || "/"}`, { replace: true });
      })
      .catch((error) => {
        const message = error.message || error.code || "Registration failed.";
        setShowError(message);
        toast.error(`Oops - ${message}`, {
          position: "top-right",
        });
        console.log(error);
      });
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
          console.log(result);
          router.push("/");
        })
        .then((error) => {
       
          toast.error(`Opps--${error.code}`, {
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
      <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden min-h-[650px]">
        {/* Left Side: Image & Branding */}
        <div className="relative w-full md:w-1/2 hidden md:flex flex-col justify-end p-10 text-white">
          <Image
            src={authImg}
            alt="Auth Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-teal-900/40 dark:bg-teal-950/60" />

          <div className="relative z-10">
            <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[10px] uppercase tracking-widest font-bold mb-4 border border-white/30">
              Join the Elite
            </span>
            <h1 className="text-3xl lg:text-4xl font-bold leading-tight mb-4">
              Start Your Journey with BookiHive.
            </h1>
            <p className="text-slate-100/90 text-sm font-light max-w-sm">
              Organize, manage, and expand your library with our world-class
              precision tools.
            </p>
          </div>
        </div>

        {/* Right Side: Register Form */}
        <div className="w-full md:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full">
            <h2 className="text-2xl lg:text-3xl font-bold text-teal-900 dark:text-white mb-2">
              Create Account
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-8">
              Join BookiHive today and start managing your books.
            </p>

            <form className="space-y-4" onSubmit={handleRegister}>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-teal-500 outline-none transition-all dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-teal-500 outline-none transition-all dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-teal-500 outline-none transition-all dark:text-white"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 bg-teal-800 text-white font-bold rounded-lg transition-all active:scale-[0.98] shadow-lg shadow-teal-900/20 mt-4 ${loading ? "opacity-70 cursor-not-allowed" : "hover:bg-teal-700"}`}
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>
              {(passwordError || showError) && (
                <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-600 dark:bg-red-950/40 dark:text-red-300">
                  {passwordError || showError}
                </div>
              )}
            </form>

            <div className="relative my-8 text-center">
              <hr className="border-slate-200 dark:border-slate-700" />
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-slate-900 px-4 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                Or register with
              </span>
            </div>

            {/* Updated Google Button using React Icons */}
            <div className="flex justify-center">
              <button onClick={handleGoogleLogin} className="flex items-center justify-center gap-3 w-full py-3 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-[0.98] dark:text-white text-sm font-medium cursor-pointer">
                <FcGoogle size={22} /> {/* React Icon */}
                Sign up with Google
              </button>
            </div>

            <p className="text-center mt-8 text-xs text-slate-500">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="text-teal-600 font-bold hover:underline cursor-pointer"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
