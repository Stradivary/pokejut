import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { usePokemonGetByName } from "@/domain/use-cases/pokemon";
import { useSimulator } from "@/domain/use-cases/simulator";
import { getColorByType } from "@/utils/constants";
import { handleModalRelease } from "../../usePokemonSelectedViewModel";

export const usePokemonSelectCardViewModel = (pokemonName: string, index: string) => {
  const navigate = useNavigate();

  const { data: pokemon } = usePokemonGetByName(pokemonName);
  const { pokemonList, setSelectedPokemon } = useSimulator();

  const { releaseSelectedPokemon } = useSimulator();


  const color = useMemo(() => {
    if (pokemonName) {
      return getColorByType(pokemon?.types?.[0]?.type?.name ?? "");
    }
    return "#fff";
  }, [pokemonName, pokemon]);

  const pokemonTypes = pokemon?.types ?? [];
  const pokemonStats = pokemon?.stats ?? [];

  const onReleaseClick = useCallback(() => {
    setSelectedPokemon(pokemon);
    handleModalRelease(releaseSelectedPokemon, navigate);
  }, [pokemon, setSelectedPokemon, releaseSelectedPokemon, navigate]);

  const onSelectClick = useCallback(() => {
    const selectedPoke = pokemonList.find(x => x.pokeId === index);
    setSelectedPokemon(selectedPoke);
  }, [pokemonList, setSelectedPokemon, index]);

  return {
    pokemon,
    pokemonTypes,
    pokemonStats,
    onReleaseClick,
    onSelectClick,
    color,
  };
};
