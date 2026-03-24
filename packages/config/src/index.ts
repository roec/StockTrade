export interface EnvConfig {
  deepseekApiBase: string;
  deepseekApiKey: string;
  deepseekModel: string;
  deepseekTimeoutMs: number;
}

export const defaultEnvConfig: EnvConfig = {
  deepseekApiBase: process.env.DEEPSEEK_API_BASE ?? 'https://api.deepseek.com/v1',
  deepseekApiKey: process.env.DEEPSEEK_API_KEY ?? '',
  deepseekModel: process.env.DEEPSEEK_MODEL ?? 'deepseek-chat',
  deepseekTimeoutMs: Number(process.env.DEEPSEEK_TIMEOUT_MS ?? '20000'),
};
