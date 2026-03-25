export interface LLMProvider {
  chatJson<T>(input: { system: string; user: string; schemaHint: string; model?: string; timeoutMs?: number; }): Promise<T>;
}
