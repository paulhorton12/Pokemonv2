import type { PokemonType } from '../../types/pokemon';
import { typeSymbols, energyColors } from '../../data/typeColors';
import styles from './PokemonCard.module.css';

interface Props {
  type: PokemonType;
  size?: 'sm' | 'lg';
}

export function EnergyDot({ type, size = 'sm' }: Props) {
  const { bg, color } = energyColors[type] ?? { bg: '#888' };
  const sym = typeSymbols[type] ?? '?';
  return (
    <span
      className={size === 'lg' ? styles.energyIcon : styles.energySm}
      style={{ background: bg, color: color ?? '#fff' }}
    >
      {sym}
    </span>
  );
}
