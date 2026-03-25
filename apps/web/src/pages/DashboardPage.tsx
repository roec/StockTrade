import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api';

export function DashboardPage() {
  const { data } = useQuery({ queryKey: ['overview'], queryFn: async () => (await api.get('/market/overview')).data });
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">市场总览</h2>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="card"><h3>大盘指数</h3><pre className="text-xs mt-2">{JSON.stringify(data?.indices ?? [], null, 2)}</pre></div>
        <div className="card"><h3>量价异动摘要</h3><pre className="text-xs mt-2">{JSON.stringify(data?.volumeAnomalySummary ?? [], null, 2)}</pre></div>
        <div className="card"><h3>AI市场摘要</h3><p className="text-sm mt-2">当前风险中性，结构性机会为主，注意高位放量滞涨。</p></div>
      </div>
    </div>
  );
}
