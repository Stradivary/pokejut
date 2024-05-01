import { useSimulator } from "@/domain/use-cases/simulator";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useEvolutionChain } from "@/domain/use-cases/evolution/useEvolutionChain";

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

export function handleModalRelease(
  releaseSelectedPokemon: () => void,
  navigate: NavigateFunction
) {
  modals.openConfirmModal({
    radius: "md",
    title: "Lepaskan Pokemon",
    children: <>Apakah kamu yakin ingin melepaskan pokemon ini?</>,
    onConfirm: () => {
      releaseSelectedPokemon();
      navigate("..");
      notifications.show({
        title: "Pokemon dilepas",
        message: "Pokemon dilepas dari koleksi",
        icon: <img src="/pokeball.png" alt="pokeball" />,
        color: "red",
      });
    },
    labels: {
      cancel: "Batal",
      confirm: "Lepaskan",
    },
  });
}

