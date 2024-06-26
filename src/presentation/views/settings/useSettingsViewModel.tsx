import { useSimulator } from "@/domain/use-cases/simulator";
import { useMantineColorScheme } from "@mantine/core";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { useCallback, useMemo } from "react";

export function useSettingsViewModel() {

  const colorSchemeOptions = [
    {
      value: "light",
      label: "Terang",
    },
    {
      value: "dark",
      label: "Gelap",
    },
  ];

  const { setColorScheme, colorScheme } = useMantineColorScheme();

  const { pokemonList, clearPokemonList, clearSelectedPokemon } =
    useSimulator();

  const canReleaseCollection = useMemo(
    () => pokemonList.length === 0,
    [pokemonList]
  );

  const handleReleaseCollection = useCallback(
    () => onReleaseCollection(clearSelectedPokemon, clearPokemonList, notifications),
    [clearPokemonList, clearSelectedPokemon]
  );

  const handleChangeColorScheme = useCallback((value) => setColorScheme(value as 'light' | 'dark'), [setColorScheme]);

  return {
    colorScheme,
    handleChangeColorScheme,
    colorSchemeOptions,
    handleReleaseCollection,
    canReleaseCollection,
  };
}

export function onReleaseCollection(
  clearSelectedPokemon: () => void,
  clearPokemonList: () => void,
  notifications: any
) {
  modals.openConfirmModal({
    title: "Lepas Semua Pokemon",
    children: "Apakah kamu yakin ingin melepaskan semua koleksi pokemon?",
    onConfirm: () => confirmReleaseCollection(clearSelectedPokemon, clearPokemonList, notifications),
    labels: {
      confirm: "Lepas Semua",
      cancel: "Batal",
    },
  });
}

export function confirmReleaseCollection(
  clearSelectedPokemon: () => void,
  clearPokemonList: () => void,
  notifications: any
): void {
  clearSelectedPokemon();
  clearPokemonList();
  notifications.show({
    title: "Berhasil",
    message: "Koleksi Pokemon berhasil dihapus",
    color: "blue",
    icon: <img src="/pokeball.png" alt="pokeball" />,
  });
}
