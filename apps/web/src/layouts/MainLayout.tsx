import { Link, Outlet } from 'react-router-dom';

const links = [
  ['/', '仪表盘'],
  ['/ai', 'AI洞察'],
  ['/stock/600519.SH', '个股详情'],
  ['/watchlist', '自选股'],
  ['/strategy', '策略工作台'],
  ['/backtest', '回测'],
  ['/settings', '设置'],
];

export function MainLayout() {
  return (
    <div className="min-h-screen grid grid-cols-[220px_1fr]">
      <aside className="border-r border-slate-800 p-4 space-y-2">
        <h1 className="font-semibold mb-3">中股决策平台</h1>
        {links.map(([to, name]) => (
          <Link key={to} to={to} className="block px-3 py-2 rounded hover:bg-slate-800">{name}</Link>
        ))}
      </aside>
      <main className="p-4 space-y-4"><Outlet /></main>
    </div>
  );
}
