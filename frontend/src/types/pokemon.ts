export interface AbilityInfo {
  name: string;
}

export interface AbilityEntry {
  ability: AbilityInfo;
  is_hidden: boolean;
}

export interface TypeInfo {
  name: string;
}

export interface TypeEntry {
  type: TypeInfo;
}

export interface StatInfo {
  name: string;
}

export interface StatEntry {
  base_stat: number;
  stat: StatInfo;
}

export interface Pokemon {
  id: number;
  name: string;
  abilities: AbilityEntry[];
  types: TypeEntry[];
  stats: StatEntry[];
}

export type PokemonType =
  | 'normal' | 'fire' | 'water' | 'electric' | 'grass'
  | 'ice' | 'fighting' | 'poison' | 'ground' | 'flying'
  | 'psychic' | 'bug' | 'rock' | 'ghost' | 'dragon'
  | 'dark' | 'steel' | 'fairy';

export type StatName =
  | 'hp' | 'attack' | 'defense'
  | 'special-attack' | 'special-defense' | 'speed';

export interface BattlePokemon {
  pokemon: Pokemon;
  currentHp: number;
  maxHp: number;
}
