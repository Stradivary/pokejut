
import { queryOptions, useQuery } from "@tanstack/react-query";
import { BaseRemoteDataSource } from "../../data-source/shared/baseDataSource";

const entity = 'berries';

const pokeApiDataSource = new BaseRemoteDataSource('berry');

const berryOptions = (action: string, params: any, fn: () => Promise<any>) => {
    return queryOptions({
        queryKey: [entity, action, params],
        queryFn: async () => fn(),
        staleTime: Infinity,
    });
};

export const useBerryGetAll = (filter: { offset: number; limit: number; }) => {
    return useQuery(berryOptions('getAll', filter, async () => {
        return await pokeApiDataSource.getAll({ params: filter });
    }));
};

export const useBerryGetByName = (name: string) => {
    return useQuery(berryOptions('getByName', name, async () => {
        return await pokeApiDataSource.getOne(name);
    }));
};


export const berriesGain: Record<string, number> = {
    'very-soft': 2,
    'soft': 3,
    'hard': 5,
    'very-hard': 8,
    'super-hard': 10,
};

export const getBerryGain = (firmness?: string) => {
    return berriesGain[firmness ?? ""] ?? 1;
}; 