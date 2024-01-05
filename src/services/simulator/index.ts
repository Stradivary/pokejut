import { create } from 'zustand';
import { Berry } from '../../models/Berries';
import { Pokemon } from '../../models/Pokemon';
import { PokemonEvolution } from "@/models/Evolution";

export type BerryState = Partial<Berry>;
// Optional Pokemon properties
export type PokemonState = {
    fedBerries: BerryState[];
} & Partial<Omit<Pokemon, 'weight'>> & Partial<PokemonEvolution> & { weight: number; };


export type PokemonStore = {
    selectedPokemon: PokemonState | undefined;
    pokemonList: PokemonState[];
    setSelectedPokemon: (pokemon: PokemonState) => void;
    deleteSelectedPokemon: () => void;
    feedPokemon: (berry: BerryState) => void;
    getBerryGain: (firmness: string) => number;
    addPokemon: (pokemon: Pokemon) => void;
    checkEvolution: (pokemon: PokemonState) => void;
    evolvePokemon: (pokemon: PokemonState) => void;
};

export const berriesGain: Record<string, number> = {
    'Very-soft': 20,
    'Soft': 30,
    'Hard': 50,
    'Very-Hard': 80,
    'Super-Hard': 100,
};

export const usePokemonStore = create<PokemonStore>((set) => ({
    /// Selected pokemon
    selectedPokemon: undefined,
    /// List of pokemon
    pokemonList: [],
    /**
     * Add a pokemon to the list
     * @param pokemon pokemon to add to the list
     */
    addPokemon: (pokemon) => {
        const newPokemon = {
            ...pokemon,
            fedBerries: [],
        };
        set((state) => ({ pokemonList: [...state.pokemonList, newPokemon] }));
    },
    /**
     * Set the selected pokemon
     * @param pokemon pokemon to set as selected
     */
    setSelectedPokemon: (pokemon) => {
        set(() => ({ selectedPokemon: pokemon }));
    },
    /**
     * Delete the selected pokemon
     */
    deleteSelectedPokemon: () => {
        set(() => ({ selectedPokemon: undefined }));
    },
    /**
     * Feed the selected pokemon with a berry
     * @param berry berry to feed the selected pokemon
     */
    feedPokemon: (berry) => {
        set((state) => {
            if (state.selectedPokemon) {
                // Check for last fed berry, if it's the same firmness, the pokemon is poisoned
                const latestFedBerry = state?.selectedPokemon?.fedBerries[state?.selectedPokemon?.fedBerries?.length - 1];

                if (latestFedBerry && latestFedBerry?.firmness === berry?.firmness) {
                    // Pokemon is poisoned, handle weight loss
                    const weightLoss = state.getBerryGain(berry?.firmness?.name ?? "") * 2; // Weight loss formula
                    state.selectedPokemon.weight -= weightLoss;
                }

                // Update the fed berries for the selected Pokemon
                state.selectedPokemon.fedBerries = [...[...state?.selectedPokemon?.fedBerries ?? []], berry];

                // Update the selected Pokemon's weight based on the berry's firmness 
                state.selectedPokemon.weight += state.getBerryGain(berry?.firmness?.name ?? "");
            }
            // update selected pokemon to the pokemonList
            const pokemonIndex = state.pokemonList.findIndex((pokemon) => pokemon.name === state.selectedPokemon?.name);
            state.pokemonList[pokemonIndex] = state.selectedPokemon as PokemonState;

            return state;
        });
    },
    /**
     * Get the weight gain for a berry based on its firmness
     * @param firmness firmness of the berry
     * @returns weight gain for the berry, default is 1 
     */
    getBerryGain: (firmness) => {
        return berriesGain[firmness] ?? 1;
    },
    /**
     * Check if a pokemon can evolve
     * @param pokemon pokemon to check
     */
    checkEvolution: (pokemon) => {
        const evolution = pokemon?.chain?.evolves_to?.[0]?.species?.name;
        if (evolution && pokemon.weight >= 1000) {
            // Pokemon can evolve
            pokemon.name = evolution;
        }
    },
    /**
     * Evolve a pokemon
     * @param pokemon pokemon to evolve
     * @returns evolved pokemon
        */
    evolvePokemon: (pokemon) => {
        set((state) => {
            // Update the pokemonList with the evolved pokemon
            const pokemonIndex = state.pokemonList.findIndex((pokemon) => pokemon.name === state.selectedPokemon?.name);
            state.pokemonList[pokemonIndex] = pokemon;
            return state;
        });
    }
}));

export default usePokemonStore;
