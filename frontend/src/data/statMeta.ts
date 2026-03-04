import type { StatName } from '../types/pokemon';

export const statColors: Record<StatName, string> = {
  hp: '#ff5959',
  attack: '#f5ac78',
  defense: '#fae078',
  'special-attack': '#9db7f5',
  'special-defense': '#a7db8d',
  speed: '#fa92b2',
};

export const statLabels: Record<StatName, string> = {
  hp: 'HP',
  attack: 'Attack',
  defense: 'Defense',
  'special-attack': 'Sp. Atk',
  'special-defense': 'Sp. Def',
  speed: 'Speed',
};
