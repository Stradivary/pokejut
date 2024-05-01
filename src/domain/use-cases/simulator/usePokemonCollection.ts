

// indexedDB pokemon Collection with add, delete, get, getAll, clear, count, and update methods

import lf from "localforage";
import { PokemonState } from "./types";

import { v4 as uuidv4 } from 'uuid';
export const pokemonCollection = lf.createInstance({
    name: "pokemonDB",
    storeName: "PokemonCollection",
});

export const pokemonSelection = lf.createInstance({
    name: "pokemonDB",
    storeName: "selection",
});

/**
 * use case for selection, select, deselect, and get selected pokemon
 */
export class UseSelection {
    async select(pokeId: string) {
        await pokemonSelection.setItem("selected", pokeId);
    }
    async deselect() {
        await pokemonSelection.removeItem("selected");
    }
    async getSelected() {
        return await pokemonSelection.getItem("selected");
    }
}


export class PokemonCollectionDB {
    async add(pokemon: Omit<PokemonState, 'pokeId'> & { pokeId?: string; }) {
        if (pokemon.pokeId === undefined) {
            pokemon.pokeId = uuidv4();
        }

        const item = await pokemonCollection.getItem(pokemon.pokeId);
        if (item) {
            throw new Error("Pokemon already exists");
        }
        await pokemonCollection.setItem(pokemon.pokeId, JSON.stringify(pokemon));
    }
    async delete(pokeId: string) {

        await pokemonCollection.removeItem(pokeId);
    }
    async get(pokeId: string): Promise<PokemonState> {
        const item = await pokemonCollection.getItem(pokeId);
        return JSON.parse(item as string ?? "{}");
    }
    async getAll(): Promise<PokemonState[]> {
        const keys = await pokemonCollection.keys();
        const items = await Promise.all(keys.map((key) => pokemonCollection.getItem(key)));
        return items.map((item) => JSON.parse(item as string ?? "{}") as PokemonState);
    }

    async clear() {
        await pokemonCollection.clear();
    }

    async count() {
        return await pokemonCollection.length();
    }

    async update(pokeId: string, pokemon) {
        await pokemonCollection.setItem(pokeId, pokemon);
    }
};

export const CollectionDB = new PokemonCollectionDB();

export const SelectionDB = new UseSelection();