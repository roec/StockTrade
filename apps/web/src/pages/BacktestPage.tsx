import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api';

export function BacktestPage() {
  const { data } = useQuery({ queryKey: ['backtest-demo'], queryFn: async () => (await api.post('/backtest/run', { symbol: '600519.SH' })).data });
  return <div className="card"><h2 className="text-xl font-semibold mb-2">策略回测</h2><pre className="text-xs">{JSON.stringify(data?.metrics ?? {}, null, 2)}</pre></div>;
}
