import type { PokemonType } from '../../types/pokemon';
import { energyColors } from '../../data/typeColors';
import styles from './PokemonCard.module.css';

interface Props {
  type: PokemonType;
}

export function TypeBadge({ type }: Props) {
  const { bg, color } = energyColors[type] ?? { bg: '#888' };
  return (
    <span className={styles.typeBadge} style={{ background: bg, color: color ?? '#fff' }}>
      {type}
    </span>
  );
}
