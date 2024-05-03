import { useSimulator } from "@/domain/use-cases/simulator";
import type { PokemonState } from '@/domain/use-cases/simulator/types';
import { getColorByType } from "@/utils/constants";
import { useMemo } from "react";

export const usePokemonDetailViewModel = (pokemonId: string, readyToEvolve: { [key: string]: boolean; }) => {

  const { feedPokemon, selectedPokemonId, pokemonList } = useSimulator();
  const pokemonState = pokemonList.find((poke) => poke.pokeId === pokemonId);
  const color = getColorByType(pokemonState?.types?.[0]?.type?.name ?? "") ?? "#fff";
  const { weight, fedBerries, ...pokemon } = pokemonState ?? ({} as PokemonState);

  const lastFeedBerries = fedBerries?.slice(-5).reverse();

  const canFeedBerry = useMemo(() => Object.values(readyToEvolve).some((value) => value === false), [readyToEvolve]);

  return {
    pokemon,
    weight,
    feedPokemon,
    fedBerries,
    selectedPokemonId,
    canFeedBerry,
    lastFeedBerries,
    color,
  };
};
