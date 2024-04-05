import { useSimulator } from "@/domain/use-cases/simulator";
import { useMantineColorScheme } from "@mantine/core";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";

export function useSettingsViewModel() {
    const { setColorScheme, colorScheme } = useMantineColorScheme();
    const {
        clearPokemonList, clearSelectedPokemon
    } = useSimulator();

    const colorSchemeOptions = [{
        value: 'light',
        label: 'Terang',
    }, {
        value: 'dark',
        label: 'Gelap',
    }];
    const cacheSize = localStorage.getItem('REACT_QUERY_OFFLINE_CACHE')?.length;
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
        window.location.reload();
    };
    const cacheSizeInMB = cacheSize ? (cacheSize / 1024 / 1024).toFixed(2) : 0;

    return {
        colorScheme,
        setColorScheme,
        colorSchemeOptions,
        cacheSizeInMB,
        handleClearCache,
        handleReleaseCollection
    };
}
