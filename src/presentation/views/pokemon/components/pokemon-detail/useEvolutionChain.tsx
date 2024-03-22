import { EvolutionChain } from "@/domain/entities/evolution";
import { findEvolutionChain } from "@/domain/use-cases/evolution/useEvolutionChain";
import { PokemonState } from '@/domain/use-cases/simulator/PokemonState';
import { useEffect, useState } from "react";

export const useEvolutionChain = (selectedPokemon?: PokemonState) => {
    const { evolves_to, name } = selectedPokemon ?? { evolves_to: [] };
    // const { data: evolveItem } = usePokemonGetEvolutionChainByPokemonName(selectedPokemon?.name ?? "");
    const [nextEvolutionChain, setNextEvolutionChain] = useState<
        EvolutionChain | EvolutionChain[]
    >([]);

    useEffect(() => {
        const nextEvolutionChain = findEvolutionChain(
            evolves_to,
            name ?? ""
        );
        setNextEvolutionChain(nextEvolutionChain);
    }, [evolves_to]);

    return { nextEvolutionChain };
};
