export const statusBadgeClass = (status: 'buy' | 'sell' | 'watch' | 'hold') => {
  const map = { buy: 'bg-emerald-500/20 text-emerald-300', sell: 'bg-red-500/20 text-red-300', watch: 'bg-yellow-500/20 text-yellow-300', hold: 'bg-slate-500/20 text-slate-300' };
  return `px-2 py-1 rounded text-xs ${map[status]}`;
};
