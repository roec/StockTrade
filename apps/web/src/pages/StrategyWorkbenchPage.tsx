import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api';

export function StrategyWorkbenchPage() {
  const { data } = useQuery({ queryKey: ['strategies'], queryFn: async () => (await api.get('/strategies')).data });
  return <div className="card"><h2 className="text-xl font-semibold mb-2">策略工作台</h2><p className="text-sm mb-2">支持趋势跟随 / 短线波段 / 反弹捕捉 / 量价突破等模板。</p><pre className="text-xs">{JSON.stringify(data, null, 2)}</pre></div>;
}
