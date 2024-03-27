import { findEvolutionChain } from "@/domain/use-cases/evolution";
import { PokemonState } from '@/domain/use-cases/simulator/PokemonState';
import { useMemo } from "react";

export const useEvolutionChain = (selectedPokemon?: PokemonState) => {
    const { evolves_to, name } = selectedPokemon ?? { evolves_to: [], name: "" };
    const nextEvolutionChain = useMemo(() => {
        return findEvolutionChain(
            evolves_to,
            name ?? ""
        );
    }, [evolves_to, name]);
    return { nextEvolutionChain };
};
