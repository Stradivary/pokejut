import { create } from 'zustand';
import { Pokemon } from '../../models/Pokemon';

type Berry = {
    firmness: string;
    weightGain: number;
};

type PokemonState = {
    fedBerries: Berry[];
} & Pokemon;

type PokemonStore = {
    selectedPokemon: PokemonState | null;
    pokemonList: PokemonState[];
    setSelectedPokemon: (pokemon: PokemonState) => void;
    deleteSelectedPokemon: () => void;
    feedPokemon: (berry: Berry) => void;
    getBerryGain: (firmness: string) => number;
    addPokemon: (pokemon: Pokemon) => void;
};

const berriesGain: Record<string, number> = {
    'Very-soft': 2,
    'Soft': 3,
    'Hard': 5,
    'Very-Hard': 8,
    'Super-Hard': 10,
};

const usePokemonStore = create<PokemonStore>((set) => ({
    /// Selected pokemon
    selectedPokemon: null,
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
        set(() => ({ selectedPokemon: null }));
    },
    /**
     * Feed the selected pokemon with a berry
     * @param berry berry to feed the selected pokemon
     */
    feedPokemon: (berry) => {
        set((state) => {
            if (state.selectedPokemon) {
                // Check for last fed berry, if it's the same firmness, the pokemon is poisoned
                const latestFedBerry = state.selectedPokemon.fedBerries[state.selectedPokemon.fedBerries.length - 1];

                if (latestFedBerry && latestFedBerry.firmness === berry.firmness) {
                    // Pokemon is poisoned, handle weight loss
                    const weightLoss = state.getBerryGain(berry.firmness) * 2; // Weight loss formula
                    state.selectedPokemon.weight -= weightLoss;
                }

                // Update the fed berries for the selected Pokemon
                state.selectedPokemon.fedBerries = [...state.selectedPokemon.fedBerries, berry];

                // Update the selected Pokemon's weight based on the berry's firmness 
                state.selectedPokemon.weight += state.getBerryGain(berry.firmness);
            }
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
}));

export default usePokemonStore;
