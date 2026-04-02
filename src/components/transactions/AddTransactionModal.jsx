import React, { useState, useEffect } from 'react';
import { useFinanceStore } from '../../store/useFinanceStore';
import { CATEGORIES } from '../../utils/mockData';
import { X } from 'lucide-react';

export const AddTransactionModal = ({ isOpen, onClose, editTransaction }) => {
  const { addTransaction, updateTransaction } = useFinanceStore();
  
  const defaultState = {
    amount: '',
    type: 'Expense',
    category: CATEGORIES.Expense[0],
    date: new Date().toISOString().split('T')[0]
  };

  const [formData, setFormData] = useState(defaultState);

  useEffect(() => {
    if (editTransaction) {
      setFormData({
        amount: editTransaction.amount,
        type: editTransaction.type,
        category: editTransaction.category,
        date: editTransaction.date
      });
    } else {
      setFormData(defaultState);
    }
  }, [editTransaction, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.amount || isNaN(formData.amount)) return;
    
    if (editTransaction) {
      updateTransaction(editTransaction.id, {
        amount: parseFloat(formData.amount),
        type: formData.type,
        category: formData.category,
        date: formData.date
      });
    } else {
      addTransaction({
        amount: parseFloat(formData.amount),
        type: formData.type,
        category: formData.category,
        date: formData.date
      });
    }
    
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-transparent dark:bg-transparent backdrop-blur-2xl z-50 flex items-center justify-center p-4 transition-all">
      <div className="absolute inset-0 bg-black/20 dark:bg-black/60 transition-opacity" onClick={onClose} />
      <div className="relative bg-white/80 dark:bg-zinc-900/60 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200 border border-white/40 dark:border-white/10 z-10">
        <div className="flex justify-between items-center p-6 border-b border-zinc-100 dark:border-zinc-800/80">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 tracking-tight">
            {editTransaction ? 'Edit Transaction' : 'New Transaction'}
          </h2>
          <button onClick={onClose} className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors bg-zinc-100/50 dark:bg-zinc-800 p-2 rounded-full">
            <X className="h-4 w-4" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Transaction Type</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className={`py-2 px-4 rounded-xl border text-sm font-medium transition-all ${formData.type === 'Expense' ? 'bg-zinc-900 dark:bg-zinc-100 border-zinc-900 dark:border-zinc-100 text-white dark:text-zinc-900 shadow-sm' : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800'}`}
                  onClick={() => setFormData({ ...formData, type: 'Expense', category: CATEGORIES.Expense[0] })}
                >
                  Expense
                </button>
                <button
                  type="button"
                  className={`py-2 px-4 rounded-xl border text-sm font-medium transition-all ${formData.type === 'Income' ? 'bg-zinc-900 dark:bg-zinc-100 border-zinc-900 dark:border-zinc-100 text-white dark:text-zinc-900 shadow-sm' : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800'}`}
                  onClick={() => setFormData({ ...formData, type: 'Income', category: CATEGORIES.Income[0] })}
                >
                  Income
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Amount</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 font-medium">$</span>
                <input
                  type="number"
                  step="0.01"
                  required
                  className="w-full pl-9 pr-4 py-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 focus:border-zinc-400 dark:focus:border-zinc-600 rounded-xl text-sm outline-none transition-all dark:text-white"
                  placeholder="0.00"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Category</label>
              <select
                className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 focus:border-zinc-400 dark:focus:border-zinc-600 rounded-xl text-sm outline-none transition-all dark:text-white"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                {CATEGORIES[formData.type].map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Date</label>
              <input
                type="date"
                required
                className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 focus:border-zinc-400 dark:focus:border-zinc-600 rounded-xl text-sm outline-none transition-all dark:text-white"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </div>
          </div>

          <div className="pt-4 flex gap-3">
            <button type="button" className="flex-1 inline-flex items-center justify-center font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 disabled:pointer-events-none disabled:opacity-50 rounded-xl active:scale-[0.98] bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-700 h-10 px-4 py-2" onClick={onClose}>Cancel</button>
            <button type="submit" className="flex-1 inline-flex items-center justify-center font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 disabled:pointer-events-none disabled:opacity-50 rounded-xl active:scale-[0.98] bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 shadow-sm h-10 px-4 py-2">
              {editTransaction ? 'Save Changes' : 'Add Record'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
