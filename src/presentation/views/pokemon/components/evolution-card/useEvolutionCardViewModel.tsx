import { usePokemonGetByName } from "@/domain/use-cases/pokemon";
import { useSimulator } from "@/domain/use-cases/simulator";
import { getColorByType } from "@/utils/constants";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

export const useEvolutionCardViewModel = (pokemonName: string, oldPokemon: any, readyToEvolve: any, setReadyToEvolve: any) => {
  const { data: pokemon } = usePokemonGetByName(pokemonName);

  const color = getColorByType(pokemon ? pokemon?.types?.[0]?.type?.name : "#fff");

  const { evolveSelectedPokemon } = useSimulator();

  const weightPercentage = useMemo(() => {
    const pokemonWeight = oldPokemon?.weight ?? 0;
    const nextEvolutionPokemonWeight = pokemon?.weight ?? 80000;
    return pokemonWeight < nextEvolutionPokemonWeight
      ? (pokemonWeight / nextEvolutionPokemonWeight) * 100 : 100;
  }, [oldPokemon, pokemon]);

  const canEvolve = useMemo(() => {
    const pokemonWeight = oldPokemon?.weight ?? 0;
    const nextEvolutionPokemonWeight = pokemon?.weight ?? 80000;
    return pokemonWeight >= nextEvolutionPokemonWeight;
  }, [oldPokemon, pokemon]);

  const navigate = useNavigate();

  if (canEvolve && !readyToEvolve[pokemonName] && pokemonName) {
    setReadyToEvolve({ ...readyToEvolve, [pokemonName]: true });
  }

  return {
    pokemon,
    color,
    weightPercentage,
    canEvolve,
    navigate,
    evolveSelectedPokemon
  };

};
