import { useSimulator } from "@/domain/useCases/simulator";
import { Button, Group, Image } from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { PokemonDetail } from "./components/PokemonDetail";
import { EvolutionChainPage } from "./components/EvolutionChain";
import { notifications } from "@mantine/notifications";
import { modals } from "@mantine/modals";

/**
 * Pokedex detail page
 * @returns Pokedex detail page
 */
export function Component() {
    const { pokemonList, releaseSelectedPokemon } = useSimulator();
    const navigate = useNavigate();
    if (pokemonList.length === 0) {
        return (
            <div style={{ width: "100%" }}>
                <Button m="md" component={Link} to=".." >
                    Kembali
                </Button>
                <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <h1>Belum ada pokemon</h1>
                </div>
            </div>
        );
    }
    return (
        <div style={{ width: "100%" }}>
            <Group m="md" justify="space-between">

                <Button component={Link} to=".." >
                    Kembali
                </Button>

                <Button onClick={() => {
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
                                icon: <Image src="/pokeball.png" alt="Pokeball" />,
                                color: "red"
                            });
                        },
                        labels: {
                            cancel: "Batal",
                            confirm: "Lepaskan"
                        }
                    });
                }}>
                    Lepaskan Pokemon
                </Button>

            </Group>
            <PokemonDetail />

            <EvolutionChainPage />
        </div >
    );
}

Component.displayName = 'PokedexPokemonPage';