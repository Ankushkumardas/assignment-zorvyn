import React from 'react';
import { useFinanceStore } from '../../store/useFinanceStore';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { formatDate } from '../../utils/dateFormatter';

const COLORS = ['#14b8a6', '#f43f5e', '#3b82f6', '#f59e0b', '#8b5cf6', '#ec4899', '#64748b'];

export const Charts = () => {
  const { transactions, theme } = useFinanceStore();


  const sortedTransactions = [...transactions].sort((a, b) => new Date(a.date) - new Date(b.date));

  const aggregatedByDate = sortedTransactions.reduce((acc, tx) => {
    const formattedDate = formatDate(tx.date, false);
    if (!acc[formattedDate]) {
      acc[formattedDate] = { name: formattedDate, Income: 0, Expense: 0 };
    }
    acc[formattedDate][tx.type] += tx.amount;
    return acc;
  }, {});


  const dynamicBarData = Object.values(aggregatedByDate).slice(-14);

  const expenses = transactions.filter(t => t.type === 'Expense');
  const expensesByCategory = expenses.reduce((acc, tx) => {
    acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
    return acc;
  }, {});

  const pieData = Object.keys(expensesByCategory).map(key => ({
    name: key,
    value: expensesByCategory[key],
  }));

  const tooltipBg = theme === 'dark' ? 'rgba(9, 9, 11, 0.8)' : 'rgba(255, 255, 255, 0.8)';
  const tooltipColor = theme === 'dark' ? '#f4f4f5' : '#09090b';

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <div className="group relative overflow-hidden transition-all duration-500 bg-white/70 dark:bg-zinc-900/50 backdrop-blur-xl border border-white/40 dark:border-white/5 rounded-2xl shadow-sm hover:shadow-xl dark:hover:shadow-none">
        <div className="absolute inset-0 bg-linear-to-br from-white/40 to-white/0 dark:from-white/5 dark:to-transparent pointer-events-none" />
        <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-6 py-5 border-b border-zinc-200/40 dark:border-zinc-800/40 z-10">
          <h3 className="text-lg font-medium tracking-tight text-zinc-900 dark:text-zinc-50">Income vs Expenses</h3>
        </div>
        <div className="relative p-6 z-10 w-full flex-1">
          <div className="h-[280px] w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dynamicBarData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: '#71717a' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: '#71717a' }} />
                <Tooltip 
                  cursor={{ fill: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)' }}
                  contentStyle={{ borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: tooltipBg, backdropFilter: 'blur(12px)', color: tooltipColor, boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ color: tooltipColor }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '13px', paddingTop: '10px' }}/>
                <Bar dataKey="Income" fill="#6366f1" radius={[6, 6, 0, 0]} maxBarSize={32} />
                <Bar dataKey="Expense" fill="#14b8a6" radius={[6, 6, 0, 0]} maxBarSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="group relative overflow-hidden transition-all duration-500 bg-white/70 dark:bg-zinc-900/50 backdrop-blur-xl border border-white/40 dark:border-white/5 rounded-2xl shadow-sm hover:shadow-xl dark:hover:shadow-none">
        <div className="absolute inset-0 bg-linear-to-br from-white/40 to-white/0 dark:from-white/5 dark:to-transparent pointer-events-none" />
        <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-6 py-5 border-b border-zinc-200/40 dark:border-zinc-800/40 z-10">
          <h3 className="text-lg font-medium tracking-tight text-zinc-900 dark:text-zinc-50">Expenses by Category</h3>
        </div>
        <div className="relative p-6 z-10 w-full flex-1">
          <div className="h-[280px] w-full mt-2">
            {pieData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={105}
                    paddingAngle={3}
                    dataKey="value"
                    stroke="none"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: tooltipBg, backdropFilter: 'blur(12px)', color: tooltipColor, boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                    itemStyle={{ color: tooltipColor }}
                  />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '13px', paddingTop: '10px' }} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-zinc-400">
                No expense data available.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
