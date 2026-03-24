import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api';

export function AIInsightsPage() {
  const { data } = useQuery({
    queryKey: ['ai-insights'],
    queryFn: async () => (await api.post('/ai/explain-signal', { symbol: '600519.SH', context: 'teaching-mode' })).data,
  });
  return <div className="card"><h2 className="text-xl font-semibold mb-2">AI决策辅助</h2><pre className="text-xs">{JSON.stringify(data, null, 2)}</pre></div>;
}
