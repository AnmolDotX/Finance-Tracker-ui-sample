"use client";

import { useFinanceStore } from "@/store/useFinanceStore";
import { TransactionTable } from "@/components/transactions/TransactionTable";
import { AddTransactionModal } from "@/components/transactions/AddTransactionModal";
import { Filter, Search, Plus, LayoutGrid, ShieldCheck, Eye } from "lucide-react";
import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export default function TransactionsPage() {
  const { currentRole, setRole, filters, setFilters, resetFilters } = useFinanceStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(filters.search);

  useEffect(() => {
    const handler = setTimeout(() => {
      setFilters({ search: searchTerm });
    }, 300);

    return () => clearTimeout(handler);
  }, [searchTerm, setFilters]);

  return (
    <div className="space-y-12 pb-20 no-border">
      <header className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between no-border">
        <div>
          <h1 className="text-4xl font-medium tracking-tighter text-white uppercase sm:text-5xl">
            Ledger <span className="text-slate-500">History</span>
          </h1>
          <p className="mt-4 text-[10px] font-medium uppercase tracking-[0.3em] text-slate-500">
            Comprehensive transaction logging and auditing.
          </p>
        </div>

        {currentRole === "admin" && (
          <motion.button
            whileHover={{ y: -1 }}
            whileTap={{ y: 0 }}
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center gap-3 bg-slate-100 px-10 py-5 text-[11px] font-medium uppercase tracking-[0.3em] text-slate-950 shadow-large transition-all hover:bg-white no-border"
          >
            <Plus className="h-4 w-4" />
            Add Entry
          </motion.button>
        )}
      </header>

      {/* Filter Bar */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center no-border">
        <div className="flex flex-1 items-center gap-4 bg-slate-900/40 p-4 shadow-subtle rounded-none! no-border focus-within:bg-slate-900/60 transition-all">
          <Search className="h-4 w-4 text-slate-600" />
          <input
            type="text"
            placeholder="Search by description or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-transparent text-[10px] font-medium uppercase tracking-widest text-slate-200 outline-none placeholder:text-slate-700 no-border"
          />
        </div>

        <div className="flex flex-wrap items-center gap-4 no-border">
          <div className="flex items-center gap-3 bg-slate-900/40 px-5 py-3 shadow-subtle rounded-none! no-border">
            <Filter className="h-3.5 w-3.5 text-slate-600" />
            <select
              value={filters.type}
              onChange={(e) =>
                setFilters({
                  type: e.target.value as "all" | "income" | "expense",
                })
              }
              className="bg-transparent text-[10px] font-medium uppercase tracking-widest text-slate-400 outline-none cursor-pointer no-border hover:text-white"
            >
              <option value="all" className="bg-slate-950">
                All Types
              </option>
              <option value="income" className="bg-slate-950">
                Income
              </option>
              <option value="expense" className="bg-slate-950">
                Expense
              </option>
            </select>
          </div>

          <div className="flex items-center gap-3 bg-slate-900/40 px-5 py-3 shadow-subtle rounded-none! no-border">
            <LayoutGrid className="h-3.5 w-3.5 text-slate-600" />
            <select
              value={filters.category}
              onChange={(e) => setFilters({ category: e.target.value })}
              className="bg-transparent text-[10px] font-medium uppercase tracking-widest text-slate-400 outline-none cursor-pointer no-border hover:text-white"
            >
              <option value="all" className="bg-slate-950">
                All Categories
              </option>
              <option value="Food" className="bg-slate-950">
                Food
              </option>
              <option value="Salary" className="bg-slate-950">
                Salary
              </option>
              <option value="Transport" className="bg-slate-950">
                Transport
              </option>
              <option value="Freelance" className="bg-slate-950">
                Freelance
              </option>
              <option value="Shopping" className="bg-slate-950">
                Shopping
              </option>
              <option value="Utilities" className="bg-slate-950">
                Utilities
              </option>
            </select>
          </div>

          <button
            onClick={resetFilters}
            className="text-[10px] font-medium uppercase tracking-[0.2em] text-slate-600 hover:text-white transition-colors px-4 py-2 no-border"
          >
            Reset
          </button>
        </div>

        <div className="flex h-9 items-center gap-0 bg-slate-900/50 p-0 rounded-none! no-border shadow-subtle ml-auto">
          <button
            onClick={() => setRole("admin")}
            className={cn(
              "flex items-center gap-2 px-4 py-2 text-[10px] font-medium tracking-widest uppercase transition-all duration-200 no-border",
              currentRole === "admin"
                ? "bg-slate-100 text-slate-950 shadow-medium"
                : "text-slate-500 hover:text-slate-300"
            )}
          >
            <ShieldCheck className="h-3 w-3" />
            Admin
          </button>
          <button
            onClick={() => setRole("viewer")}
            className={cn(
              "flex items-center gap-2 px-4 py-2 text-[10px] font-medium tracking-widest uppercase transition-all duration-200 no-border",
              currentRole === "viewer"
                ? "bg-slate-100 text-slate-950 shadow-medium"
                : "text-slate-500 hover:text-slate-300"
            )}
          >
            <Eye className="h-3 w-3" />
            Viewer
          </button>
        </div>
      </div>

      <section className="bg-slate-900/40 shadow-large no-border overflow-hidden rounded-none!">
        <TransactionTable />
      </section>

      <AddTransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
