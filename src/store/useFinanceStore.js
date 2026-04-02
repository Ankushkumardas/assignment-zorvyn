import { create } from 'zustand';
import { MOCK_TRANSACTIONS } from '../utils/mockData';

export const useFinanceStore = create((set, get) => ({
  transactions: MOCK_TRANSACTIONS,
  role: 'Admin',
  
  searchTerm: '',
  typeFilter: 'All',
  categoryFilter: 'All',
  sortBy: 'date-desc',
  
  theme: 'dark',
  

  setRole: (role) => set({ role }),
  toggleTheme: () => set((state) => {
    const newTheme = state.theme === 'light' ? 'dark' : 'light';
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    return { theme: newTheme };
  }),
  
  addTransaction: (transaction) => set((state) => ({
    transactions: [{ ...transaction, id: `tx-${Date.now()}` }, ...state.transactions]
  })),

  updateTransaction: (id, updatedData) => set((state) => ({
    transactions: state.transactions.map((tx) => 
      tx.id === id ? { ...tx, ...updatedData } : tx
    )
  })),

  deleteTransaction: (id) => set((state) => ({
    transactions: state.transactions.filter(t => t.id !== id)
  })),
  
  setSearchTerm: (term) => set({ searchTerm: term }),
  setTypeFilter: (type) => set({ typeFilter: type, categoryFilter: 'All' }),
  setCategoryFilter: (category) => set({ categoryFilter: category }),
  setSortBy: (sort) => set({ sortBy: sort }),
  
}));
