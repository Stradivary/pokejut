import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { Berry } from '@/domain/entities/Berries';
import { Pokemon } from '@/domain/entities/Pokemon';
import { PokemonEvolution } from "@/domain/entities/Evolution";
import { notifications } from '@mantine/notifications';
import { getBerryGain } from '../berry';

import { persist, createJSONStorage } from 'zustand/middleware';
import { PokemonAdapter } from '@/data/dataSource/Pokemon/adapter';

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
    evolveSelectedPokemon: (evolvedPokemon: PokemonState) => void;
};

export const berriesGain: Record<string, number> = {
    'very-soft': 2,
    'soft': 3,
    'hard': 5,
    'very-hard': 8,
    'super-hard': 10,
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
                                message: `Kamu memberi berri dengan firmness yang sama, berat ${selectedPokemon.name} berkurang ${weightLoss} kg!`,
                                color: "red",
                                icon: <img src="/pokeball.png" alt="pokeball" />,
                                autoClose: 2000,
                            });
                        } else {
                            notifications.show({
                                title: "Yay!",
                                message: `Kamu memberi berri dengan firmness ${berryFirmness}, berat ${selectedPokemon.name} bertambah ${weightGain} kg!`,
                                color: "teal",
                                icon: <img src="/pokeball.png" alt="pokeball" />,
                                autoClose: 2000,
                            });
                            selectedPokemon.weight += weightGain;
                        }

                        selectedPokemon.fedBerries = [...selectedPokemon.fedBerries, berry.firmness?.name ?? ""];


                        updatedPokemonList[selectedPokemonIndex] = selectedPokemon;

                        return { pokemonList: updatedPokemonList, selectedPokemon: selectedPokemon };
                    }

                    return state;
                });
            },
            addPokemon: (pokemon) => {
                const newPokemon: PokemonState = {
                    ...PokemonAdapter.fromDTO(pokemon as any),
                    pokeId: uuidv4(),
                    fedBerries: [],
                };
                set((state) => ({ pokemonList: [...state.pokemonList, newPokemon], selectedPokemon: newPokemon }));
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
                            icon: <img src="/pokeball.png" alt="pokeball" />,
                            autoClose: 2000,
                        });
                        return { pokemonList: updatedPokemonList, selectedPokemon: selectedPokemon };
                    } else {
                        notifications.show({
                            title: "Uh oh!",
                            message: `You don't have a Pokemon selected!`,
                            color: "red",
                            icon: <img src="/pokeball.png" alt="pokeball" />,
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
