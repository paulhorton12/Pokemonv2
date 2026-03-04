import { useState, type FormEvent } from 'react';
import styles from './SearchBar.module.css';

interface Props {
  onSearch: (name: string) => void;
  loading?: boolean;
  placeholder?: string;
}

export function SearchBar({ onSearch, loading, placeholder = 'Enter Pokemon name...' }: Props) {
  const [value, setValue] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (value.trim()) onSearch(value.trim());
  };

  return (
    <form className={styles.searchBar} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder={placeholder}
        autoFocus
      />
      <button className={styles.button} type="submit" disabled={loading}>
        {loading ? '...' : 'Search'}
      </button>
    </form>
  );
}
