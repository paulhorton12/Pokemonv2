import type { Pokemon, PokemonType } from '../../types/pokemon';
import { cardGradients } from '../../data/typeColors';
import { weaknessMap, resistanceMap } from '../../data/typeMatchups';
import { EnergyDot } from './EnergyDot';
import { MoveRow } from './MoveRow';
import styles from './PokemonCard.module.css';

function getStat(pokemon: Pokemon, name: string): number {
  return pokemon.stats.find(s => s.stat.name === name)?.base_stat ?? 0;
}

function capitalize(s: string): string {
  return s.replace(/\b\w/g, c => c.toUpperCase());
}

interface Props {
  pokemon: Pokemon;
}

export function CardFront({ pokemon }: Props) {
  const primaryType = pokemon.types[0].type.name as PokemonType;
  const secondaryType = pokemon.types[1]?.type.name as PokemonType | undefined;
  const artUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
  const pokeNum = String(pokemon.id).padStart(3, '0');
  const typesText = pokemon.types.map(t => t.type.name).join('/');
  const hp = getStat(pokemon, 'hp');

  const atk = getStat(pokemon, 'attack');
  const spAtk = getStat(pokemon, 'special-attack');
  const bestAtk = Math.max(atk, spAtk);
  const atkType = secondaryType ?? primaryType;
  const energyCost = bestAtk >= 100 ? 3 : bestAtk >= 60 ? 2 : 1;

  const weakType = weaknessMap[primaryType];
  const resistType = resistanceMap[primaryType];

  const speed = getStat(pokemon, 'speed');
  const retreatCount = speed >= 100 ? 1 : speed >= 50 ? 2 : 3;

  return (
    <div className={styles.cardOuter} style={{ background: cardGradients[primaryType] }}>
      <div className={styles.cardInner}>
        <div className={styles.cardHeader}>
          <span className={styles.cardStage}>Basic</span>
          <span className={styles.cardName}>{pokemon.name}</span>
          <span className={styles.cardHp}>
            HP <span className={styles.cardHpValue}>{hp}</span>
          </span>
          <EnergyDot type={primaryType} size="lg" />
        </div>

        <div className={styles.artFrame}>
          <img src={artUrl} alt={pokemon.name} />
        </div>

        <div className={styles.infoLine}>
          NO. {pokeNum}  {capitalize(typesText)} Pokemon
        </div>

        {pokemon.abilities.length > 0 && (
          <MoveRow
            energyType={primaryType}
            energyCount={1}
            name={pokemon.abilities[0].ability.name.replace('-', ' ')}
            description={pokemon.abilities[0].is_hidden ? 'Hidden ability' : 'Ability'}
          />
        )}

        <MoveRow
          energyType={atkType}
          energyCount={energyCost}
          name={`${capitalize(primaryType)} Strike`}
          damage={Math.round(bestAtk / 3) * 10}
        />

        <div className={styles.cardBottom}>
          <div className={styles.bottomSection}>
            <div className={styles.bottomLabel}>weakness</div>
            <div className={styles.bottomValue}>
              {weakType ? <><EnergyDot type={weakType} /> x2</> : '—'}
            </div>
          </div>
          <div className={styles.bottomSection}>
            <div className={styles.bottomLabel}>resistance</div>
            <div className={styles.bottomValue}>
              {resistType ? <><EnergyDot type={resistType} /> -30</> : '—'}
            </div>
          </div>
          <div className={styles.bottomSection}>
            <div className={styles.bottomLabel}>retreat</div>
            <div className={styles.bottomValue}>
              {Array.from({ length: retreatCount }, (_, i) => (
                <EnergyDot key={i} type="normal" />
              ))}
            </div>
          </div>
        </div>

        <div className={styles.cardFooter}>
          <span className={styles.footerId}>{pokeNum} / 1025</span>
          <span>{capitalize(pokemon.name)} — {capitalize(typesText)} Type</span>
        </div>
      </div>
    </div>
  );
}
