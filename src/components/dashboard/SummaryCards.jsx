import React from 'react';
import { useFinanceStore } from '../../store/useFinanceStore';
import { Wallet, TrendingUp, TrendingDown } from 'lucide-react';

export const SummaryCards = () => {
  const transactions = useFinanceStore((state) => state.transactions);

  const { income, expense } = transactions.reduce(
    (acc, tx) => {
      if (tx.type === 'Income') acc.income += tx.amount;
      if (tx.type === 'Expense') acc.expense += tx.amount;
      return acc;
    },
    { income: 0, expense: 0 }
  );

  const balance = income - expense;

  const cards = [
    {
      title: 'Current Balance',
      amount: balance,
      icon: Wallet,
      color: 'text-zinc-700 dark:text-zinc-300',
      bgColor: 'bg-zinc-100 dark:bg-zinc-800',
    },
    {
      title: 'Total Income',
      amount: income,
      icon: TrendingUp,
      color: 'text-emerald-700 dark:text-emerald-400',
      bgColor: 'bg-emerald-50 dark:bg-emerald-950/30',
    },
    {
      title: 'Total Expenses',
      amount: expense,
      icon: TrendingDown,
      color: 'text-rose-700 dark:text-rose-400',
      bgColor: 'bg-rose-50 dark:bg-rose-950/30',
    },
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {cards.map((card, idx) => (
        <div 
          key={idx} 
          className="group relative overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-xl dark:hover:shadow-none bg-white/70 dark:bg-zinc-900/50 backdrop-blur-xl border border-white/40 dark:border-white/5 rounded-2xl"
        >
          {/* Subtle gradient glow effect on absolute background */}
          <div className="absolute inset-0 bg-linear-to-br from-white/40 to-white/0 dark:from-white/5 dark:to-transparent pointer-events-none" />
          
          <div className="relative p-5 sm:p-6 z-10 w-full h-full flex flex-col justify-between">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-2">{card.title}</p>
                <h3 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                  {formatCurrency(card.amount)}
                </h3>
              </div>
              <div className={`p-3 rounded-2xl ${card.bgColor} mt-1`}>
                <card.icon className={`h-5 w-5 ${card.color}`} strokeWidth={2.5} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
