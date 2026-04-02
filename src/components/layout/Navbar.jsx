import React from 'react';
import { useFinanceStore } from '../../store/useFinanceStore';
import { Plus, Shield, Eye, Moon, Sun } from 'lucide-react';

export const Navbar = ({ onAddClick }) => {
  const { role, setRole, theme, toggleTheme } = useFinanceStore();

  return (
    <nav className="sticky top-0 z-40 w-full bg-white/40 dark:bg-[#09090b]/60 backdrop-blur-2xl supports-backdrop-filter:bg-white/20 border-b border-zinc-200/40 dark:border-zinc-800/40 px-6 py-3 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl font-extrabold tracking-tighter text-zinc-900 dark:text-zinc-50">FinDash.</span>
          {role === 'Admin' && (
            <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/20">
              Admin Mode
            </span>
          )}
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <button 
            onClick={toggleTheme} 
            className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 transition-colors"
            aria-label="Toggle dark mode"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <div className="flex bg-zinc-100/80 dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800 p-1 rounded-xl">
            <button
              onClick={() => setRole('Viewer')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${role === 'Viewer' ? 'bg-white dark:bg-zinc-800 shadow-sm text-zinc-900 dark:text-zinc-100' : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300'}`}
            >
              <Eye className="h-4 w-4" />
              <span className="hidden sm:inline">Viewer</span>
            </button>
            <button
              onClick={() => setRole('Admin')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${role === 'Admin' ? 'bg-white dark:bg-zinc-800 shadow-sm text-zinc-900 dark:text-zinc-100' : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300'}`}
            >
              <Shield className="h-4 w-4" />
              <span className="hidden sm:inline">Admin</span>
            </button>
          </div>

          {role === 'Admin' && (
            <button onClick={onAddClick} className="hidden sm:flex items-center justify-center gap-2 font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 disabled:pointer-events-none disabled:opacity-50 rounded-xl active:scale-[0.98] bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 shadow-sm h-10 px-4 py-2">
              <Plus className="h-4 w-4" />
              New Entry
            </button>
          )}
          {role === 'Admin' && (
            <button onClick={onAddClick} className="sm:hidden flex items-center justify-center font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 disabled:pointer-events-none disabled:opacity-50 rounded-xl active:scale-[0.98] bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 shadow-sm h-10 w-10">
              <Plus className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};
