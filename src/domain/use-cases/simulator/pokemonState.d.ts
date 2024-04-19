import { type Pokemon } from '@/data/pokemon';
import { EvolutionChain, type PokemonEvolution } from "@/data/entities/evolution";

export type PokemonState = Partial<Omit<Pokemon, 'weight'>> & Partial<Omit<PokemonEvolution, 'id'>> & {
    pokeId: string;
    fedBerries: string[];
    evolves_to?: EvolutionChain;
    weight: number;
};
