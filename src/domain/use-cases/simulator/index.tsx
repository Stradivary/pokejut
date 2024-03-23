import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { Berry } from '@/domain/entities/berries';
import { Pokemon } from '@/domain/entities/pokemon';
import { notifications } from '@mantine/notifications';
import { getBerryGain } from '../berry';

import { persist, createJSONStorage } from 'zustand/middleware';
import { PokemonAdapter } from '@/domain/data-source/Pokemon/adapter';
import { storage } from './presistor';
import { type PokemonState } from './PokemonState';

export type BerryState = Partial<Berry>;

export type PokemonStore = {
    selectedPokemonId: string | undefined;
    selectedPokemonEvolutionName: string | undefined;
    pokemonList: PokemonState[];
    selectedPokemon: () => PokemonState | undefined;
    setSelectedPokemon: (pokemon: PokemonState | undefined) => void;
    deleteSelectedPokemon: () => void;
    releaseSelectedPokemon: () => void;
    catchPokemon: (pokemon: any) => void;
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
            selectedPokemonId: undefined,
            selectedPokemonEvolutionName: undefined,
            pokemonList: [],
            selectedPokemon: () => {
                return get().pokemonList.find((pokemon) => pokemon.pokeId === get().selectedPokemonId);
            },
            setSelectedPokemon: (pokemon) => {
                set(() => ({ selectedPokemonId: pokemon?.pokeId }));
            },
            deleteSelectedPokemon: () => {
                set(() => ({ selectedPokemonId: undefined }));
            },
            catchPokemon: (pokemon) => {
                const newPokemon: PokemonState = {
                    ...pokemon,
                    pokeId: uuidv4(),
                    fedBerries: [],
                };
                set((state) => ({ pokemonList: [...state.pokemonList, newPokemon], selectedPokemonId: newPokemon.pokeId }));
            },
            releaseSelectedPokemon: () => {
                set((state) => ({
                    pokemonList: state.pokemonList.filter((pokemon) => pokemon.pokeId !== state.selectedPokemonId),
                    selectedPokemonId: undefined,
                }));
            },
            feedPokemon: (pokemonId, berry) => {
                set((state) => {
                    const selectedPokemonIndex = state.pokemonList.findIndex((pokemon) => pokemon.pokeId === pokemonId);

                    if (selectedPokemonIndex !== -1) {
                        const updatedPokemonList = [...state.pokemonList];
                        const selectedPokemon = { ...updatedPokemonList[selectedPokemonIndex] };

                        const latestFedBerry = selectedPokemon?.fedBerries?.[selectedPokemon?.fedBerries?.length - 1] ?? [];
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

                        if (selectedPokemon.weight < 0) {
                            selectedPokemon.weight = 1;
                            notifications.show({
                                title: "Duh!",
                                message: `Berat ${selectedPokemon.name} sudah tidak bisa berkurang lagi!`,
                                color: "red",
                                icon: <img src="/pokeball.png" alt="pokeball" />,
                                autoClose: 2000,
                            });
                        }

                        selectedPokemon.fedBerries = [...(selectedPokemon?.fedBerries ?? []), berry.firmness?.name ?? ""];


                        updatedPokemonList[selectedPokemonIndex] = selectedPokemon;

                        return { pokemonList: updatedPokemonList, selectedPokemonId: selectedPokemon.pokeId };
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
                set((state) => ({ pokemonList: [...state.pokemonList, newPokemon], selectedPokemonId: newPokemon.pokeId }));
            },

            evolveSelectedPokemon: (evolvedPokemon: PokemonState) => {
                set((state) => {

                    if (get().selectedPokemonId) {
                        const selectedPokemon = get().pokemonList.find((pokemon) => pokemon.pokeId === get().selectedPokemonId);
                        const updatedPokemonList = [...get().pokemonList];
                        const {
                            weight,
                            pokeId,
                            evolves_to,
                        } = selectedPokemon ?? {};
                        const newPokemon = {
                            ...evolvedPokemon,
                            pokeId,
                            weight,
                            evolves_to,
                        } as PokemonState;

                        const selectedPokemonIndex = updatedPokemonList.findIndex((pokemon) => pokemon.pokeId === get().selectedPokemonId);
                        updatedPokemonList[selectedPokemonIndex] = newPokemon;


                        notifications.show({
                            title: "Evolution!",
                            message: `Pokemon ${selectedPokemon?.name} berevolusi menjadi ${evolvedPokemon?.species?.name}!`,
                            color: "teal",
                            icon: <img src="/pokeball.png" alt="pokeball" />,
                            autoClose: 2000,
                        });
                        return { pokemonList: updatedPokemonList };
                    } else {
                        notifications.show({
                            title: "Uh oh!",
                            message: `Kamu tidak memiliki pokemon yang bisa di-evolve!`,
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
            storage: createJSONStorage(() => storage),
        }
    )
);
