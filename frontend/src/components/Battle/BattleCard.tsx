import type { Pokemon, PokemonType } from '../../types/pokemon';
import { energyColors } from '../../data/typeColors';
import { HealthBar } from './HealthBar';
import styles from './Battle.module.css';

interface Props {
  pokemon: Pokemon;
  currentHp: number;
  maxHp: number;
  label: string;
}

export function BattleCard({ pokemon, currentHp, maxHp, label }: Props) {
  const artUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
  const fainted = currentHp <= 0;

  return (
    <div className={styles.battleCard}>
      <span className={styles.hpText}>{label}</span>
      <img
        className={`${styles.sprite} ${fainted ? styles.fainted : ''}`}
        src={artUrl}
        alt={pokemon.name}
      />
      <span className={styles.pokeName}>{pokemon.name}</span>
      <div className={styles.types}>
        {pokemon.types.map(t => {
          const type = t.type.name as PokemonType;
          const { bg, color } = energyColors[type] ?? { bg: '#888' };
          return (
            <span key={type} className={styles.typeBadge} style={{ background: bg, color: color ?? '#fff' }}>
              {type}
            </span>
          );
        })}
      </div>
      <HealthBar currentHp={currentHp} maxHp={maxHp} />
    </div>
  );
}
