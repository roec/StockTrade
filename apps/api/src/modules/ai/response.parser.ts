export class ResponseParser {
  static parseJson<T>(content: string): T {
    const trimmed = content.trim().replace(/^```json/, '').replace(/```$/, '');
    return JSON.parse(trimmed) as T;
  }
}
