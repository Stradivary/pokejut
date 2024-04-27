import { EvolutionChain } from "@/data/entities/evolution";
import { findEvolutionChain } from "@/domain/use-cases/evolution";
import { PokemonState } from '@/domain/use-cases/simulator/pokemonState';
import { useMemo } from "react";

export const useEvolutionChain = (selectedPokemon?: PokemonState) => {
    const { evolves_to, name } = selectedPokemon ?? { evolves_to: {} as EvolutionChain, name: "" };


    const nextEvolutionChain = useMemo(() => {
        if (selectedPokemon == undefined || !evolves_to || !name) {
            return null;
        };

        return findEvolutionChain(evolves_to, name ?? "");
    }, [evolves_to, name]);
    return { nextEvolutionChain };
};
