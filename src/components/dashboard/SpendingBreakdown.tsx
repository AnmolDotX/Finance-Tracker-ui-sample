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

const COLORS = [
  "#f1f5f9", // Slate-100
  "#cbd5e1", // Slate-300
  "#94a3b8", // Slate-400
  "#64748b", // Slate-500
  "#475569", // Slate-600
  "#334155", // Slate-700
  "#1e293b", // Slate-800
];

interface TooltipProps {
  active?: boolean;
  payload?: any[];
}

const CustomTooltip = ({ active, payload }: TooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 px-6 py-4 shadow-large rounded-none! no-border">
        <p className="text-[10px] font-medium text-slate-500 uppercase tracking-widest mb-1">
          {payload[0].name}
        </p>
        <p className="text-xl font-medium text-white">
          {formatCurrency(payload[0].value)}
        </p>
      </div>
    );
  }
  return null;
};

export function SpendingBreakdown() {
  const { transactions } = useFinanceStore();

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
      className="bg-slate-900/40 p-10 shadow-medium rounded-none! no-border hover:bg-slate-900/60 transition-all duration-200"
    >
      <div className="mb-10 items-center justify-between flex no-border">
        <div>
          <h3 className="text-xl font-medium tracking-tight text-white uppercase">
            Spending Breakdown
          </h3>
          <p className="text-[10px] font-medium text-slate-500 uppercase tracking-widest mt-1">
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
                  fill={COLORS[index % COLORS.length]}
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
                <span className="text-[10px] font-medium text-slate-500 uppercase tracking-widest px-2">
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
