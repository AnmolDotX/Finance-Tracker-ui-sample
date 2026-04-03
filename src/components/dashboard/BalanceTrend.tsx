/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useFinanceStore } from "@/store/useFinanceStore";
import { formatCurrency } from "@/lib/utils";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "motion/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface TooltipProps {
  active?: boolean;
  payload?: unknown[];
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-slate-900 px-6 py-4 shadow-large rounded-none! no-border">
        <p className="text-[10px] font-medium text-slate-600 dark:text-slate-500 uppercase tracking-widest mb-1">
          {label}
        </p>
        <p className="text-xl font-medium text-slate-900 dark:text-white">
          {formatCurrency((payload[0] as any).value)}
        </p>
      </div>
    );
  }
  return null;
};

export function BalanceTrend() {
  const { transactions } = useFinanceStore();
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line
    setMounted(true);
  }, []);

  const tickColor = !mounted || theme === 'dark' ? '#64748b' : '#475569';

  const data = transactions
    .slice()
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .reduce((acc: { date: string; balance: number }[], curr) => {
      const prevBalance = acc.length > 0 ? acc[acc.length - 1].balance : 0;
      const amount = curr.type === "income" ? curr.amount : -curr.amount;
      acc.push({
        date: curr.date,
        balance: prevBalance + amount,
      });
      return acc;
    }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="bg-white/40 dark:bg-slate-900/40 p-10 shadow-medium rounded-none! no-border hover:bg-slate-50/50 dark:hover:bg-slate-900/60 transition-all duration-200"
    >
      <div className="mb-10 flex items-center justify-between no-border">
        <div>
          <h3 className="text-xl font-medium tracking-tight text-slate-900 dark:text-white uppercase">
            Balance Trend
          </h3>
          <p className="text-[10px] font-medium text-slate-600 dark:text-slate-500 uppercase tracking-widest mt-1">
            Net worth progress
          </p>
        </div>
        <div className="flex h-9 items-center gap-2 bg-slate-200/50 dark:bg-slate-900/50 px-4 shadow-subtle no-border">
          <div className="h-1.5 w-1.5 bg-slate-900 dark:bg-slate-100 shadow-sm shadow-slate-900 dark:shadow-slate-100" />
          <span className="text-[10px] font-medium uppercase tracking-widest text-slate-700 dark:text-slate-300">
            Net Worth
          </span>
        </div>
      </div>

      <div className="h-[320px] w-full no-border">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <CartesianGrid
              strokeDasharray="0"
              vertical={false}
              stroke="var(--foreground)"
              strokeOpacity={0.05}
            />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: tickColor, fontSize: 10, letterSpacing: "0.05em" }}
              tickFormatter={(date) =>
                new Date(date)
                  .toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })
                  .toUpperCase()
              }
              dy={15}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: tickColor, fontSize: 10, letterSpacing: "0.05em" }}
              tickFormatter={(val) => `$${val}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="balance"
              stroke="var(--foreground)"
              strokeOpacity={0.8}
              strokeWidth={1.5}
              fillOpacity={0.03}
              fill="var(--foreground)"
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
