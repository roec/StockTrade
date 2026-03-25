import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api';

export function SettingsPage() {
  const { data } = useQuery({ queryKey: ['settings'], queryFn: async () => (await api.get('/settings')).data });
  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-2">系统设置</h2>
      <p className="text-sm mb-2">数据源、WebSocket/Poll、DeepSeek模型、超时重试、策略默认参数、风险默认参数、主题设置。</p>
      <pre className="text-xs">{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
