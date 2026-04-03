"use client";

import { useFinanceStore } from "@/store/useFinanceStore";
import { formatCurrency, cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Wallet, ArrowUpCircle, ArrowDownCircle } from "lucide-react";
import { motion } from "motion/react";

export function StatCards() {
  const { transactions } = useFinanceStore();

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const balance = totalIncome - totalExpense;

  const stats = [
    {
      title: "Total Balance",
      value: balance,
      icon: Wallet,
      trend: "+12.5%",
      trendUp: true,
      color: "slate",
    },
    {
      title: "Total Income",
      value: totalIncome,
      icon: ArrowUpCircle,
      trend: "+8.2%",
      trendUp: true,
      color: "emerald",
    },
    {
      title: "Total Expense",
      value: totalExpense,
      icon: ArrowDownCircle,
      trend: "+5.1%",
      trendUp: false,
      color: "rose",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat, idx) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: idx * 0.05 }}
          className="relative overflow-hidden bg-white/40 dark:bg-slate-900/40 p-10 shadow-medium rounded-[0!important] no-border group hover:bg-slate-50/50 dark:hover:bg-slate-900/60 transition-all duration-200"
        >
          <div className="flex items-center justify-between no-border">
            <div className={cn(
              "flex h-10 w-10 items-center justify-center rounded-none! no-border shadow-subtle",
              stat.color === "slate" && "bg-slate-200 dark:bg-slate-100/10 text-slate-800 dark:text-slate-100",
              stat.color === "emerald" && "bg-emerald-500/10 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
              stat.color === "rose" && "bg-rose-500/10 dark:bg-rose-500/10 text-rose-700 dark:text-rose-400"
            )}>
              <stat.icon className="h-5 w-5" />
            </div>
            <div className={cn(
              "flex items-center gap-1.5 px-3 py-1 text-[10px] font-medium tracking-widest uppercase rounded-[0!important] no-border",
              stat.trendUp ? "text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 shadow-subtle" : "text-rose-700 dark:text-rose-400 bg-rose-500/10 shadow-subtle"
            )}>
              {stat.trendUp ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
              {stat.trend}
            </div>
          </div>

          <div className="mt-10 no-border">
            <p className="text-[10px] font-medium text-slate-800 dark:text-slate-400 uppercase tracking-widest">{stat.title}</p>
            <h3 className="mt-2 text-3xl font-medium tracking-tight text-slate-900 dark:text-white uppercase sm:text-4xl">
              {formatCurrency(stat.value)}
            </h3>
          </div>

          <div className={cn(
            "absolute -bottom-6 -right-6 h-32 w-32 rounded-full blur-[100px] opacity-[0.05] dark:opacity-[0.02] transition-all duration-300 group-hover:opacity-[0.08] dark:group-hover:opacity-[0.04]",
            stat.color === "slate" && "bg-slate-400 dark:bg-slate-100",
            stat.color === "emerald" && "bg-emerald-500",
            stat.color === "rose" && "bg-rose-500"
          )} />
        </motion.div>
      ))}
    </div>
  );
}
