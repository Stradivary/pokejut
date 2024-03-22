import { Pokemon } from '@/domain/entities/pokemon';
import { PokemonEvolution } from "@/domain/entities/evolution";

export type PokemonState = Partial<Omit<Pokemon, 'weight'>> & Partial<Omit<PokemonEvolution, 'id'>> & {
    pokeId: string;
    fedBerries: string[];
    evolves_to?: any[];
    weight: number;
};
