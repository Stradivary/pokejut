import { usePokemonGetByName } from "@/domain/use-cases/pokemon";
import { CollectionDB, SelectionDB } from "@/domain/use-cases/simulator/usePokemonCollection";
import { getColorByType } from "@/utils/constants";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { handleModalRelease } from "../../usePokemonSelectedViewModel";

export const usePokemonSelectCardViewModel = (pokemonName: string, index: string) => {

  const navigate = useNavigate();

  const { data: pokemon } = usePokemonGetByName(pokemonName);

  const color = useMemo(() => {
    if (pokemonName) {
      return getColorByType(pokemon?.types?.[0]?.type?.name ?? "");
    }
    return "#fff";
  }, [pokemonName, pokemon]);

  const pokemonTypes = pokemon?.types ?? [];
  const pokemonStats = pokemon?.stats ?? [];

  const onReleaseClick = () => {
    SelectionDB.select(index);
    handleModalRelease(() => CollectionDB.delete(index), navigate);
  };

  const onSelectClick = () => {
    SelectionDB.select(index);
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
