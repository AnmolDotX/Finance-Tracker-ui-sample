import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  category: string;
  type: TransactionType;
  description: string;
}

export type Role = 'admin' | 'viewer';

interface FinanceState {
  transactions: Transaction[];
  currentRole: Role;
  filters: {
    search: string;
    category: string;
    type: 'all' | TransactionType;
  };
  isSidebarOpen: boolean;
  // Actions
  addTransaction: (tx: Omit<Transaction, 'id'>) => void;
  updateTransaction: (id: string, tx: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
  setRole: (role: Role) => void;
  setFilters: (filters: Partial<FinanceState['filters']>) => void;
  resetFilters: () => void;
  setIsSidebarOpen: (open: boolean) => void;
}

const MOCK_DATA: Transaction[] = [
  { id: '1', date: '2024-03-01', amount: 5000, category: 'Salary', type: 'income', description: 'Monthly fixed salary' },
  { id: '2', date: '2024-03-05', amount: 120, category: 'Food', type: 'expense', description: 'Grocery shopping' },
  { id: '3', date: '2024-03-10', amount: 45, category: 'Transport', type: 'expense', description: 'Uber ride' },
  { id: '4', date: '2024-03-12', amount: 200, category: 'Shopping', type: 'expense', description: 'New headphones' },
  { id: '5', date: '2024-03-15', amount: 1500, category: 'Freelance', type: 'income', description: 'Logo design project' },
  { id: '6', date: '2024-03-18', amount: 80, category: 'Subcription', type: 'expense', description: 'Netflix & Spotify' },
  { id: '7', date: '2024-03-20', amount: 300, category: 'Utilities', type: 'expense', description: 'Electricity bill' },
];

export const useFinanceStore = create<FinanceState>()(
  persist(
    (set) => ({
      transactions: MOCK_DATA,
      currentRole: 'admin',
      filters: {
        search: '',
        category: 'all',
        type: 'all',
      },
      isSidebarOpen: false,
      addTransaction: (tx) => set((state) => ({
        transactions: [{ ...tx, id: Math.random().toString(36).substr(2, 9) }, ...state.transactions]
      })),
      updateTransaction: (id, tx) => set((state) => ({
        transactions: state.transactions.map((t) => (t.id === id ? { ...t, ...tx } : t))
      })),
      deleteTransaction: (id) => set((state) => ({
        transactions: state.transactions.filter((t) => t.id !== id)
      })),
      setRole: (role) => set({ currentRole: role }),
      setFilters: (newFilters) => set((state) => ({
        filters: { ...state.filters, ...newFilters }
      })),
      resetFilters: () => set({
        filters: { search: '', category: 'all', type: 'all' }
      }),
      setIsSidebarOpen: (open) => set({ isSidebarOpen: open }),
    }),
    {
      name: 'zorvyn-finance-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
