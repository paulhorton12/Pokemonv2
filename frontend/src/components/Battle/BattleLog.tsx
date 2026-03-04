import { useEffect, useRef } from 'react';
import styles from './Battle.module.css';

interface Props {
  entries: string[];
}

export function BattleLog({ entries }: Props) {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [entries.length]);

  return (
    <div className={styles.log}>
      {entries.map((entry, i) => {
        let cls = styles.logEntry;
        if (entry.startsWith('---')) cls = styles.logTurn;
        else if (entry.includes('super effective')) cls = styles.logSuper;
        else if (entry.includes('not very effective')) cls = styles.logWeak;
        else if (entry.includes('wins')) cls = styles.logWinner;
        return <div key={i} className={cls}>{entry}</div>;
      })}
      <div ref={endRef} />
    </div>
  );
}
