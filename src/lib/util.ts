import { fileURLToPath, URLSearchParams } from 'url';

export const PROJECTROOT = fileURLToPath(new URL('../..', import.meta.url));

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
