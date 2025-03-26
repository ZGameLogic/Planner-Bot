export async function bodyToJson<T>(response: Response): Promise<T> {
  const res = await response;
  const text = await res.text();
  const formattedText = text.replace(/("[^"]*"\s*:\s*)(\d{18,})/g, '$1"$2"');
  return JSON.parse(formattedText) as T;
}
