import type { Pokemon } from '../types/pokemon';

export async function fetchPokemon(name: string): Promise<Pokemon> {
  const res = await fetch(`/pokemon/${encodeURIComponent(name.toLowerCase().trim())}`);
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || 'Something went wrong');
  }
  return res.json();
}
