import { useSimulator } from "@/domain/use-cases/simulator";
import { useNavigate } from "react-router-dom";
import { useEvolutionChain } from "../../../domain/use-cases/evolution/useEvolutionChain";
import { useEffect, useState } from "react";

export const usePokemonCollectionViewModel = () => {
  const { selectedPokemonId, selectedPokemon, releaseSelectedPokemon } = useSimulator();
  const [readyToEvolve, setReadyToEvolve] = useState<{ [key: string]: boolean; }>({});
  const pokemonState = selectedPokemon();
  const { nextEvolutionChain } = useEvolutionChain(pokemonState);
  const navigate = useNavigate();

  useEffect(() => {
    if (nextEvolutionChain) {
      nextEvolutionChain?.evolves_to?.forEach((evolution) => {
        if (evolution.species) {
          setReadyToEvolve((prev) => ({ ...prev, [evolution.species]: false }));
        }
      });
    }
  }, [nextEvolutionChain, selectedPokemonId]);
  const isNoSelectionFound = selectedPokemonId === null || selectedPokemonId === undefined;
  return {
    selectedPokemonId,
    selectedPokemon,
    releaseSelectedPokemon,
    readyToEvolve,
    setReadyToEvolve,
    pokemonState,
    nextEvolutionChain,
    isNoSelectionFound,
    navigate,
  };
};


import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { NavigateFunction } from "react-router-dom";

export function handleModalRelease(
  releaseSelectedPokemon: () => void,
  navigate: NavigateFunction
) {
  modals.openConfirmModal({
    radius: "md",
    title: "Lepaskan Pokemon",
    children: <>Apakah kamu yakin ingin melepaskan pokemon ini?</>,
    onConfirm: () => {
      confirmReleasePokemon(releaseSelectedPokemon, navigate);
    },
    labels: {
      cancel: "Batal",
      confirm: "Lepaskan",
    },
  });
}

export function confirmReleasePokemon(
  releaseSelectedPokemon: () => void,
  navigate: NavigateFunction
) {
  releaseSelectedPokemon();
  navigate("..");
  notifications.show({
    title: "Pokemon dilepas",
    message: "Pokemon dilepas dari koleksi",
    icon: <img src="/pokeball.png" alt="pokeball" />,
    color: "red",
  });
}
