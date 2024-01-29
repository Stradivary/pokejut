import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { Berry } from '@/domain/entities/Berries';
import { Pokemon } from '@/domain/entities/Pokemon';
import { PokemonEvolution } from "@/domain/entities/Evolution";
import { notifications } from '@mantine/notifications';
import { getBerryGain } from '../berry';

import { persist, createJSONStorage } from 'zustand/middleware';

export type BerryState = Partial<Berry>;

export type PokemonState = Partial<Omit<Pokemon, 'weight'>> & Partial<Omit<PokemonEvolution, 'id'>> & {
    pokeId: string;
    fedBerries: string[];
    weight: number;
};

export type PokemonStore = {
    selectedPokemon: PokemonState | undefined;
    selectedPokemonEvolutionName: string | undefined;
    pokemonList: PokemonState[];
    setSelectedPokemon: (pokemon: PokemonState | undefined) => void;
    deleteSelectedPokemon: () => void;
    releaseSelectedPokemon: () => void;
    catchPokemon: (pokemon: Pokemon) => void;
    feedPokemon: (pokemonId: string, berry: BerryState) => void;
    addPokemon: (pokemon: Pokemon) => void;
    checkifSelectedPokemonCanEvolve: () => void;
    evolveSelectedPokemon: (evolvedPokemon: PokemonState) => void;
};

export const berriesGain: Record<string, number> = {
    'very-soft': 20,
    'soft': 30,
    'hard': 50,
    'very-hard': 80,
    'super-hard': 100,
};

export const useSimulator = create(
    persist<PokemonStore>(
        (set, get) => ({
            selectedPokemon: undefined,
            selectedPokemonEvolutionName: undefined,
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
            releaseSelectedPokemon: () => {
                set((state) => ({
                    pokemonList: state.pokemonList.filter((pokemon) => pokemon.pokeId !== state.selectedPokemon?.pokeId),
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
                        const weightGain = getBerryGain(berryFirmness);
                        if (latestFedBerry && latestFedBerry === berryFirmness) {
                            const weightLoss = weightGain * 2;
                            selectedPokemon.weight -= weightLoss;
                            notifications.show({
                                title: "Uh oh!",
                                message: `You fed your Pokemon a berry of the same firmness, it lost ${weightLoss} kg!`,
                                color: "red",
                                autoClose: 2000,
                            });
                        } else {
                            notifications.show({
                                title: "Yay!",
                                message: `You fed your Pokemon a berry, it gained ${weightGain} kg!`,
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
                        return { selectedPokemonEvolutionName: evolution?.species?.name };
                    }
                    return state;
                });

            },
            evolveSelectedPokemon: (evolvedPokemon: PokemonState) => {
                set((state) => {

                    if (get().selectedPokemon) {
                        const updatedPokemonList = [...get().pokemonList];
                        const selectedPokemon = {
                            ...get().selectedPokemon,
                            ...evolvedPokemon
                        };

                        const selectedPokemonIndex = updatedPokemonList.findIndex((pokemon) => pokemon.pokeId === selectedPokemon.pokeId);
                        updatedPokemonList[selectedPokemonIndex] = selectedPokemon;


                        notifications.show({
                            title: "Evolution!",
                            message: `Your ${get().selectedPokemon?.name} evolved into ${evolvedPokemon?.species?.name}!`,
                            color: "teal",
                            autoClose: 2000,
                        });
                        return { pokemonList: updatedPokemonList, selectedPokemon: selectedPokemon };
                    } else {
                        notifications.show({
                            title: "Uh oh!",
                            message: `You don't have a Pokemon selected!`,
                            color: "red",
                            autoClose: 2000,
                        });
                    }
                    return state;
                });
            },
        }),
        {
            name: 'pokemon-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
