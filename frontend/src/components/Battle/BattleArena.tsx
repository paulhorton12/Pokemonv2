import type { Pokemon } from '../../types/pokemon';
import { useBattle } from '../../hooks/useBattle';
import { BattleCard } from './BattleCard';
import { BattleControls } from './BattleControls';
import { BattleLog } from './BattleLog';
import styles from './Battle.module.css';

interface Props {
  playerPokemon: Pokemon;
  opponentPokemon: Pokemon;
}

export function BattleArena({ playerPokemon, opponentPokemon }: Props) {
  const { state, attack, reset } = useBattle(playerPokemon, opponentPokemon);

  return (
    <div className={styles.arena}>
      <div className={styles.field}>
        <BattleCard
          pokemon={state.player.pokemon}
          currentHp={state.player.currentHp}
          maxHp={state.player.maxHp}
          label="You"
        />
        <BattleCard
          pokemon={state.opponent.pokemon}
          currentHp={state.opponent.currentHp}
          maxHp={state.opponent.maxHp}
          label="Opponent"
        />
      </div>

      <BattleControls
        onAttack={attack}
        onReset={reset}
        disabled={!state.waitingForInput}
        gameOver={state.winner !== null}
      />

      <BattleLog entries={state.log} />
    </div>
  );
}
