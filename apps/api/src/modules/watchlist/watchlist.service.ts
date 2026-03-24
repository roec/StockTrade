import { Injectable } from '@nestjs/common';

interface Watchlist { id: string; name: string; symbols: string[]; type: '自选股' | '策略池' | '候选池'; }

@Injectable()
export class WatchlistService {
  private readonly data: Watchlist[] = [{ id: 'wl-core', name: '核心观察', symbols: ['600519.SH', '000001.SZ'], type: '自选股' }];
  list() { return this.data; }
  create(payload: Omit<Watchlist, 'id'>) {
    const created = { id: `wl-${Date.now()}`, ...payload };
    this.data.push(created);
    return created;
  }
  update(id: string, payload: Partial<Omit<Watchlist, 'id'>>) {
    const w = this.data.find((item) => item.id === id);
    if (!w) return null;
    Object.assign(w, payload);
    return w;
  }
  remove(id: string) {
    const idx = this.data.findIndex((x) => x.id === id);
    if (idx >= 0) this.data.splice(idx, 1);
    return { ok: idx >= 0 };
  }
}
