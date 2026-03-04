import type { PokemonType } from '../types/pokemon';

export const typeSymbols: Record<PokemonType, string> = {
  normal: 'N', fire: 'R', water: 'W', electric: 'L', grass: 'G',
  ice: 'I', fighting: 'F', poison: 'P', ground: 'D', flying: 'C',
  psychic: 'M', bug: 'B', rock: 'K', ghost: 'H', dragon: 'N',
  dark: 'D', steel: 'S', fairy: 'Y',
};

export const energyColors: Record<PokemonType, { bg: string; color?: string }> = {
  normal:   { bg: '#a8a878' },
  fire:     { bg: '#f08030' },
  water:    { bg: '#6890f0' },
  electric: { bg: '#f8d030', color: '#333' },
  grass:    { bg: '#78c850' },
  ice:      { bg: '#98d8d8', color: '#333' },
  fighting: { bg: '#c03028' },
  poison:   { bg: '#a040a0' },
  ground:   { bg: '#e0c068', color: '#333' },
  flying:   { bg: '#a890f0' },
  psychic:  { bg: '#f85888' },
  bug:      { bg: '#a8b820' },
  rock:     { bg: '#b8a038' },
  ghost:    { bg: '#705898' },
  dragon:   { bg: '#7038f8' },
  dark:     { bg: '#705848' },
  steel:    { bg: '#b8b8d0', color: '#333' },
  fairy:    { bg: '#ee99ac' },
};

export const cardGradients: Record<PokemonType, string> = {
  normal:   'linear-gradient(145deg, #c8c8a8, #a8a878, #c8c8a8)',
  fire:     'linear-gradient(145deg, #f8a860, #f08030, #f8a860)',
  water:    'linear-gradient(145deg, #98b8f8, #6890f0, #98b8f8)',
  electric: 'linear-gradient(145deg, #fae878, #f8d030, #fae878)',
  grass:    'linear-gradient(145deg, #a0e078, #78c850, #a0e078)',
  ice:      'linear-gradient(145deg, #c0f0f0, #98d8d8, #c0f0f0)',
  fighting: 'linear-gradient(145deg, #e05848, #c03028, #e05848)',
  poison:   'linear-gradient(145deg, #c060c0, #a040a0, #c060c0)',
  ground:   'linear-gradient(145deg, #f0d888, #e0c068, #f0d888)',
  flying:   'linear-gradient(145deg, #c8b8f8, #a890f0, #c8b8f8)',
  psychic:  'linear-gradient(145deg, #f880a8, #f85888, #f880a8)',
  bug:      'linear-gradient(145deg, #c0d048, #a8b820, #c0d048)',
  rock:     'linear-gradient(145deg, #d0c058, #b8a038, #d0c058)',
  ghost:    'linear-gradient(145deg, #9878b8, #705898, #9878b8)',
  dragon:   'linear-gradient(145deg, #9060f8, #7038f8, #9060f8)',
  dark:     'linear-gradient(145deg, #907868, #705848, #907868)',
  steel:    'linear-gradient(145deg, #d0d0e8, #b8b8d0, #d0d0e8)',
  fairy:    'linear-gradient(145deg, #f8c0cc, #ee99ac, #f8c0cc)',
};
