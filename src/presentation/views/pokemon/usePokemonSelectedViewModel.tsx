import { useEvolutionChain } from "@/domain/use-cases/evolution/useEvolutionChain";
import { CollectionDB, SelectionDB } from "@/domain/use-cases/simulator/usePokemonCollection";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";

export const usePokemonCollectionViewModel = () => {
  const { data: pokemonSelection, refetch: selectionRefetch } = useQuery({
    queryKey: ["selection"],
    queryFn: SelectionDB.getSelected
  });

  const { data: selectedPokemon, refetch } = useQuery({
    queryKey: ["selectedPokemon", pokemonSelection], queryFn: async () => {
      const selection = pokemonSelection as string ?? "";
      return await CollectionDB.get(selection);
    }
  });

  const [readyToEvolve, setReadyToEvolve] = useState<{ [key: string]: boolean; }>({});
  const { nextEvolutionChain } = useEvolutionChain(selectedPokemon);
  const navigate = useNavigate();

  useEffect(() => {
    if (nextEvolutionChain) {
      nextEvolutionChain?.evolves_to?.forEach((evolution) => {
        if (evolution.species) {
          setReadyToEvolve((prev) => ({ ...prev, [evolution.species]: false }));
        }
      });
    }
  }, [nextEvolutionChain]);

  useEffect(() => {
    refetch();
    selectionRefetch();
  }, [refetch, selectionRefetch]);

  const isNoSelectionFound = pokemonSelection === undefined || selectedPokemon === undefined;

  return {
    selectedPokemon,
    readyToEvolve,
    setReadyToEvolve,
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

