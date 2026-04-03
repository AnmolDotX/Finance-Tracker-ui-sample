"use client";

import { useFinanceStore } from "@/store/useFinanceStore";
import { formatCurrency } from "@/lib/utils";
import { 
  TrendingUp, 
  Target, 
  Zap, 
  PieChart, 
  ArrowUpRight,
  Sparkles
} from "lucide-react";
import { motion } from "motion/react";

export default function InsightsPage() {
  const { transactions } = useFinanceStore();

  const expenses = transactions.filter((t) => t.type === "expense");
  const income = transactions.filter((t) => t.type === "income");

  const totalExpense = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const totalIncome = income.reduce((acc, curr) => acc + curr.amount, 0);
  
  const categoryTotals = expenses.reduce((acc: Record<string, number>, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
    return acc;
  }, {});

  const topCategory = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0] || ["None", 0];

  const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpense) / totalIncome) * 100 : 0;

  const insights = [
    {
      title: "Top Category",
      value: topCategory[0],
      detail: `${formatCurrency(topCategory[1] as number)} Total`,
      icon: PieChart,
      color: "slate",
      strategy: "Optimizing expenditure...",
    },
    {
      title: "Savings Ratio",
      value: `${savingsRate.toFixed(1)}%`,
      detail: "Gross Margin",
      icon: Target,
      color: "slate",
      strategy: "Retention strategy active",
    },
    {
      title: "Revenue Growth",
      value: "+15.4%",
      detail: "MoM Variance",
      icon: TrendingUp,
      color: "slate",
      strategy: "Scaling in progress",
    },
    {
      title: "Daily Burn",
      value: formatCurrency(totalExpense / 30),
      detail: "Operational Expense",
      icon: Zap,
      color: "slate",
      strategy: "Stabilized performance",
    },
  ];

  return (
    <div className="space-y-12 pb-20 no-border">
      <header className="no-border">
        <h1 className="text-4xl font-medium tracking-tighter text-white uppercase sm:text-5xl">
          Analytical <span className="text-slate-500">Insights</span>
        </h1>
        <p className="mt-4 text-[10px] font-medium uppercase tracking-[0.3em] text-slate-500">
          Strategic data interpretation for financial efficiency.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 no-border">
        {insights.map((insight, idx) => (
          <motion.div
            key={insight.title}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
            className="group relative overflow-hidden bg-slate-900/40 p-10 shadow-large rounded-none! no-border"
          >
            <div className="flex items-center gap-6 no-border">
              <div className="flex h-12 w-12 items-center justify-center bg-slate-900/80 shadow-subtle rounded-none! no-border">
                <insight.icon className="h-6 w-6 text-slate-100" />
              </div>
              <div className="flex-1 no-border">
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-slate-500">
                  {insight.title}
                </p>
                <div className="flex items-baseline gap-4 no-border">
                   <h3 className="text-3xl font-medium text-white tracking-tight uppercase mt-1">{insight.value}</h3>
                   <span className="text-[9px] font-medium uppercase tracking-widest text-slate-600">{insight.detail}</span>
                </div>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between border-none bg-slate-950/20 p-4 shadow-subtle rounded-none!">
              <div className="flex items-center gap-3">
                <Sparkles className="h-3.5 w-3.5 text-slate-600" />
                <span className="text-[10px] font-medium uppercase tracking-widest text-slate-400">{insight.strategy}</span>
              </div>
              <ArrowUpRight className="h-4 w-4 text-slate-700 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </div>

            <div className="absolute top-0 right-0 h-1/2 w-1/4 bg-slate-100/1 -skew-x-12 translate-x-10 no-border" />
          </motion.div>
        ))}
      </div>

      <section className="bg-slate-100/3 p-px rounded-none! no-border">
         <div className="bg-slate-950 p-12 lg:p-16 rounded-none! no-border shadow-large">
            <div className="flex flex-col lg:flex-row items-center gap-16 no-border">
               <div className="flex-1 no-border">
                  <h2 className="text-4xl font-medium text-white leading-tight uppercase tracking-tighter">
                    Financial <span className="text-slate-500">Advisory</span> <br/> 
                    Protocol Alpha
                  </h2>
                  <p className="mt-8 text-sm text-slate-500 max-w-xl leading-relaxed font-normal">
                    Operational audit complete. Expense variance detected in <span className="text-white font-medium">{topCategory[0]}</span> exceeds baseline by 12%. Strategic reduction of 10% will yield <span className="text-slate-100 font-medium">{formatCurrency(240)}</span> in monthly liquidity.
                  </p>
                  <motion.button 
                    whileHover={{ y: -1 }}
                    className="mt-12 bg-slate-100 px-10 py-5 text-[11px] font-medium uppercase tracking-[0.3em] text-slate-950 shadow-large hover:bg-white transition-all no-border"
                  >
                    Export Full Audit
                  </motion.button>
               </div>
               <div className="relative w-full max-w-sm lg:max-w-md no-border">
                   <div className="relative bg-slate-900/40 p-10 aspect-video flex items-center justify-center rounded-none! no-border shadow-large">
                       <Zap className="h-16 w-16 text-slate-100 opacity-20" />
                       <div className="absolute inset-0 bg-linear-to-t from-slate-950 to-transparent opacity-80" />
                       <p className="absolute bottom-6 left-6 text-[9px] font-medium text-slate-500 uppercase tracking-[0.4em]">
                          Analysis Protocol Ready
                       </p>
                   </div>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
}
