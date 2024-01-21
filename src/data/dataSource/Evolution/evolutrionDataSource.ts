
import { BaseRemoteDataSource } from "../shared/baseDataSource";
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
