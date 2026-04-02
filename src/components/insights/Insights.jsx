import React from 'react';
import { useFinanceStore } from '../../store/useFinanceStore';
import { Lightbulb, TrendingDown, AlertCircle } from 'lucide-react';
import { formatDate } from '../../utils/dateFormatter';

export const Insights = () => {
  const transactions = useFinanceStore((state) => state.transactions);

  const expenses = transactions.filter(t => t.type === 'Expense');
  const expensesByCategory = expenses.reduce((acc, tx) => {
    acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
    return acc;
  }, {});

  const highestCategory = Object.keys(expensesByCategory).reduce((a, b) => 
    (expensesByCategory[a] || 0) > (expensesByCategory[b] || 0) ? a : b
  , '');

  const biggestExpense = expenses.reduce((prev, current) => 
    (prev.amount > current.amount) ? prev : current
  , { amount: 0 });

  const totalIncome = transactions.filter(t => t.type === 'Income').reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = expenses.reduce((sum, t) => sum + t.amount, 0);
  const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpense) / totalIncome * 100).toFixed(1) : 0;

  return (
    <div className="group relative overflow-hidden transition-all duration-500 mt-8 border border-indigo-200/40 dark:border-indigo-500/20 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/10 backdrop-blur-xl shadow-sm hover:shadow-xl dark:hover:shadow-none">
      <div className="absolute inset-0 bg-linear-to-br from-indigo-500/5 to-indigo-500/0 dark:from-indigo-500/5 dark:to-transparent pointer-events-none" />
      <div className="relative z-10 px-6 py-5 pb-2">
        <h3 className="text-lg font-medium tracking-tight flex items-center gap-2 text-indigo-900 dark:text-indigo-300">
          <Lightbulb className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />
          Financial Insights
        </h3>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/80 dark:bg-zinc-900/80 p-5 rounded-2xl border border-indigo-100/50 dark:border-indigo-900/50 hover:shadow-xs transition-shadow">
            <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-400 font-medium mb-1">
              <TrendingDown className="h-4 w-4" />
              Highest Spending Category
            </div>
            <p className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">{highestCategory || 'N/A'}</p>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              ${expensesByCategory[highestCategory]?.toLocaleString() || 0} total
            </p>
          </div>

          <div className="bg-white/80 dark:bg-zinc-900/80 p-5 rounded-2xl border border-indigo-100/50 dark:border-indigo-900/50 hover:shadow-xs transition-shadow">
            <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-400 font-medium mb-1">
              <AlertCircle className="h-4 w-4" />
              Largest Single Expense
            </div>
            <p className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">${biggestExpense.amount.toLocaleString()}</p>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              {biggestExpense.category || 'N/A'} {biggestExpense.date ? `on ${formatDate(biggestExpense.date)}` : ''}
            </p>
          </div>

          <div className="bg-white/80 dark:bg-zinc-900/80 p-5 rounded-2xl border border-indigo-100/50 dark:border-indigo-900/50 hover:shadow-xs transition-shadow">
            <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-400 font-medium mb-1">
              <Lightbulb className="h-4 w-4" />
              Savings Rate
            </div>
            <p className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">{savingsRate}%</p>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              {savingsRate > 20 ? 'Great job saving!' : 'Try to reduce expenses.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
