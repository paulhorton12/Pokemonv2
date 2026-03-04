import type { Pokemon, PokemonType, StatName } from '../../types/pokemon';
import { cardGradients } from '../../data/typeColors';
import { TypeBadge } from './TypeBadge';
import { StatBar } from './StatBar';
import styles from './PokemonCard.module.css';

interface Props {
  pokemon: Pokemon;
}

export function CardBack({ pokemon }: Props) {
  const primaryType = pokemon.types[0].type.name as PokemonType;
  const artUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
  const total = pokemon.stats.reduce((sum, s) => sum + s.base_stat, 0);

  return (
    <div className={styles.cardOuter} style={{ background: cardGradients[primaryType] }}>
      <div className={styles.backInner}>
        <div className={styles.backHeader}>
          <img className={styles.backSprite} src={artUrl} alt={pokemon.name} />
          <div className={styles.backTitleArea}>
            <div className={styles.backName}>{pokemon.name}</div>
            <div className={styles.backTypes}>
              {pokemon.types.map(t => (
                <TypeBadge key={t.type.name} type={t.type.name as PokemonType} />
              ))}
            </div>
          </div>
        </div>

        <div className={styles.sectionLabel}>Base Stats</div>
        <div className={styles.statsGrid}>
          {pokemon.stats.map(s => (
            <StatBar
              key={s.stat.name}
              name={s.stat.name as StatName}
              value={s.base_stat}
            />
          ))}
        </div>

        <div className={styles.backTotal}>
          <div className={styles.totalLabel}>Total</div>
          <div className={styles.totalValue}>{total}</div>
        </div>
      </div>
    </div>
  );
}
