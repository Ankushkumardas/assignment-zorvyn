import React, { useState, useEffect } from 'react';
import { useFinanceStore } from './store/useFinanceStore';
import { Navbar } from './components/layout/Navbar';
import { SummaryCards } from './components/dashboard/SummaryCards';
import { Charts } from './components/dashboard/Charts';
import { TransactionList } from './components/transactions/TransactionList';
import { Insights } from './components/insights/Insights';
import { AddTransactionModal } from './components/transactions/AddTransactionModal';

function App() {
  const { theme } = useFinanceStore();
  const [modalState, setModalState] = useState({ isOpen: false, transaction: null });


  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const openAddModal = () => setModalState({ isOpen: true, transaction: null });
  const openEditModal = (transaction) => setModalState({ isOpen: true, transaction });
  const closeModal = () => setModalState({ isOpen: false, transaction: null });

  return (
    <div className="min-h-screen pb-12">
      <Navbar onAddClick={openAddModal} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 mt-8 space-y-8 animate-in fade-in duration-500">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight mb-6">Dashboard Overview</h1>
          <SummaryCards />
        </div>
        
        <Charts />
        
        <Insights />
        
        <TransactionList onEditClick={openEditModal} />
      </main>

      <AddTransactionModal 
        isOpen={modalState.isOpen} 
        onClose={closeModal}
        editTransaction={modalState.transaction} 
      />
    </div>
  );
}

export default App;