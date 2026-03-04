import { useReducer, useCallback } from 'react';
import type { Pokemon, PokemonType } from '../types/pokemon';
import { getMultiTypeEffectiveness } from '../data/typeMatchups';

function getStat(pokemon: Pokemon, name: string): number {
  return pokemon.stats.find(s => s.stat.name === name)?.base_stat ?? 0;
}

function getTypes(pokemon: Pokemon): PokemonType[] {
  return pokemon.types.map(t => t.type.name as PokemonType);
}

interface Fighter {
  pokemon: Pokemon;
  currentHp: number;
  maxHp: number;
}

export interface BattleState {
  player: Fighter;
  opponent: Fighter;
  log: string[];
  turn: number;
  winner: 'player' | 'opponent' | null;
  waitingForInput: boolean;
}

type BattleAction =
  | { type: 'ATTACK'; moveType: 'physical' | 'special' }
  | { type: 'RESET' };

function calcDamage(
  attacker: Pokemon,
  defender: Pokemon,
  moveType: 'physical' | 'special',
): { damage: number; effectiveness: number } {
  const atkStat = moveType === 'physical'
    ? getStat(attacker, 'attack')
    : getStat(attacker, 'special-attack');
  const defStat = moveType === 'physical'
    ? getStat(defender, 'defense')
    : getStat(defender, 'special-defense');

  const attackerType = attacker.types[0].type.name as PokemonType;
  const defenderTypes = getTypes(defender);
  const effectiveness = getMultiTypeEffectiveness(attackerType, defenderTypes);

  // Simplified damage formula inspired by Pokemon games
  // (2 * level / 5 + 2) * power * atk/def / 50 + 2, using level=50, power=80
  const base = ((2 * 50 / 5 + 2) * 80 * atkStat / defStat) / 50 + 2;
  // STAB (Same Type Attack Bonus)
  const stab = getTypes(attacker).includes(attackerType) ? 1.5 : 1;
  // Random factor 0.85-1.0
  const rand = 0.85 + Math.random() * 0.15;

  const damage = Math.max(1, Math.floor(base * stab * effectiveness * rand));
  return { damage, effectiveness };
}

function effectivenessText(eff: number): string {
  if (eff >= 2) return "It's super effective!";
  if (eff > 0 && eff < 1) return "It's not very effective...";
  if (eff === 0) return 'It had no effect!';
  return '';
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function aiChooseMove(attacker: Pokemon, defender: Pokemon): 'physical' | 'special' {
  const physDmg = calcDamage(attacker, defender, 'physical').damage;
  const specDmg = calcDamage(attacker, defender, 'special').damage;
  return specDmg > physDmg ? 'special' : 'physical';
}

function createFighter(pokemon: Pokemon): Fighter {
  const baseHp = getStat(pokemon, 'hp');
  const maxHp = baseHp * 8;
  return { pokemon, currentHp: maxHp, maxHp };
}

function battleReducer(state: BattleState, action: BattleAction): BattleState {
  if (action.type === 'RESET') {
    return {
      ...state,
      player: createFighter(state.player.pokemon),
      opponent: createFighter(state.opponent.pokemon),
      log: ['Battle started!'],
      turn: 1,
      winner: null,
      waitingForInput: true,
    };
  }

  if (action.type === 'ATTACK') {
    if (state.winner) return state;

    const playerSpeed = getStat(state.player.pokemon, 'speed');
    const opponentSpeed = getStat(state.opponent.pokemon, 'speed');
    const playerFirst = playerSpeed >= opponentSpeed;

    const newLog = [...state.log, `--- Turn ${state.turn} ---`];
    let newPlayer = { ...state.player };
    let newOpponent = { ...state.opponent };
    let winner: 'player' | 'opponent' | null = null;

    const doAttack = (
      atk: Fighter,
      def: Fighter,
      moveType: 'physical' | 'special',
      label: string,
    ): { atk: Fighter; def: Fighter } => {
      const { damage, effectiveness } = calcDamage(atk.pokemon, def.pokemon, moveType);
      const moveLabel = moveType === 'physical' ? 'Physical Attack' : 'Special Attack';
      newLog.push(
        `${label} ${capitalize(atk.pokemon.name)} used ${moveLabel}! (-${damage} HP)`
      );
      const effText = effectivenessText(effectiveness);
      if (effText) newLog.push(effText);
      const newHp = Math.max(0, def.currentHp - damage);
      return { atk, def: { ...def, currentHp: newHp } };
    };

    if (playerFirst) {
      // Player attacks first
      const r1 = doAttack(newPlayer, newOpponent, action.moveType, '🔵');
      newOpponent = r1.def;
      if (newOpponent.currentHp <= 0) {
        winner = 'player';
      } else {
        // Opponent attacks
        const aiMove = aiChooseMove(newOpponent.pokemon, newPlayer.pokemon);
        const r2 = doAttack(newOpponent, newPlayer, aiMove, '🔴');
        newPlayer = r2.def;
        if (newPlayer.currentHp <= 0) winner = 'opponent';
      }
    } else {
      // Opponent attacks first
      const aiMove = aiChooseMove(newOpponent.pokemon, newPlayer.pokemon);
      const r1 = doAttack(newOpponent, newPlayer, aiMove, '🔴');
      newPlayer = r1.def;
      if (newPlayer.currentHp <= 0) {
        winner = 'opponent';
      } else {
        // Player attacks
        const r2 = doAttack(newPlayer, newOpponent, action.moveType, '🔵');
        newOpponent = r2.def;
        if (newOpponent.currentHp <= 0) winner = 'player';
      }
    }

    if (winner) {
      const winnerName = winner === 'player' ? newPlayer.pokemon.name : newOpponent.pokemon.name;
      newLog.push(`🏆 ${capitalize(winnerName)} wins!`);
    }

    return {
      ...state,
      player: newPlayer,
      opponent: newOpponent,
      log: newLog,
      turn: state.turn + 1,
      winner,
      waitingForInput: !winner,
    };
  }

  return state;
}

export function useBattle(playerPokemon: Pokemon, opponentPokemon: Pokemon) {
  const [state, dispatch] = useReducer(battleReducer, null, () => ({
    player: createFighter(playerPokemon),
    opponent: createFighter(opponentPokemon),
    log: ['Battle started!'],
    turn: 1,
    winner: null,
    waitingForInput: true,
  }));

  const attack = useCallback((moveType: 'physical' | 'special') => {
    dispatch({ type: 'ATTACK', moveType });
  }, []);

  const reset = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, []);

  return { state, attack, reset };
}
