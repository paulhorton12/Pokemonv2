import { useEffect, useState } from 'react';
import type { StatName } from '../../types/pokemon';
import { statColors, statLabels } from '../../data/statMeta';
import styles from './PokemonCard.module.css';

interface Props {
  name: StatName;
  value: number;
}

export function StatBar({ name, value }: Props) {
  const [width, setWidth] = useState(0);
  const pct = Math.min(100, (value / 255) * 100);
  const color = statColors[name] ?? '#8888cc';
  const label = statLabels[name] ?? name;

  useEffect(() => {
    // Animate after mount
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setWidth(pct));
    });
  }, [pct]);

  return (
    <div className={styles.statRow}>
      <span className={styles.statLabel}>{label}</span>
      <span className={styles.statValue}>{value}</span>
      <div className={styles.statBarTrack}>
        <div
          className={styles.statBarFill}
          style={{ width: `${width}%`, background: color }}
        />
      </div>
    </div>
  );
}
