import { useState } from 'react';
import type { Pokemon } from '../../types/pokemon';
import { CardFront } from './CardFront';
import { CardBack } from './CardBack';
import styles from './PokemonCard.module.css';

interface Props {
  pokemon: Pokemon;
}

export function PokemonCard({ pokemon }: Props) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className={`${styles.cardWrapper} ${flipped ? styles.flipped : ''}`}
      onClick={() => setFlipped(f => !f)}
    >
      <div className={styles.cardFlipper}>
        <div className={styles.cardFace}>
          <CardFront pokemon={pokemon} />
        </div>
        <div className={`${styles.cardFace} ${styles.cardBack}`}>
          <CardBack pokemon={pokemon} />
        </div>
      </div>
    </div>
  );
}
