import { useState } from 'react';
import { usePokemon } from '../hooks/usePokemon';
import { SearchBar } from '../components/SearchBar';
import { BattleArena } from '../components/Battle/BattleArena';
import styles from './BattlePage.module.css';

export function BattlePage() {
  const player = usePokemon();
  const opponent = usePokemon();
  const [battleStarted, setBattleStarted] = useState(false);

  const canBattle = player.pokemon && opponent.pokemon && !player.loading && !opponent.loading;

  return (
    <div className={styles.page}>
      <div className={styles.selectors}>
        <div className={styles.selectorCol}>
          <h3 className={styles.label}>Your Pokemon</h3>
          <SearchBar
            onSearch={name => { setBattleStarted(false); player.search(name); }}
            loading={player.loading}
            placeholder="Your Pokemon..."
          />
          {player.error && <p className={styles.error}>{player.error}</p>}
          {player.pokemon && <p className={styles.selected}>{player.pokemon.name}</p>}
        </div>
        <div className={styles.vs}>VS</div>
        <div className={styles.selectorCol}>
          <h3 className={styles.label}>Opponent</h3>
          <SearchBar
            onSearch={name => { setBattleStarted(false); opponent.search(name); }}
            loading={opponent.loading}
            placeholder="Opponent Pokemon..."
          />
          {opponent.error && <p className={styles.error}>{opponent.error}</p>}
          {opponent.pokemon && <p className={styles.selected}>{opponent.pokemon.name}</p>}
        </div>
      </div>

      {canBattle && !battleStarted && (
        <button className={styles.startBtn} onClick={() => setBattleStarted(true)}>
          Start Battle!
        </button>
      )}

      {battleStarted && player.pokemon && opponent.pokemon && (
        <BattleArena playerPokemon={player.pokemon} opponentPokemon={opponent.pokemon} />
      )}
    </div>
  );
}
