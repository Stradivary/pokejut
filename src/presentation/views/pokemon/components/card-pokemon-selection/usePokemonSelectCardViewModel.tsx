import { usePokemonGetByName } from "@/domain/use-cases/pokemon";
import { useSimulator } from "@/domain/use-cases/simulator";
import { getColorByType } from "@/utils/constants";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { handleModalRelease } from "../../usePokemonSelectedViewModel";

export const usePokemonSelectCardViewModel = (pokemonName: string, index: string) => {
  const navigate = useNavigate();

  const { data: pokemon } = usePokemonGetByName(pokemonName);
  const { pokemonList, setSelectedPokemon, releaseSelectedPokemon } = useSimulator();

  const color = useMemo(() => {
    if (pokemonName) {
      return getColorByType(pokemon?.types?.[0]?.type?.name ?? "");
    }
    return "#fff";
  }, [pokemonName, pokemon]);

  const pokemonTypes = pokemon?.types ?? [];
  const pokemonStats = pokemon?.stats ?? [];

  const onReleaseClick = () => {
    setSelectedPokemon({ ...pokemon, pokeId: index });
    handleModalRelease(releaseSelectedPokemon, navigate);
  };

  const onSelectClick = () => {
    const selectedPoke = pokemonList.find(x => x.pokeId === index);
    setSelectedPokemon(selectedPoke);
  };

  return {
    pokemon,
    pokemonTypes,
    pokemonStats,
    onReleaseClick,
    onSelectClick,
    color,
  };
};
