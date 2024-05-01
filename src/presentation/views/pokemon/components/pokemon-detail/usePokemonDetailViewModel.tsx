import { useSimulator } from "@/domain/use-cases/simulator";
import type { PokemonState } from '@/domain/use-cases/simulator/types';
import { CollectionDB } from "@/domain/use-cases/simulator/usePokemonCollection";
import { getColorByType } from "@/utils/constants";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export const usePokemonDetailViewModel = (pokemonId: string, readyToEvolve: { [key: string]: boolean; }) => {
  const { data: pokemonList } = useQuery({ queryKey: ["pokemonList"], queryFn: () => CollectionDB.getAll() });
  const { feedPokemon } = useSimulator();
  const pokemonState = pokemonList?.find((poke) => poke.pokeId === pokemonId);
  const { weight, fedBerries, ...pokemon } = pokemonState ?? ({} as PokemonState);
  const color = getColorByType(pokemonState?.types?.[0]?.type?.name ?? "") ?? "#fff";

  const lastFeedBerries = fedBerries?.slice(-5).reverse() ?? [];
  const canFeedBerry = useMemo(() => Object.values(readyToEvolve).some((value) => value === false), [readyToEvolve]);

  return {
    pokemon,
    weight,
    feedPokemon,
    fedBerries,
    canFeedBerry,
    lastFeedBerries,
    color
  };
};
