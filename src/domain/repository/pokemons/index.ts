import { Pokemon } from "@/domain/entities/pokemon";

export interface PokemonDataRepository {
    getPokemonById(id: string): Promise<Pokemon>;
    getPokemonByName(name: string): Promise<Pokemon>;
    getPokemons(): Promise<Pokemon[]>;
}