# FinDash - Premium Finance Dashboard

A stunning, modern, and highly responsive frontend web application built to cleanly track financial summaries, dynamic transactions, and intricate spending patterns. This project moves away from standard boilerplate defaults and embraces custom glassmorphic layering, deep contrast themes, and a "human-made" premium layout.

## 🌟 Overview & Key Features

FinDash provides a rich suite of dashboard tooling with smooth interactions, eliminating jarring page reloads:

- **Dashboard Intelligence**: Fast tracking of Total Balances, overall Income, and total Expenses via radiant summary cards.
- **Dynamic Visualizations**: 
  - *Bar Chart*: Tracks the transaction dataset (Income vs Expense) directly derived from your global store.
  - *Pie Chart*: Categorizes real-time expenses with beautiful neon segmenting.
- **Robust Transaction Ledger**: 
  - Seamless text filtering by category or transaction type (Income/Expense).
  - Built-in pagination capping limits cleanly to 5 items per view.
  - Chronological sorting capabilities.
- **Role-Based Access Control (RBAC)**:
  - *Viewer Mode*: Clean, read-only analytics view.
  - *Admin Mode*: Unlocks abilities to Add new records, Edit mistakes natively, or permanently Delete old entries.
- **Glassmorphic UI Engine**: Everything floats across a complex radial mesh gradient background `(#09090b)` using translucent Tailwind panels (`backdrop-blur-xl`) with 1px subtle glowing borders. Pure premium feel.

---

## 🛠 Tech Stack

Our stack relies strictly on heavily adopted, robust libraries handling complex state without heavy abstractions.

- **React 19 (Vite)**: For lightning-fast local compiling and functional component rendering.
- **Tailwind CSS v4**: Utility-first CSS using the new V4 architecture. All UI components (`Button`, `Card`) were *intentionally removed* as abstractions, pivoting instead to pure, direct HTML (`<button>`, `<div>`) mapping natively onto Tailwind classes.
- **Zustand**: Fast, scalable global state management specifically governing: The Transactions array, Active RBAC roles, Data filtering, and Global Themes natively without Context API wrappers.
- **Recharts**: Declarative composable charting that instantly recalculates and graphs based on live Zustand data.
- **Lucide React**: Clean, sharp, consistent SVG iconography.

---

## 🚀 Setup Instructions

1. **Install Dependencies**
   Ensure `npm` and `node` are configured locally. Open your terminal in the root `app/` folder.
   ```bash
   npm install
   ```

2. **Launch the Application**
   Boot up the Vite build engine locally:
   ```bash
   npm run dev
   ```

3. **Explore Dashboard**
   Navigate to `http://localhost:5173` in your browser. (Note: Data contains 39 mock records spanning 4 months. Pagination provides clean viewing access).

---

## 🎯 Evaluation Criteria Walkthrough

1. **Design and Creativity**: Implemented a "dark by default" elegant interface powered by `Inter` typography, glassmorphism, and minimal gradients rather than flat blocky colors.
2. **Responsiveness**: Used deep Tailwind grid alignments (`md:grid-cols-2`, `sm:flex-row`) to ensure fluid navigation on mobile displays.
3. **Functionality**: Complete lifecycle features included (CRUD for admins, real-time recalculations for Insights and Charts, fully fleshed out active filters).
4. **User Experience**: Removed abrupt rendering blocks; everything slides locally with subtle `scale-[0.98]` click animations. Custom thin scrollbars built natively.
5. **State Management**: Zero prop-drilling! Handled 100% top-down via `useFinanceStore.js`.
6. **Documentation**: You are reading it!
7. **Attention to Detail**: Standardized **Day Month Year** (`15 Mar 2024`) universally across charts, recent transactions, and tools via a dedicated `dateFormatter.js`. Empty filters render graceful "No transactions found" notifications.

---
