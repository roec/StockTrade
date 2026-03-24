export class PromptBuilder {
  static explainSignal(input: Record<string, unknown>) {
    return {
      system: '你是A股交易决策支持系统中的解释引擎，必须透明、保守、风险优先。',
      user: `请解释以下信号并给出风险提示，缺失数据必须声明：${JSON.stringify(input)}`,
      schemaHint: '{summary:string, positives:string[], negatives:string[], riskWarnings:string[], confidenceComment:string}',
    };
  }
}
