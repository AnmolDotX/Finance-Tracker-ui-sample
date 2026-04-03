"use client";

import { useFinanceStore, TransactionType } from "@/store/useFinanceStore";
import { X, DollarSign, Calendar, Tag, Type as TypeIcon } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddTransactionModal({ isOpen, onClose }: AddTransactionModalProps) {
  const { addTransaction } = useFinanceStore();
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    category: "Food",
    type: "expense" as TransactionType,
    date: new Date().toISOString().split("T")[0],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.description || !formData.amount) return;

    addTransaction({
      description: formData.description,
      amount: parseFloat(formData.amount),
      category: formData.category,
      type: formData.type,
      date: formData.date,
    });
    
    setFormData({
      description: "",
      amount: "",
      category: "Food",
      type: "expense",
      date: new Date().toISOString().split("T")[0],
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 bg-slate-900 p-10 shadow-large rounded-none! no-border"
          >
            <div className="flex items-center justify-between mb-10 no-border">
              <h2 className="text-2xl font-medium text-white uppercase tracking-tight">Add Transaction</h2>
              <button 
                onClick={onClose} 
                className="bg-slate-800 p-2 text-slate-500 hover:text-white transition-colors rounded-none! no-border shadow-subtle"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8 no-border">
              <div className="space-y-3 no-border">
                <label className="text-[10px] font-medium uppercase tracking-[0.2em] text-slate-500">Description</label>
                <div className="flex h-12 items-center gap-3 bg-black/40 px-4 shadow-subtle focus-within:bg-black/60 transition-all rounded-none! no-border">
                  <TypeIcon className="h-4 w-4 text-slate-600" />
                  <input
                    type="text"
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="E.g., Transaction Details"
                    className="flex-1 bg-transparent text-sm text-slate-200 outline-none placeholder:text-slate-700 no-border"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 no-border">
                 <div className="space-y-3 no-border">
                  <label className="text-[10px] font-medium uppercase tracking-[0.2em] text-slate-500">Amount</label>
                  <div className="flex h-12 items-center gap-3 bg-black/40 px-4 shadow-subtle focus-within:bg-black/60 transition-all rounded-none! no-border">
                    <DollarSign className="h-4 w-4 text-slate-600" />
                    <input
                      type="number"
                      required
                      step="0.01"
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                      placeholder="0.00"
                      className="flex-1 bg-transparent text-sm text-slate-200 outline-none no-border"
                    />
                  </div>
                </div>

                <div className="space-y-3 no-border">
                  <label className="text-[10px] font-medium uppercase tracking-[0.2em] text-slate-500">Date</label>
                  <div className="flex h-12 items-center gap-3 bg-black/40 px-4 shadow-subtle focus-within:bg-black/60 transition-all rounded-none! no-border">
                    <Calendar className="h-4 w-4 text-slate-600" />
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="flex-1 bg-transparent text-sm text-slate-200 outline-none scheme-dark no-border"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3 no-border">
                <label className="text-[10px] font-medium uppercase tracking-[0.2em] text-slate-500">Category</label>
                <div className="flex h-12 items-center gap-3 bg-black/40 px-4 shadow-subtle rounded-none! no-border focus-within:bg-black/60">
                  <Tag className="h-4 w-4 text-slate-600" />
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="flex-1 bg-transparent text-sm text-slate-200 outline-none cursor-pointer no-border"
                  >
                    <option value="Food" className="bg-slate-900">Food</option>
                    <option value="Salary" className="bg-slate-900">Salary</option>
                    <option value="Transport" className="bg-slate-900">Transport</option>
                    <option value="Shopping" className="bg-slate-900">Shopping</option>
                    <option value="Freelance" className="bg-slate-900">Freelance</option>
                    <option value="Utilities" className="bg-slate-900">Utilities</option>
                  </select>
                </div>
              </div>

               <div className="grid grid-cols-2 gap-0 no-border">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, type: "income" })}
                    className={cn(
                      "flex h-12 items-center justify-center gap-2 text-[10px] font-medium uppercase tracking-widest transition-all duration-150 no-border",
                      formData.type === "income" 
                        ? "bg-slate-100 text-slate-950 shadow-medium" 
                        : "bg-slate-900/50 text-slate-600 hover:text-slate-400"
                    )}
                  >
                    Income
                  </button>
                   <button
                    type="button"
                    onClick={() => setFormData({ ...formData, type: "expense" })}
                    className={cn(
                      "flex h-12 items-center justify-center gap-2 text-[10px] font-medium uppercase tracking-widest transition-all duration-150 no-border",
                      formData.type === "expense" 
                        ? "bg-slate-100 text-slate-950 shadow-medium" 
                        : "bg-slate-900/50 text-slate-600 hover:text-slate-400"
                    )}
                  >
                    Expense
                  </button>
               </div>

              <motion.button
                whileHover={{ y: -1 }}
                whileTap={{ y: 0 }}
                type="submit"
                className="mt-6 flex w-full items-center justify-center bg-slate-100 py-5 text-[11px] font-medium uppercase tracking-[0.3em] text-slate-950 shadow-large hover:bg-white transition-all no-border"
              >
                Confirm Entry
              </motion.button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
