import styles from './Battle.module.css';

interface Props {
  currentHp: number;
  maxHp: number;
}

export function HealthBar({ currentHp, maxHp }: Props) {
  const pct = Math.max(0, (currentHp / maxHp) * 100);
  const colorClass = pct > 50 ? styles.hpHigh : pct > 20 ? styles.hpMid : styles.hpLow;

  return (
    <div className={styles.healthBarWrap}>
      <div className={styles.healthLabel}>
        <span className={styles.hpText}>HP</span>
        <span className={styles.hpNumbers}>{currentHp} / {maxHp}</span>
      </div>
      <div className={styles.healthTrack}>
        <div
          className={`${styles.healthFill} ${colorClass}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
