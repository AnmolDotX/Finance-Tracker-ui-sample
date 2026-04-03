# Zorvyn Finance Dashboard

A premium, interactive finance dashboard built with **Next.js 16**, **Tailwind CSS v4**, and **Zustand**. Designed for clarity, elegance, and actionable insights.

## ✨ Key Features

- **📊 Comprehensive Financial Overview**: Real-time summary of balance, income, and expenses with trend indicators.
- **📈 Interactive Visualizations**: High-fidelity charts (Balance Trend, Spending Breakdown) powered by Recharts.
- **💸 Transaction Management**: Sophisticated list view with advanced filtering by category, type, and search.
- **🛡️ Basic RBAC (Role-Based Access Control)**: 
  - **Admin**: Full control to add, edit, or delete transactions.
  - **Viewer**: Read-only access to dashboard and transaction history.
  - *Switch roles instantly using the toggle in the top bar for demonstration.*
- **💡 Smart Insights**: Automated analysis of spending patterns, top expense categories, and savings rates.
- **🚀 Ultra-Premium UI**: Glassmorphic design, smooth animations (via `motion`), and a vibrant dark-mode aesthetic.
- **💾 Local Persistence**: All data is automatically saved to your browser's local storage.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **State Management**: [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction)
- **Visuals**: [Recharts](https://recharts.org/)
- **Animations**: [Motion](https://motion.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 🏁 Getting Started

### Prerequisites
- [Node.js 20+](https://nodejs.org/)
- [pnpm 10+](https://pnpm.io/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd zorvyn-finance
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Run the development server:**
   ```bash
   pnpm dev
   ```

4. **Open the app:**
   Navigate to [http://localhost:3000](http://localhost:3000).

## 📂 Project Structure

- `src/app`: Page routes and global styles.
- `src/components`: UI components organized by feature (layout, dashboard, transactions).
- `src/store`: Zustand store for global state logic.
- `src/lib`: Shared utilities and formatters.

## 📝 Assignment Requirements Fulfilled

- [x] Dashboard Overview (Summary Cards, Trend Chart, Category Chart)
- [x] Transactions Section (List, Details, Filtering/Search)
- [x] Basic Role Based UI (Admin vs Viewer simulation)
- [x] Insights Section (Spending analysis)
- [x] State Management (Zustand + Local Storage)
- [x] UI/UX Expectations (Responsive, Clean, Modern)
- [x] Extra Polish (Animations, Glassmorphism, Premium Gradient Theme)
