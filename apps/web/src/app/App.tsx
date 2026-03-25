import { Routes, Route } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { DashboardPage } from '../pages/DashboardPage';
import { StockDetailPage } from '../pages/StockDetailPage';
import { WatchlistPage } from '../pages/WatchlistPage';
import { StrategyWorkbenchPage } from '../pages/StrategyWorkbenchPage';
import { BacktestPage } from '../pages/BacktestPage';
import { SettingsPage } from '../pages/SettingsPage';
import { AIInsightsPage } from '../pages/AIInsightsPage';

export function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/stock/:symbol" element={<StockDetailPage />} />
        <Route path="/watchlist" element={<WatchlistPage />} />
        <Route path="/ai" element={<AIInsightsPage />} />
        <Route path="/strategy" element={<StrategyWorkbenchPage />} />
        <Route path="/backtest" element={<BacktestPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  );
}
