import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api';

export function WatchlistPage() {
  const { data } = useQuery({ queryKey: ['watchlists'], queryFn: async () => (await api.get('/watchlists')).data });
  return <div className="card"><h2 className="text-xl font-semibold mb-2">自选股管理</h2><pre className="text-xs">{JSON.stringify(data, null, 2)}</pre></div>;
}
