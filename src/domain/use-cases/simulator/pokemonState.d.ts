import { type Pokemon } from '@/data/pokemon';
import { type PokemonEvolution } from "@/data/entities/evolution";

export type PokemonState = Partial<Omit<Pokemon, 'weight'>> & Partial<Omit<PokemonEvolution, 'id'>> & {
    pokeId: string;
    fedBerries: string[];
    evolves_to?: any[];
    weight: number;
};
