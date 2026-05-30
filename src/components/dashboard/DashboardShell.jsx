
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ModeToggle } from "@/components/shared/ThemeToggle/ModeToggle";
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  Menu, 
  X, 
  BookOpen,
  LogOut,
  BookOpenText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import useRole from "@/hooks/useRole";
import GlobalLoading from "../shared/GlobalLoading";
import useAuth from "@/hooks/useAuth";
import Image from "next/image";
import { toast } from "sonner";


const demoRoutes = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Manage Users",
    href: "/dashboard/manage-users",
    icon: Users,
  },
  {
    title: "Add Book",
    href: "/dashboard/add-book",
    icon: BookOpen,
  },
  {
    title: "Manage Books",
    href: "/dashboard/manage-books",
    icon: BookOpenText,
  }
];

export function DashboardShell({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  const closeSidebar = () => setIsSidebarOpen(false);

  const {role,roleLoading}=useRole()
  const {user,logOutUser,loading}=useAuth()
  const router=useRouter()
  console.log(role,roleLoading,'this is role and role loading',user)
  if(roleLoading || loading) return <GlobalLoading/>


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
        })
        router.push("/")
      });
    };
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={closeSidebar}
        />
      )}
      {/* Sidebar */}
      <aside
        className={`fixed flex flex-col inset-y-0 left-0 z-50 w-64 transform border-r border-slate-200 dark:border-slate-700 bg-background transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 shrink-0 items-center justify-between px-6 border-b border-slate-200 dark:border-slate-700">
          <Link href="/dashboard" className="text-2xl font-bold font-montserrat text-primary">
            BookHive
          </Link>
          <Button 
            variant="ghost" 
            size="icon" 
            className="lg:hidden text-foreground/70" 
            onClick={closeSidebar}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        {/* Top Navigation */}
        <div className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-2">
          <p className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-foreground/40 font-inter">
            Main Menu
          </p>
          {demoRoutes.map((route) => {
            const isActive = pathname === route.href;
            const Icon = route.icon;
            
            return (
              <Link
                key={route.href}
                href={route.href}
                onClick={closeSidebar}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-inter font-medium transition-colors ${
                  isActive 
                    ? "bg-primary/10 text-primary" 
                    : "text-foreground/70 hover:text-foreground hover:bg-muted/50"
                }`}
              >
                <Icon className={`h-5 w-5 ${isActive ? "text-primary" : "text-foreground/50"}`} />
                {route.title}
              </Link>
            );
          })}
        </div>

        {/* Bottom Navigation */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-700 flex flex-col gap-2">
          <p className="px-3 mb-1 text-xs font-semibold uppercase tracking-wider text-foreground/40 font-inter">
            Preferences
          </p>
          <Link
            href="/dashboard/profile-setting"
            onClick={closeSidebar}
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-inter font-medium transition-colors ${
              pathname === "/dashboard/settings"
                ? "bg-primary/10 text-primary"
                : "text-foreground/70 hover:text-foreground hover:bg-muted/50"
            }`}
          >
            <Settings className={`h-5 w-5 ${pathname === "/dashboard/profile-settings" ? "text-primary" : "text-foreground/50"}`} />
            Settings
          </Link>
          <button
            onClick={() => {
              handleLogout()
              closeSidebar();
            }}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-inter font-medium transition-colors text-red-500 hover:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-400/10 w-full text-left cursor-pointer"
          >
            <LogOut className="h-5 w-5 opacity-80" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 dark:border-slate-700 shadow-lg bg-background px-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-foreground/70"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex flex-col lg:hidden">
              <h1 className="text-lg font-semibold font-montserrat leading-none">
                BookHive
              </h1>
            </div>
            
            {/* Page Title (Desktop) */}
            <div className="hidden lg:flex flex-col">
              <h1 className="text-xl font-bold font-montserrat text-foreground">
               {role?.toUpperCase()} Dashboard
              </h1>
              <p className="text-xs text-foreground/50 font-inter mt-0.5">
                Manage your library effectively
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-5">
            <ModeToggle />
           <Image
                               src={user?.photoURL}
                               alt={user?.displayName || "User"}
                               width={40}
                               height={40}
                               className="w-12 h-12 rounded-full object-cover border-2 border-teal-600 hover:border-teal-700 transition-colors duration-200"
                             />
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-[#e2e8f0] dark:bg-[#020618] p-6">
          <div className="font-inter text-foreground max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
