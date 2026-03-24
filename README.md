# China Stock Trading Decision Support Platform

> 生产级导向、可扩展的A股交易决策支持平台（非自动交易机器人）。

## 产品定位
- 混合模式：规则引擎 + 量化打分 + AI解释 + 人工决策。
- 支持A股研究工作流：行情、指标、量价、信号、回测、风险、解释、观察池。
- AI（DeepSeek）为**辅助解释层**，不是唯一决策者。

## 架构概览
Monorepo（pnpm workspace + turbo）：
- `apps/web`: React + TypeScript + Vite + Tailwind + Zustand + TanStack Query
- `apps/api`: NestJS + REST + WebSocket + Prisma + Redis接入预留
- `packages/indicator-engine`: 指标计算引擎（纯TS）
- `packages/signal-engine`: 信号、风险、回测指标计算
- `packages/shared-types`: 前后端共享类型
- `packages/shared-utils`: 公共数学工具
- `packages/ui`: 轻量UI共享工具
- `packages/config`: 环境配置抽象

## 已实现核心模块
### 前端页面
- Dashboard（市场总览、量价异动、AI摘要）
- StockDetail（报价、信号、解释拆解、AI提示）
- Watchlist（自选池/策略池）
- Strategy Workbench（策略模板与匹配预览）
- Backtest（回测结果指标展示）
- AIInsights（AI解释独立页面）
- Settings（数据源、DeepSeek、风险与主题配置）

### 后端模块
- `market-data`: 行情、K线、市场总览、股票搜索
- `market-stream`: WebSocket订阅骨架（quote/kline）
- `signals`: 指标+信号评估、冲突检测
- `strategies`: 策略模板与评估
- `backtest`: 回测骨架与指标
- `watchlist`: CRUD
- `sentiment`: 情绪快照（mock）
- `ai`: PromptBuilder / Provider抽象 / DeepSeekProvider / Mock fallback / ResponseParser
- `risk`: 止损止盈、仓位建议
- `settings`, `health`
- `indicators`, `broker`, `portfolio`, `audit`, `auth`, `users`, `config` 预留模块

## DeepSeek 集成
- OpenAI兼容SDK + 可配置Base URL
- 环境变量：
  - `DEEPSEEK_API_BASE`
  - `DEEPSEEK_API_KEY`
  - `DEEPSEEK_MODEL`（`deepseek-chat` / `deepseek-reasoner`）
  - `DEEPSEEK_TIMEOUT_MS`
- JSON输出模式（`response_format: json_object`）
- 超时与失败降级到Mock Provider
- 提示词结构化输入（signal context + 风险要素）

## 指标与规则引擎
`packages/indicator-engine` 已包含：
- MA / EMA / SMA
- MACD(DIFF/DEA/HIST)
- KDJ
- BOLL
- PSY
- DMI(PDI/MDI/ADX/ADXR)
- BIAS
- SAR

`packages/signal-engine` 已包含：
- 透明打分维度：trend/momentum/volume/reversal/sentiment/risk/regime
- 输出：direction/confidence/reasonCodes/riskTags/止损止盈/仓位/conflicts
- 回测指标：总收益、年化、最大回撤、胜率、Sharpe、交易数、平均持仓、Profit Factor

## 数据与持久化
- Prisma schema 包含：
  - users
  - watchlists
  - strategy configs
  - user settings
  - AI analysis history
  - signal history
  - backtest jobs
  - sentiment snapshots
  - audit records

## API 概览
- `GET /api/market/overview`
- `GET /api/market/quote/:symbol`
- `GET /api/market/klines/:symbol`
- `GET /api/stocks/search`
- `GET/POST/PATCH/DELETE /api/watchlists`
- `GET /api/strategies`
- `POST /api/strategies/evaluate`
- `POST /api/backtest/run`
- `GET /api/backtest/:id`
- `GET /api/signals/:symbol`
- `POST /api/risk/evaluate`
- `POST /api/ai/analyze-stock`
- `POST /api/ai/explain-signal`
- `POST /api/ai/compare-stocks`

WebSocket namespace: `market-stream`
- `subscribeQuotes`
- `subscribeKlines`

## 本地运行
```bash
pnpm install
cp .env.example .env
docker compose up -d
pnpm --filter @stock/api prisma:generate
pnpm dev
```

## 如何替换 Mock 为真实数据源
1. 在 `apps/api/src/providers/market-provider.interface.ts` 保持接口不变。
2. 新建真实Provider（如Tushare/券商行情网关适配器）。
3. 在 `market-data.module.ts` 切换依赖注入实现。
4. 增加缓存、熔断、限流、重试与健康检查。

## 测试
- 指标计算
- 信号与风险计算
- 回测指标
- API返回结构
- AI解析器

## 路线图（节选）
- 接入真实A股行情供应商（REST + WS）
- Redis实时分发、节流、去重
- BrokerProvider下单风控与审计闭环
- 用户与权限系统
- 组合、持仓、资金曲线可视化
- 事件总线与任务队列（回测/AI任务）

## 安全声明
本系统仅用于交易决策支持与研究，不构成任何收益承诺或投资建议。请结合自身风险承受能力独立判断。
