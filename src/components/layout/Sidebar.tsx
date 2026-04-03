"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ArrowRightLeft,
  PieChart,
  Settings,
  LogOut,
  Wallet,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

const NAV_ITEMS = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Transactions", href: "/transactions", icon: ArrowRightLeft },
  { name: "Insights", href: "/insights", icon: PieChart },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 hidden h-screen w-64 flex-col border-none glass lg:flex shadow-subtle rounded-none!">
      <div className="flex h-16 items-center gap-3 px-8">
        <div className="flex h-8 w-8 items-center justify-center bg-slate-100/10 rounded-none! shadow-subtle no-border">
          <Wallet className="h-4 w-4 text-slate-100" />
        </div>
        <span className="text-lg font-medium tracking-tighter text-slate-100 uppercase">
          Paisa 💸
        </span>
      </div>

      <nav className="flex-1 space-y-1 px-4 py-8">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.name} href={item.href}>
              <motion.div
                whileHover={{ x: 2 }}
                className={cn(
                  "group flex items-center gap-3 px-4 py-3 text-sm transition-all duration-150 rounded-none! no-border",
                  isActive
                    ? "bg-slate-100/5 text-slate-100 shadow-subtle"
                    : "text-slate-500 hover:bg-slate-100/5 hover:text-slate-300",
                )}
              >
                <item.icon
                  className={cn(
                    "h-4 w-4 transition-colors no-border",
                    isActive ? "text-slate-100" : "group-hover:text-slate-400",
                  )}
                />
                <span className={cn(isActive ? "font-medium" : "font-normal")}>
                  {item.name}
                </span>
              </motion.div>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto space-y-1 p-4 pb-8">
        <Link
          href={"/settings"}
          className="flex w-full items-center gap-3 px-4 py-3 text-xs font-normal text-slate-500 transition-colors hover:bg-slate-100/5 hover:text-slate-300 no-border"
        >
          <Settings className="h-4 w-4" />
          Settings
        </Link>
        <button
          onClick={() =>
            window.alert("Auth was not mentioned in assignment bro !")
          }
          className="flex w-full items-center gap-3 px-4 py-3 text-xs font-normal text-slate-600 transition-colors hover:bg-red-500/5 hover:text-red-400 no-border"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </aside>
  );
}
