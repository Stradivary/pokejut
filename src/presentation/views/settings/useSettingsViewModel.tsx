import { useSimulator } from "@/domain/use-cases/simulator";
import { useMantineColorScheme } from "@mantine/core";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

export function useSettingsViewModel() {
    const navigate = useNavigate();
    // force rerender to update cache size
    const [e, rerender] = useState(0);

    const { setColorScheme, colorScheme } = useMantineColorScheme();
    const {
        pokemonList,
        clearPokemonList, clearSelectedPokemon
    } = useSimulator();

    const canReleaseCollection = useMemo(() => pokemonList.length === 0, [pokemonList]);

    const colorSchemeOptions = [{
        value: 'light',
        label: 'Terang',
    }, {
        value: 'dark',
        label: 'Gelap',
    }];

    const cacheSize = useMemo(
        () => { 
            return (localStorage.getItem('REACT_QUERY_OFFLINE_CACHE') ?? "").length;
        },
        [e]
    );

    const handleReleaseCollection = () => {
        modals.openConfirmModal({
            title: "Lepas Semua Pokemon",
            children: "Apakah kamu yakin ingin melepaskan semua koleksi pokemon?",
            onConfirm: () => {
                clearSelectedPokemon();
                clearPokemonList();
                notifications.show({
                    title: "Berhasil",
                    message: "Koleksi Pokemon berhasil dihapus",
                    color: "blue",
                    icon: <img src="/pokeball.png" alt="pokeball" />,
                });
            },
            labels: {
                confirm: "Lepas Semua",
                cancel: "Batal",
            }
        });

    };
    const handleClearCache = () => {
        localStorage.clear();
        notifications.show({
            title: "Berhasil",
            message: "Cache berhasil dihapus",
            color: "blue",
            icon: <img src="/pokeball.png" alt="pokeball" />,
        });
        rerender(e + 1);

        navigate("/settings", { replace: true })
    };
    const cacheSizeInMB = cacheSize ? (cacheSize / 1024 / 1024).toFixed(2) : 0;

    return {
        colorScheme,
        setColorScheme,
        colorSchemeOptions,
        cacheSizeInMB,
        handleClearCache,
        handleReleaseCollection,
        canReleaseCollection
    };
}
