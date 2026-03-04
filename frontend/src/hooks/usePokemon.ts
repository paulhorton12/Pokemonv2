import { useState, useCallback } from 'react';
import type { Pokemon } from '../types/pokemon';
import { fetchPokemon } from '../api/pokemon';

interface UsePokemonResult {
  pokemon: Pokemon | null;
  loading: boolean;
  error: string;
  search: (name: string) => Promise<void>;
}

export function usePokemon(): UsePokemonResult {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const search = useCallback(async (name: string) => {
    if (!name.trim()) return;
    setError('');
    setPokemon(null);
    setLoading(true);
    try {
      const data = await fetchPokemon(name);
      setPokemon(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }, []);

  return { pokemon, loading, error, search };
}
