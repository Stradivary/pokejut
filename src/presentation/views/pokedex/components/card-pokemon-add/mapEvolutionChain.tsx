import { EvolutionChain } from "@/data/entities/evolution";

export function mapEvolutionChain(data: any): EvolutionChain {
  return {
    is_baby: false,
    species: data.species.name,
    evolves_to: data.evolves_to.map((evolution: any) =>
      mapEvolutionChain(evolution)
    ),
  };
}

export const evolveSelectedPokemon = (
  pokemon: any,
  evolveItem: any,
  catchPokemon: any
) => {
  if (!pokemon || !evolveItem) return false;
  const poke = {
    id: pokemon.id,
    name: pokemon.name,
    types: pokemon.types,
    height: pokemon.height,
    weight: pokemon.weight,
    sprites: {
      front_default: pokemon?.sprites?.front_default,
      other: {
        dream_world: {
          front_default:
            pokemon?.sprites?.other?.["dream_world"]?.front_default,
        },
        home: {} as any,
      },
    },
    species: pokemon.species,
  };

  const evolves_to = mapEvolutionChain(evolveItem?.chain);

  catchPokemon({ ...poke, evolves_to });

  return true;
};
