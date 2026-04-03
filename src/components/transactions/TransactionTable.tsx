"use client";

import { useFinanceStore } from "@/store/useFinanceStore";
import { formatCurrency, formatDate, cn } from "@/lib/utils";
import { Trash2, MoreHorizontal, Edit2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function TransactionTable() {
  const { transactions, currentRole, deleteTransaction, filters } =
    useFinanceStore();

  const filteredTransactions = transactions.filter((t) => {
    const matchesSearch =
      t.description.toLowerCase().includes(filters.search.toLowerCase()) ||
      t.category.toLowerCase().includes(filters.search.toLowerCase());
    const matchesType = filters.type === "all" || t.type === filters.type;
    const matchesCategory =
      filters.category === "all" || t.category === filters.category;

    return matchesSearch && matchesType && matchesCategory;
  });

  if (filteredTransactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-20 text-center no-border">
        <div className="h-16 w-16 bg-white dark:bg-slate-900 flex items-center justify-center rounded-none! no-border mb-6 shadow-subtle">
          <MoreHorizontal className="h-6 w-6 text-slate-500 dark:text-slate-700" />
        </div>
        <h3 className="text-xl font-medium text-slate-900 dark:text-white uppercase tracking-tight">
          Empty Data
        </h3>
        <p className="mt-2 text-[11px] uppercase tracking-widest text-slate-500 max-w-xs">
          Adjust parameters or add entries.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto no-border pb-4">
      <table className="w-full min-w-[800px] text-left no-border">
        <thead className="no-border">
          <tr className="bg-slate-200/50 dark:bg-slate-900/50 no-border">
            <th className="px-8 py-4 text-[10px] font-medium uppercase tracking-widest text-slate-800 dark:text-slate-500">
              Date
            </th>
            <th className="px-8 py-4 text-[10px] font-medium uppercase tracking-widest text-slate-800 dark:text-slate-500">
              Description
            </th>
            <th className="px-8 py-4 text-[10px] font-medium uppercase tracking-widest text-slate-800 dark:text-slate-500">
              Category
            </th>
            <th className="px-8 py-4 text-[10px] font-medium uppercase tracking-widest text-slate-800 dark:text-slate-500">
              Status
            </th>
            <th className="px-8 py-4 text-[10px] font-medium uppercase tracking-widest text-slate-500 text-right">
              Amount
            </th>
            {currentRole === "admin" && (
              <th className="px-8 py-4 text-[10px] font-medium uppercase tracking-widest text-slate-800 dark:text-slate-500 text-right">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-900/5 dark:divide-white/3 no-border">
          <AnimatePresence>
            {filteredTransactions.map((tx, idx) => (
              <motion.tr
                key={tx.id}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.99 }}
                transition={{ duration: 0.2, delay: idx * 0.02 }}
                className="group hover:bg-slate-100/30 dark:hover:bg-white/1 transition-colors no-border"
              >
                <td className="px-8 py-5 text-xs font-normal text-slate-500 uppercase tracking-widest">
                  {formatDate(tx.date)}
                </td>
                <td className="px-8 py-5 no-border">
                  <p className="text-sm font-medium text-slate-800 dark:text-slate-100">
                    {tx.description}
                  </p>
                </td>
                <td className="px-8 py-5 no-border">
                  <span className="inline-flex items-center bg-slate-200 dark:bg-slate-900 px-3 py-1 text-[9px] font-medium uppercase tracking-widest text-slate-700 dark:text-slate-400 rounded-none! no-border shadow-subtle">
                    {tx.category}
                  </span>
                </td>
                <td className="px-8 py-5 no-border">
                  <div
                    className={cn(
                      "flex items-center gap-2 text-[10px] font-medium uppercase tracking-widest",
                      tx.type === "income"
                        ? "text-slate-800 dark:text-slate-100"
                        : "text-slate-500",
                    )}
                  >
                    {tx.type}
                  </div>
                </td>
                <td
                  className={cn(
                    "px-8 py-5 text-right text-sm font-medium tracking-tight no-border",
                    tx.type === "income" ? "text-slate-900 dark:text-white" : "text-slate-600 dark:text-slate-200",
                  )}
                >
                  {tx.type === "expense" ? "-" : ""}
                  {formatCurrency(tx.amount)}
                </td>
                {currentRole === "admin" && (
                  <td className="px-8 py-5 text-right no-border">
                    <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-all duration-150 no-border">
                      <button className="flex h-8 w-8 items-center justify-center bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 rounded-none! no-border shadow-subtle hover:shadow-medium transition-all">
                        <Edit2 className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => deleteTransaction(tx.id)}
                        className="flex h-8 w-8 items-center justify-center bg-red-50 dark:bg-slate-800/50 text-red-600 dark:text-slate-500 hover:bg-red-500/10 hover:text-red-500 dark:hover:text-red-400 rounded-none! no-border shadow-subtle hover:shadow-medium transition-all"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                )}
              </motion.tr>
            ))}
          </AnimatePresence>
        </tbody>
      </table>
    </div>
  );
}
