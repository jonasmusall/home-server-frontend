import { fileURLToPath, URLSearchParams } from 'url';

export const PROJECTROOT = fileURLToPath(new URL('../..', import.meta.url));

export function urlQueryToObject(query: string): { [key: string]: string | undefined } {
  const entries = new URLSearchParams(query).entries();
  const result = {} as { [key: string]: string };
  for (const [key, value] of entries) {
    result[key] = value;
  }
  return result;
}

export async function postJson(uri: string, body: string) {
  return await fetch(
    uri,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body
    }
  );
}
