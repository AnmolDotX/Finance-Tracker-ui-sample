"use client";

import { User, Bell, ChevronRight, Activity, Menu, Sun, Moon } from "lucide-react";
import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import { useFinanceStore } from "@/store/useFinanceStore";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function Topbar() {
  const pathname = usePathname();
  const { setIsSidebarOpen } = useFinanceStore();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line
    setMounted(true);
  }, []);
  
  const getBreadcrumb = (path: string) => {
    if (path === "/") return "Dashboard";
    const segment = path.split("/").pop();
    if (!segment) return "Dashboard";
    return segment.charAt(0).toUpperCase() + segment.slice(1);
  };

  return (
    <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-none px-6 backdrop-blur-md lg:px-10 shadow-subtle rounded-none! bg-white/40 dark:bg-transparent">
      <div className="flex h-10 items-center gap-4 border-none">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="flex h-9 w-9 items-center justify-center bg-slate-200/50 dark:bg-slate-900/50 text-slate-600 dark:text-slate-500 hover:text-slate-900 dark:hover:text-slate-300 no-border shadow-subtle lg:hidden"
        >
          <Menu className="h-4 w-4" />
        </button>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-slate-100 shadow-sm rounded-none! no-border">
          <Activity className="h-3 w-3 text-slate-900 dark:text-slate-950 animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-900 dark:text-slate-950">Live</span>
        </div>
        
        <div className="flex items-center gap-3 text-slate-500 dark:text-slate-600">
          <ChevronRight className="h-3 w-3" />
          <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-slate-800 dark:text-slate-300">
            {getBreadcrumb(pathname)}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4 lg:gap-8">
        <div className="flex items-center gap-3">
          {mounted && (
            <motion.button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              whileHover={{ y: -1 }}
              className="flex h-9 w-9 items-center justify-center bg-slate-200/50 dark:bg-slate-900/50 text-slate-600 dark:text-slate-500 hover:text-slate-900 dark:hover:text-slate-300 no-border shadow-subtle"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </motion.button>
          )}
          <motion.button
            whileHover={{ y: -1 }}
            className="flex h-9 w-9 items-center justify-center bg-slate-200/50 dark:bg-slate-900/50 text-slate-600 dark:text-slate-500 hover:text-slate-900 dark:hover:text-slate-300 no-border shadow-subtle"
          >
            <Bell className="h-4 w-4" />
          </motion.button>

          <div className="flex items-center gap-4 pl-4 border-none">
            <div className="hidden text-right lg:block border-none">
              <p className="text-sm font-medium text-slate-900 dark:text-slate-100">Anmol Kumar</p>
              <p className="mt-0.5 text-[9px] font-normal text-slate-500 dark:text-slate-500 uppercase tracking-widest">
                Elite Member
              </p>
            </div>
            <div className="flex h-9 w-9 items-center justify-center bg-slate-200/80 dark:bg-slate-900/80 rounded-none! no-border shadow-subtle overflow-hidden">
              <User className="h-4 w-4 text-slate-500 dark:text-slate-400" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
