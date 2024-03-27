import { EvolutionChain } from "@/domain/use-cases/entities/evolution";

import { BaseRemoteDataSource } from "../../data-source/shared/baseDataSource";
import { queryOptions, useQuery } from "@tanstack/react-query";
import axios from "axios";

const entity = 'evolutions';

const pokeApiDataSource = new BaseRemoteDataSource('evolution');

const evolutionOptions = (action: string, params: any, fn: () => Promise<any>) => {
    return queryOptions({
        queryKey: [entity, action, params],
        queryFn: async () => fn(),
        staleTime: Infinity,
    });
};

export const useEvolutionGetAll = (filter: { offset: number; limit: number; }) => {
    return useQuery(evolutionOptions('getAll', filter, async () => {
        return await pokeApiDataSource.getAll({ params: filter });
    }));
};

export const useEvolutionGetByName = (name: string) => {
    return useQuery(evolutionOptions('getByName', { name }, async () => {
        return await pokeApiDataSource.getOne(name).then((res) => res.data);
    }));
};


export const usePokemonGetEvolutionChain = (evolutionChain?: string) => {
    return useQuery({
        queryKey: ["pokemon", "evolutionChain", evolutionChain],
        queryFn: async () => await axios.get(`https://pokeapi.co/api/v2/evolution-chain/${evolutionChain}`).then((res) => res.data),
        enabled: !!evolutionChain,
    });
};

export const usePokemonGetSpecies = (id?: string) => {
    return useQuery({
        queryKey: ["pokemon", "species", id],
        queryFn: async () => await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`).then((res) => res.data),
        enabled: !!id,
    });
};


export const useEvolutionChainByPokemonName = (name?: string) => {
    const { data: species } = usePokemonGetSpecies(name);
    const { data: evolutionChain } = usePokemonGetEvolutionChain(species?.evolution_chain?.url.split('/').reverse()[1]);

    return {
        data: evolutionChain,
    };
};

export function findEvolutionChain(data: EvolutionChain | null, currentSpecies: string): EvolutionChain | null {
    // Check if data is null or undefined
    if (!data) {
        return null;
    }

    // Check if species property exists and matches the current species
    if (data?.species?.toLowerCase() === currentSpecies.toLowerCase()) {
        return data;
    }
    // Iterate through evolves_to array if it exists
    if (data.evolves_to) {
        for (const evolution of data.evolves_to) {
            // Recursive call with additional null check
            const nextEvolution = findEvolutionChain(evolution, currentSpecies);
            if (!nextEvolution) {
                continue;
            }
            return nextEvolution;
        }
    }

    // Return null if no matching species or next evolution is found
    return null;
}