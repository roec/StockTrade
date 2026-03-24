import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { statusBadgeClass } from '@stock/ui';
import { api } from '../services/api';

export function StockDetailPage() {
  const { symbol = '600519.SH' } = useParams();
  const { data } = useQuery({ queryKey: ['signal', symbol], queryFn: async () => (await api.get(`/signals/${symbol}`)).data });
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">{symbol} 个股详情</h2>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="card"><h3>K线与量能面板（占位）</h3><p className="text-sm mt-2">可接入轻量图表库实现模块化图表架构。</p></div>
        <div className="card"><h3>信号卡</h3><span className={statusBadgeClass(data?.signal?.direction ?? 'hold')}>{data?.signal?.direction ?? 'hold'}</span><pre className="text-xs mt-2">{JSON.stringify(data?.signal?.breakdown ?? {}, null, 2)}</pre></div>
        <div className="card"><h3>解释性拆解</h3><pre className="text-xs mt-2">{JSON.stringify(data?.signal?.explainability ?? {}, null, 2)}</pre></div>
        <div className="card"><h3>AI解读</h3><p className="text-sm">AI用于解释，不作为唯一决策依据。</p></div>
      </div>
    </div>
  );
}
