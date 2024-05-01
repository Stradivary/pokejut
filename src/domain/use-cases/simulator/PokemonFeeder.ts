import { BerryState } from "./types";
import { getBerryGain } from "../berries";
import { PokemonCollectionDB } from "./usePokemonCollection";
import lf from "localforage";


export const fedBerries = lf.createInstance({
    name: "pokemonDB",
    storeName: "fedBerries",
});

export class PokemonFeeder {
    collection: PokemonCollectionDB;
    constructor(collection: PokemonCollectionDB) {
        this.collection = collection;
    }

    async feed(pokeId: string, berry: BerryState) {
        try {

            const pokemon = await this.collection.get(pokeId);
            const latestFedBerry = pokemon?.fedBerries?.[pokemon?.fedBerries?.length - 1] ?? [];
            const berryFirmness = berry.firmness?.name;
            const weightGain = getBerryGain(berryFirmness);

            if (latestFedBerry && latestFedBerry === berryFirmness) {
                pokemon.weight -= weightGain * 2;
            } else {
                pokemon.weight += weightGain;
            }

            pokemon.fedBerries.push(berryFirmness);
            await this.collection.update(pokeId, JSON.stringify(pokemon));

        } catch (error) {
            if (error instanceof Error) {
                return { error: true, message: error.message };
            }
        }
        return { error: false, message: "Berhasil memberi makan pokemon" };

    }
}
