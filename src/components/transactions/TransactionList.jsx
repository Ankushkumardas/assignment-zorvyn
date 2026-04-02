import React, { useState } from 'react';
import { useFinanceStore } from '../../store/useFinanceStore';
import { CATEGORIES } from '../../utils/mockData';
import { Search, Trash2, Edit2, ArrowUpRight, ArrowDownRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { formatDate } from '../../utils/dateFormatter';

export const TransactionList = ({ onEditClick }) => {
  const { 
    transactions, role, deleteTransaction, 
    searchTerm, setSearchTerm, 
    typeFilter, setTypeFilter, 
    categoryFilter, setCategoryFilter 
  } = useFinanceStore();

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');
  

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredTransactions = transactions.filter(tx => {
    const matchesSearch = tx.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'All' || tx.type === typeFilter;
    const matchesCategory = categoryFilter === 'All' || tx.category === categoryFilter;
    return matchesSearch && matchesType && matchesCategory;
  });

  const availableCategories = typeFilter === 'All' 
    ? [...CATEGORIES.Income, ...CATEGORIES.Expense]
    : CATEGORIES[typeFilter];

  const uniqueCategories = [...new Set(availableCategories)];

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const sortedAndFilteredTransactions = [...filteredTransactions].sort((a, b) => {
    let aVal = a[sortField];
    let bVal = b[sortField];

    if (sortField === 'date') {
      aVal = new Date(aVal).getTime();
      bVal = new Date(bVal).getTime();
    }

    if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });


  const totalPages = Math.ceil(sortedAndFilteredTransactions.length / itemsPerPage);
  const paginatedTransactions = sortedAndFilteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );


  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, typeFilter, categoryFilter, sortField, sortDirection]);

  return (
    <div className="group relative overflow-hidden mt-8 transition-all duration-500 bg-white/70 dark:bg-zinc-900/50 backdrop-blur-xl border border-white/40 dark:border-white/5 rounded-2xl shadow-sm hover:shadow-xl dark:hover:shadow-none">
      <div className="absolute inset-0 bg-linear-to-br from-white/40 to-white/0 dark:from-white/5 dark:to-transparent pointer-events-none" />
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-6 py-5 border-b border-zinc-200/40 dark:border-zinc-800/40">
        <h3 className="text-lg font-medium tracking-tight text-zinc-900 dark:text-zinc-50">Recent Transactions</h3>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
            <input 
              type="text" 
              placeholder="Search category..." 
              className="pl-9 pr-4 py-2 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-md border border-zinc-200/50 dark:border-zinc-800/50 focus:border-zinc-300 dark:focus:border-zinc-600 rounded-xl text-sm outline-none transition-all w-full sm:w-64 dark:text-zinc-50"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative">
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)} 
              className="inline-flex items-center justify-center font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 disabled:pointer-events-none disabled:opacity-50 rounded-xl active:scale-[0.98] border border-zinc-200 dark:border-zinc-700/50 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-100 h-10 px-4 py-2 gap-2 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md"
            >
              {/* <Filter className="h-4 w-4" /> */}
              <span className="hidden sm:inline">Filter</span>
            </button>
            
            {isFilterOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-2xl border border-zinc-200/50 dark:border-zinc-800 rounded-xl shadow-2xl p-4 z-50">
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1.5 block">Type</label>
                    <select 
                      className="w-full bg-zinc-50/50 dark:bg-zinc-950/50 border border-zinc-200/50 dark:border-zinc-800/50 rounded-lg px-3 py-2 text-sm outline-none dark:text-zinc-50"
                      value={typeFilter}
                      onChange={(e) => setTypeFilter(e.target.value)}
                    >
                      <option value="All">All Types</option>
                      <option value="Income">Income</option>
                      <option value="Expense">Expense</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1.5 block">Category</label>
                    <select 
                      className="w-full bg-zinc-50/50 dark:bg-zinc-950/50 border border-zinc-200/50 dark:border-zinc-800/50 rounded-lg px-3 py-2 text-sm outline-none dark:text-zinc-50"
                      value={categoryFilter}
                      onChange={(e) => setCategoryFilter(e.target.value)}
                    >
                      <option value="All">All Categories</option>
                      {uniqueCategories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-zinc-500 dark:text-zinc-400 bg-zinc-50/50 dark:bg-zinc-900/50 border-b border-zinc-100 dark:border-zinc-800">
            <tr>
              <th className="px-6 py-4 font-medium">Transaction</th>
              <th className="px-6 py-4 font-medium cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors" onClick={() => handleSort('category')}>
                <div className="flex items-center gap-1">Category {sortField === 'category' && (sortDirection === 'asc' ? '↑' : '↓')}</div>
              </th>
              <th className="px-6 py-4 font-medium cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors" onClick={() => handleSort('date')}>
                <div className="flex items-center gap-1 pl-6">Date {sortField === 'date' && (sortDirection === 'asc' ? '↑' : '↓')}</div>
              </th>
              <th className="px-6 py-4 font-medium text-right cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors" onClick={() => handleSort('amount')}>
                <div className="flex items-center justify-end gap-1">Amount {sortField === 'amount' && (sortDirection === 'asc' ? '↑' : '↓')}</div>
              </th>
              {role === 'Admin' && <th className="px-6 py-4 font-medium text-right">Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/80">
            {paginatedTransactions.length > 0 ? (
              paginatedTransactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl border ${tx.type === 'Income' ? 'bg-teal-50 dark:bg-teal-500/10 border-teal-100 dark:border-teal-500/20 text-teal-600 dark:text-teal-400' : 'bg-rose-50 dark:bg-rose-500/10 border-rose-100 dark:border-rose-500/20 text-rose-600 dark:text-rose-400'}`}>
                        {tx.type === 'Income' ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                      </div>
                      <span className="font-medium text-zinc-900 dark:text-zinc-200">{tx.type}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-zinc-600 dark:text-zinc-400">{tx.category}</td>
                  <td className="px-6 py-4 text-zinc-600 dark:text-zinc-400 pl-6">{formatDate(tx.date)}</td>
                  <td className={`px-6 py-4 text-right font-medium ${tx.type === 'Income' ? 'text-teal-600 dark:text-teal-400' : 'text-zinc-900 dark:text-zinc-100'}`}>
                    {tx.type === 'Income' ? '+' : '-'}${tx.amount.toLocaleString()}
                  </td>
                  {role === 'Admin' && (
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => onEditClick(tx)}
                          className="p-2 text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 rounded-lg transition-colors"
                          title="Edit transaction"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => deleteTransaction(tx.id)}
                          className="p-2 text-zinc-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg transition-colors"
                          title="Delete transaction"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={role === 'Admin' ? 5 : 4} className="px-6 py-12 text-center text-zinc-500 dark:text-zinc-400">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Filter className="h-8 w-8 text-zinc-300 dark:text-zinc-600" />
                    <p>No transactions found matching your criteria.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {totalPages > 1 && (
        <div className="px-6 py-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Showing <span className="font-medium text-zinc-900 dark:text-zinc-100">{((currentPage - 1) * itemsPerPage) + 1}</span> to <span className="font-medium text-zinc-900 dark:text-zinc-100">{Math.min(currentPage * itemsPerPage, sortedAndFilteredTransactions.length)}</span> of <span className="font-medium text-zinc-900 dark:text-zinc-100">{sortedAndFilteredTransactions.length}</span> results
          </p>
          <div className="flex gap-2">
            <button 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="inline-flex items-center justify-center font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 disabled:pointer-events-none disabled:opacity-50 rounded-xl active:scale-[0.98] border border-zinc-200 dark:border-zinc-700 bg-transparent hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-100 h-9 px-3 text-sm gap-1"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Previous</span>
            </button>
            <button 
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="inline-flex items-center justify-center font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 disabled:pointer-events-none disabled:opacity-50 rounded-xl active:scale-[0.98] border border-zinc-200 dark:border-zinc-700 bg-transparent hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-100 h-9 px-3 text-sm gap-1"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
