import { Pokemon } from "@/domain/entities/Pokemon";

export interface PokemonDataRepository {
    getPokemonById(id: string): Promise<Pokemon>;
    getPokemonByName(name: string): Promise<Pokemon>;
    getPokemons(): Promise<Pokemon[]>;
}