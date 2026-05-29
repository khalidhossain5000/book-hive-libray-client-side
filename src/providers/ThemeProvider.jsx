"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import AuthProvider from "@/context/AuthProvider";

export function ThemeProvider({ children, ...props }) {
  return (
    <NextThemesProvider {...props}>
      <AuthProvider>{children}</AuthProvider>
    </NextThemesProvider>
  );
}
