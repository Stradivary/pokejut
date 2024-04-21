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
