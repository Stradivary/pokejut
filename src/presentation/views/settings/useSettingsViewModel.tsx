import { useSimulator } from "@/domain/use-cases/simulator";
import { useMantineColorScheme } from "@mantine/core";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

export function useSettingsViewModel() {
  const navigate = useNavigate();

  const [rerender, setRerender] = useState(0);

  const { setColorScheme, colorScheme } = useMantineColorScheme();
  const { pokemonList, clearPokemonList, clearSelectedPokemon } =
    useSimulator();

  const canReleaseCollection = useMemo(
    () => pokemonList.length === 0,
    [pokemonList]
  );

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

  const cacheSize = useMemo(() => {
    return (localStorage.getItem("REACT_QUERY_OFFLINE_CACHE") ?? "").length;
  }, []);

  const handleReleaseCollection = useCallback(
    () =>
      onReleaseCollection(
        clearSelectedPokemon,
        clearPokemonList,
        notifications
      ),
    [clearPokemonList, clearSelectedPokemon]
  );

  const handleClearCache = useCallback(() => {
    if (rerender === -1) return;
    onClearCache(setRerender, navigate);
  }, [navigate, rerender, setRerender]);

  const cacheSizeInMB = useMemo(
    () => (cacheSize ? (cacheSize / 1024 / 1024).toFixed(2) : 0),
    [cacheSize]
  );

  return {
    colorScheme,
    setColorScheme,
    colorSchemeOptions,
    cacheSizeInMB,
    handleClearCache,
    handleReleaseCollection,
    canReleaseCollection,
  };
}

export function onClearCache(setRerender, navigate) {
  localStorage.clear();
  notifications.show({
    title: "Berhasil",
    message: "Cache berhasil dihapus",
    color: "blue",
    icon: <img src="/pokeball.png" alt="pokeball" />,
  });
  setRerender((e) => e + 1);
  navigate("/settings", { replace: true });
}

export function onReleaseCollection(
  clearSelectedPokemon: () => void,
  clearPokemonList: () => void,
  notifications: any
) {
  modals.openConfirmModal({
    title: "Lepas Semua Pokemon",
    children: "Apakah kamu yakin ingin melepaskan semua koleksi pokemon?",
    onConfirm: () =>
      confirmReleaseCollection(
        clearSelectedPokemon,
        clearPokemonList,
        notifications
      ),
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
