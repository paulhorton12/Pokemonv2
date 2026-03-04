import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { usePokemon } from '../hooks/usePokemon';
import { SearchBar } from '../components/SearchBar';
import { PokemonCard } from '../components/PokemonCard';
import styles from './CardViewerPage.module.css';

export function CardViewerPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { pokemon, loading, error, search } = usePokemon();

  const handleSearch = (name: string) => {
    setSearchParams({ name });
    search(name);
  };

  useEffect(() => {
    const name = searchParams.get('name');
    if (name) search(name);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={styles.page}>
      <SearchBar onSearch={handleSearch} loading={loading} />
      {error && <p className={styles.error}>{error}</p>}
      {pokemon && (
        <>
          <p className={styles.flipHint}>Click card to flip</p>
          <PokemonCard pokemon={pokemon} />
        </>
      )}
    </div>
  );
}
