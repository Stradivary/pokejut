import { PokemonState } from "./types";
import { PokemonCollectionDB } from "./usePokemonCollection";


export class PokemonEvolver {
    collection: PokemonCollectionDB;
    constructor(collection: PokemonCollectionDB) {
        this.collection = collection;
    }

    async evolve(pokeId: string, evolvedPokemon: PokemonState) {
        try {
            // preserve the fedBerries, weight, evolves_to, and pokeId
            const pokemon = await this.collection.get(pokeId);
            evolvedPokemon.fedBerries = pokemon.fedBerries;
            evolvedPokemon.weight = pokemon.weight;
            evolvedPokemon.evolves_to = pokemon.evolves_to;

            await this.collection.update(pokeId, JSON.stringify(evolvedPokemon));
        } catch (error) {
            if (error instanceof Error) {
                return { error: true, message: error.message };
            }
        }
        return { error: false, message: "Berhasil berevolusi" };
    }
}
