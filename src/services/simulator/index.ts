import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { Berry } from '@/models/Berries';
import { Pokemon } from '@/models/Pokemon';
import { PokemonEvolution } from "@/models/Evolution";
import { notifications } from '@mantine/notifications';

export type BerryState = Partial<Berry>;

export type PokemonState = Partial<Omit<Pokemon, 'weight'>> & Partial<Omit<PokemonEvolution, 'id'>> & {
    pokeId: string;
    fedBerries: string[];
    weight: number;
};

export type PokemonStore = {
    selectedPokemon: PokemonState | undefined;
    pokemonList: PokemonState[];
    setSelectedPokemon: (pokemon: PokemonState | undefined) => void;
    deleteSelectedPokemon: () => void;
    catchPokemon: (pokemon: Pokemon) => void;
    releasePokemon: (pokemonId: string) => void;
    feedPokemon: (pokemonId: string, berry: BerryState) => void;
    getBerryGain: (firmness?: string) => number;
    addPokemon: (pokemon: Pokemon) => void;
    checkifSelectedPokemonCanEvolve: () => void;
    evolvePokemon: (pokemonId: string) => void;
};

export const berriesGain: Record<string, number> = {
    'very-soft': 20,
    'soft': 30,
    'hard': 50,
    'very-hard': 80,
    'super-hard': 100,
};

export const usePokemonStore = create<PokemonStore>((set) => ({
    selectedPokemon: undefined,
    pokemonList: [],
    setSelectedPokemon: (pokemon) => {
        set(() => ({ selectedPokemon: pokemon }));
    },
    deleteSelectedPokemon: () => {
        set(() => ({ selectedPokemon: undefined }));
    },
    catchPokemon: (pokemon) => {
        const newPokemon: PokemonState = {
            ...pokemon,
            pokeId: uuidv4(),
            fedBerries: [],
        };
        set((state) => ({ pokemonList: [...state.pokemonList, newPokemon], selectedPokemon: newPokemon }));
    },
    releasePokemon: (pokemonId) => {
        set((state) => ({
            pokemonList: state.pokemonList.filter((pokemon) => pokemon.pokeId !== pokemonId),
            selectedPokemon: undefined,
        }));
    },
    feedPokemon: (pokemonId, berry) => {
        set((state) => {
            const selectedPokemonIndex = state.pokemonList.findIndex((pokemon) => pokemon.pokeId === pokemonId);

            if (selectedPokemonIndex !== -1) {
                const updatedPokemonList = [...state.pokemonList];
                const selectedPokemon = { ...updatedPokemonList[selectedPokemonIndex] };

                const latestFedBerry = selectedPokemon.fedBerries[selectedPokemon.fedBerries.length - 1];
                const berryFirmness = berry.firmness?.name;
                const weightGain = state.getBerryGain(berryFirmness);
                if (latestFedBerry && latestFedBerry === berryFirmness) {
                    const weightLoss = weightGain * 2;
                    selectedPokemon.weight -= weightLoss;
                    notifications.show({
                        title: "Uh oh!",
                        message: `You fed your Pokemon a berry of the same firmness, it lost ${weightLoss / 10} kg!`,
                        color: "red",
                        autoClose: 2000,
                    });
                } else {
                    notifications.show({
                        title: "Yay!",
                        message: `You fed your Pokemon a berry, it gained ${weightGain / 10} kg!`,
                        color: "teal",
                        autoClose: 2000,
                    });
                }

                selectedPokemon.fedBerries = [...selectedPokemon.fedBerries, berry.firmness?.name ?? ""];
                selectedPokemon.weight += weightGain;

                updatedPokemonList[selectedPokemonIndex] = selectedPokemon;

                return { pokemonList: updatedPokemonList, selectedPokemon: selectedPokemon };
            }

            return state;
        });
    },
    getBerryGain: (firmness) => {
        return berriesGain[firmness ?? ""] ?? 1;
    },
    addPokemon: (pokemon) => {
        const newPokemon: PokemonState = {
            ...pokemon,
            pokeId: uuidv4(),
            fedBerries: [],
        };
        set((state) => ({ pokemonList: [...state.pokemonList, newPokemon], selectedPokemon: newPokemon }));
    },
    checkifSelectedPokemonCanEvolve: () => {
        set((state) => {
            const selectedPokemon = state.selectedPokemon;
            if (selectedPokemon) {
                const evolution = selectedPokemon?.chain?.evolves_to?.[0];
                notifications.show({
                    title: "Evolution!",
                    message: `Your ${selectedPokemon.name} evolved into ${evolution?.species?.name}!`,
                    color: "teal",
                    autoClose: 2000,
                });
            }
            return state;
        });

    },
    evolvePokemon: (pokemonId) => {
        set((state) => {
            const updatedPokemonList = state.pokemonList.map((pokemon) => {
                if (pokemon.pokeId === pokemonId) {
                    return { ...pokemon, name: pokemon?.chain?.evolves_to?.[0]?.species?.name || pokemon.name };
                }
                return pokemon;
            });
            return { pokemonList: updatedPokemonList, selectedPokemon: updatedPokemonList.find((p) => p.pokeId === pokemonId) };
        });
    },
}));
