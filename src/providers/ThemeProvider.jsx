"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import AuthProvider from "@/context/AuthProvider";
import TanstackProvider from "./TanStackProvider";

export function ThemeProvider({ children, ...props }) {
  return (
    <NextThemesProvider {...props}>
      <TanstackProvider>
      <AuthProvider>{children}</AuthProvider>
      </TanstackProvider>
    </NextThemesProvider>
  );
}
