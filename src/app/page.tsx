"use client";

import { StatCards } from "@/components/dashboard/StatCards";
import { BalanceTrend } from "@/components/dashboard/BalanceTrend";
import { SpendingBreakdown } from "@/components/dashboard/SpendingBreakdown";
import { ArrowRight, Activity } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";

export default function Home() {
  return (
    <div className="space-y-12 pb-20 no-border">
      <header className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between no-border">
        <div>
          <h1 className="text-4xl font-medium tracking-tighter text-slate-900 dark:text-white uppercase sm:text-5xl">
            Portfolio <span className="text-slate-600 dark:text-slate-500">Summary</span>
          </h1>
          <p className="mt-4 text-xs font-medium uppercase tracking-[0.3em] text-slate-500">
            Real-time financial metrics and analytics.
          </p>
        </div>
        <div className="flex items-center gap-3 no-border">
          <Link href="/transactions">
            <motion.button 
              whileHover={{ y: -1 }}
              className="flex items-center gap-3 bg-slate-900 dark:bg-slate-100 px-8 py-4 text-[11px] font-medium uppercase tracking-[0.3em] text-white dark:text-slate-950 shadow-large transition-all hover:bg-slate-800 dark:hover:bg-white no-border"
            >
              Transactions
              <ArrowRight className="h-4 w-4" />
            </motion.button>
          </Link>
        </div>
      </header>

      <section className="no-border">
        <div className="flex items-center gap-3 mb-10 no-border">
          <div className="h-4 w-[2px] bg-slate-500" />
          <h2 className="text-[10px] font-medium uppercase tracking-[0.3em] text-slate-900 dark:text-slate-500">Global Stats</h2>
        </div>
        <StatCards />
      </section>

      <section className="grid grid-cols-1 gap-12 lg:grid-cols-3 no-border">
        <div className="lg:col-span-2 no-border">
          <div className="flex items-center gap-3 mb-10 no-border">
            <div className="h-4 w-[2px] bg-slate-500" />
            <h2 className="text-[10px] font-medium uppercase tracking-[0.3em] text-slate-900 dark:text-slate-500">Balance History</h2>
          </div>
          <BalanceTrend />
        </div>
        <div className="no-border">
          <div className="flex items-center gap-3 mb-10 no-border">
            <div className="h-4 w-[2px] bg-slate-500" />
            <h2 className="text-[10px] font-medium uppercase tracking-[0.3em] text-slate-900 dark:text-slate-500">Distribution</h2>
          </div>
          <SpendingBreakdown />
        </div>
      </section>

      <section className="bg-white/40 dark:bg-slate-900/40 p-12 lg:p-16 shadow-large rounded-none! no-border relative overflow-hidden group">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-10 no-border">
          <div className="flex items-center gap-6 no-border">
            <div className="flex h-12 w-12 items-center justify-center bg-slate-200/50 dark:bg-slate-900/80 shadow-subtle rounded-none! no-border">
              <Activity className="h-6 w-6 text-slate-900 dark:text-slate-100" />
            </div>
            <div>
              <h2 className="text-3xl font-medium text-slate-900 dark:text-white uppercase tracking-tight">Financial Insights</h2>
              <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-slate-600 dark:text-slate-500">Deep analysis of your spending behaviors.</p>
            </div>
          </div>
          <Link href="/insights">
            <motion.button 
              whileHover={{ x: 5 }}
              className="group flex items-center gap-3 bg-slate-200/50 dark:bg-slate-100/5 px-10 py-5 text-[10px] font-medium uppercase tracking-[0.3em] text-slate-900 dark:text-white shadow-subtle transition-all hover:bg-slate-200 dark:hover:bg-slate-100/10 no-border"
            >
              Analyze Metrics
              <ArrowRight className="h-4 w-4 text-slate-500 transition-transform duration-200 group-hover:translate-x-1" />
            </motion.button>
          </Link>
        </div>
        <div className="absolute top-0 right-0 h-full w-1/3 bg-slate-900/5 dark:bg-slate-100/2 -skew-x-12 translate-x-20 transition-transform duration-500 group-hover:translate-x-10 no-border" />
      </section>
    </div>
  );
}
