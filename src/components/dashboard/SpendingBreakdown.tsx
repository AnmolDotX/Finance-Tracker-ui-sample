/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useFinanceStore } from "@/store/useFinanceStore";
import { formatCurrency } from "@/lib/utils";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { motion } from "motion/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const COLORS_DARK = [
  "#f1f5f9", // Slate-100
  "#cbd5e1", // Slate-300
  "#94a3b8", // Slate-400
  "#64748b", // Slate-500
  "#475569", // Slate-600
  "#334155", // Slate-700
  "#1e293b", // Slate-800
];

const COLORS_LIGHT = [
  "#334155", // Slate-700
  "#475569", // Slate-600
  "#64748b", // Slate-500
  "#94a3b8", // Slate-400
  "#cbd5e1", // Slate-300
  "#e2e8f0", // Slate-200
  "#f1f5f9", // Slate-100
];

interface TooltipProps {
  active?: boolean;
  payload?: any[];
}

const CustomTooltip = ({ active, payload }: TooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-slate-900 px-6 py-4 shadow-large rounded-none! no-border">
        <p className="text-[10px] font-medium text-slate-600 dark:text-slate-500 uppercase tracking-widest mb-1">
          {payload[0].name}
        </p>
        <p className="text-xl font-medium text-slate-900 dark:text-white">
          {formatCurrency(payload[0].value)}
        </p>
      </div>
    );
  }
  return null;
};

export function SpendingBreakdown() {
  const { transactions } = useFinanceStore();
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line
    setMounted(true);
  }, []);

  const currentColors = !mounted || theme === 'dark' ? COLORS_DARK : COLORS_LIGHT;
  
  const expenses = transactions.filter((t) => t.type === "expense");

  const dataMap = expenses.reduce((acc: Record<string, number>, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
    return acc;
  }, {});

  const data = Object.entries(dataMap)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className="bg-white/40 dark:bg-slate-900/40 p-10 shadow-medium rounded-none! no-border hover:bg-slate-50/50 dark:hover:bg-slate-900/60 transition-all duration-200"
    >
      <div className="mb-10 items-center justify-between flex no-border">
        <div>
          <h3 className="text-xl font-medium tracking-tight text-slate-900 dark:text-white uppercase">
            Spending Breakdown
          </h3>
          <p className="text-[10px] font-medium text-slate-600 dark:text-slate-500 uppercase tracking-widest mt-1">
            Categorical metrics
          </p>
        </div>
      </div>

      <div className="h-[320px] w-full no-border">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={105}
              paddingAngle={2}
              dataKey="value"
              animationBegin={200}
              animationDuration={1500}
              stroke="none"
              strokeWidth={0}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={currentColors[index % currentColors.length]}
                  style={{ filter: "none" }}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="bottom"
              height={36}
              iconType="square"
              formatter={(value) => (
                <span className="text-[10px] font-medium text-slate-600 dark:text-slate-500 uppercase tracking-widest px-2">
                  {value}
                </span>
              )}
              wrapperStyle={{ paddingTop: "20px" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
