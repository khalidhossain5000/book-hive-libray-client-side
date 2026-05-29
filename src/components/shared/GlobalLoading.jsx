"use client";

import React from "react";
import { BookOpen, Loader2 } from "lucide-react";

export default function GlobalLoading({
  fullScreen = true,
  message = "Loading...",
  className = "",
}) {
  const content = (
    <div className={`flex flex-col items-center justify-center gap-5 ${className}`}>
      <div className="relative flex items-center justify-center">
        {/* Outer glowing ring for premium effect */}
        <div className="absolute inset-0 rounded-full blur-xl bg-primary/40 animate-pulse" />
        
        {/* Main Spinner Container */}
        <div className="relative bg-background border border-primary/20 shadow-xl shadow-primary/10 rounded-full p-4 flex items-center justify-center">
          <Loader2 className="w-10 h-10 text-primary animate-spin absolute" />
          <BookOpen className="w-4 h-4 text-primary/80 animate-pulse" />
        </div>
      </div>
      
      {message && (
        <div className="flex flex-col items-center gap-1.5">
          <h3 className="text-sm font-bold text-foreground font-montserrat tracking-widest uppercase">
            BookHive
          </h3>
          <p className="text-xs text-foreground/50 font-inter font-medium tracking-wide animate-pulse">
            {message}
          </p>
        </div>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-md">
        {content}
      </div>
    );
  }

  return (
    <div className="w-full h-full min-h-[300px] flex items-center justify-center">
      {content}
    </div>
  );
}
