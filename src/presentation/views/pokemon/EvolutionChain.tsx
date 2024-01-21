import { Button, Paper, Title } from "@mantine/core";
import { PokemonState, useSimulator } from "@/domain/useCases/simulator";
import CardPokedex from "@/presentation/components/CardPokedex/PokedexCard";
import { usePokemonGetByName } from "@/data/dataSource/Pokemon/pokemonDataSource";
import { useEffect, useState } from "react";
import { usePokemonGetEvolutionChain } from "@/data/dataSource/Evolution/evolutrionDataSource";

export const EvolutionChain = () => {
    const { selectedPokemon, evolveSelectedPokemon } = useSimulator();
    const pokemonDatas = selectedPokemon;

    const { canEvolve } = useEvolutionChain(selectedPokemon);

    const { data: evolvePokemonData } = usePokemonGetByName(selectedPokemon?.chain?.evolves_to?.[0]?.species?.name ?? "");

    const { data: evolveItem } = usePokemonGetEvolutionChain(
        evolvePokemonData?.id.toString()
    );
    return (
        <Paper p="md">
            <Title order={3} mt="lg">
                Evolution Chain
            </Title>
            {pokemonDatas?.chain?.evolves_to?.map((evolution) => {
                return (
                    <div>
                        <CardPokedex pokemonName={evolution?.species?.name} />
                    </div>
                );
            })}
            {canEvolve && (
                <div>
                    <Title order={5} mt="lg">
                        You can evolve this pokemon
                    </Title>
                    <Button
                        onClick={() => {
                            const { id, ...evolveItems } = evolveItem;
                            const pokemonData: PokemonState = { ...evolvePokemonData, ...evolveItems };

                            evolveSelectedPokemon(pokemonData);

                        }}
                    >
                        Evolve
                    </Button>
                </div>
            )}


        </Paper>
    );
};
const useEvolutionChain = (pokemon?: PokemonState) => {
    const [canEvolve, setCanEvolve] = useState<boolean>(false);
    const pokemonWeight = pokemon?.weight ?? 0;
    const pokemonEvolutionChain = pokemon?.chain;

    const pokemonEvolutionChainNames = pokemonEvolutionChain?.evolves_to?.map((evolution) => {
        return evolution?.species?.name;
    });

    const { data: pokemonEvolutionChainData } = usePokemonGetByName(pokemonEvolutionChainNames?.[0] ?? "");


    useEffect(() => {
        const pokemonEvolutionChainWeight = pokemonEvolutionChainData?.weight ?? 0;
        if (pokemonWeight >= pokemonEvolutionChainWeight) {
            setCanEvolve(true);
        }
    }, [pokemonWeight, pokemonEvolutionChainData]);

    return { canEvolve };
};
