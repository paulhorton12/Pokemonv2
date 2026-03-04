import type { PokemonType } from '../../types/pokemon';
import { EnergyDot } from './EnergyDot';
import styles from './PokemonCard.module.css';

interface Props {
  energyType: PokemonType;
  energyCount: number;
  name: string;
  description?: string;
  damage?: number;
}

export function MoveRow({ energyType, energyCount, name, description, damage }: Props) {
  return (
    <>
      <div className={styles.divider} />
      <div className={styles.moveRow}>
        <div className={styles.moveEnergy}>
          {Array.from({ length: energyCount }, (_, i) => (
            <EnergyDot key={i} type={energyType} />
          ))}
        </div>
        <div className={styles.moveInfo}>
          <div className={styles.moveName}>{name}</div>
          {description && <div className={styles.moveDesc}>{description}</div>}
        </div>
        <div className={styles.moveDamage}>{damage ?? ''}</div>
      </div>
    </>
  );
}
