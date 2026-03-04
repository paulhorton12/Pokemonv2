import styles from './Battle.module.css';

interface Props {
  onAttack: (moveType: 'physical' | 'special') => void;
  onReset: () => void;
  disabled: boolean;
  gameOver: boolean;
}

export function BattleControls({ onAttack, onReset, disabled, gameOver }: Props) {
  return (
    <div className={styles.controls}>
      {!gameOver ? (
        <>
          <button
            className={`${styles.atkBtn} ${styles.physical}`}
            onClick={() => onAttack('physical')}
            disabled={disabled}
          >
            Physical Attack
          </button>
          <button
            className={`${styles.atkBtn} ${styles.special}`}
            onClick={() => onAttack('special')}
            disabled={disabled}
          >
            Special Attack
          </button>
        </>
      ) : (
        <button className={styles.resetBtn} onClick={onReset}>
          Rematch
        </button>
      )}
    </div>
  );
}
