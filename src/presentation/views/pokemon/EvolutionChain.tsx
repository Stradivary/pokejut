import { Button, Paper, Title } from "@mantine/core";
import { PokemonState, useSimulator } from "@/domain/useCases/simulator";
import CardPokedex from "@/presentation/components/CardPokedex/PokedexCard";
import { usePokemonGetByName } from "@/data/dataSource/Pokemon/pokemonDataSource";
import { useEffect, useState } from "react";

export const EvolutionChain = () => {
    const { selectedPokemon, evolveSelectedPokemon } = useSimulator();
    const pokemonDatas = selectedPokemon;

    const { canEvolve } = useEvolutionChain(selectedPokemon);

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
                            evolveSelectedPokemon();
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
