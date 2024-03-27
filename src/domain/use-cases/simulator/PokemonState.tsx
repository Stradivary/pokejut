import { Pokemon } from '@/domain/use-cases/entities/pokemon';
import { PokemonEvolution } from "@/domain/use-cases/entities/evolution";

export type PokemonState = Partial<Omit<Pokemon, 'weight'>> & Partial<Omit<PokemonEvolution, 'id'>> & {
    pokeId: string;
    fedBerries: string[];
    evolves_to?: any[];
    weight: number;
};
