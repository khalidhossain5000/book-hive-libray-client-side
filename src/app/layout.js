import { Montserrat, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "BookHive Library Management System",
  description: "BookHive Library Management System is a comprehensive web application designed to streamline library operations. It offers features such as book cataloging, user management, borrowing and returning books, and generating reports. With an intuitive interface and robust functionality, BookHive aims to enhance the efficiency of library management and provide a seamless experience for both librarians and patrons.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={` ${montserrat.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-full flex-col">
            <main className="flex-1">{children}</main>
  
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
