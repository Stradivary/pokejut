import { useSimulator } from "@/domain/use-cases/simulator";
import { Box, Button, Group } from "@mantine/core";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { Link, useNavigate } from "react-router-dom";
import { PokemonDetail } from "./components/pokemon-detail";
import { EvolutionChainPage } from "./components/pokemon-detail/EvolutionChain";



/**
 * Pokedex detail page
 * @returns Pokedex detail page
 */
export function Component() {
    const { selectedPokemonId, releaseSelectedPokemon } = useSimulator();

    const navigate = useNavigate();


    return (
        <Box style={{ width: "100%" }} mb={180}>
            <Group m="md" justify="space-between" >

                <Button component={Link} to=".." unstable_viewTransition>
                    Kembali
                </Button>
                {selectedPokemonId &&
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
                                    icon: <img src="/pokeball.png" alt="pokeball" />,
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
                    </Button>}

            </Group>
            {(selectedPokemonId === null || selectedPokemonId === undefined) && <div>Not found</div>}
            {
                selectedPokemonId && <>
                    <PokemonDetail pokemonId={selectedPokemonId} />
                    <EvolutionChainPage pokemonId={selectedPokemonId} />
                </>
            }

        </Box >
    );
}

Component.displayName = 'PokedexPokemonPage';
