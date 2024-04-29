
import { Berry } from "@/data/entities/berries";
import { berriesGain } from "@/utils/constants";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { PokeApiEntityRepository } from "../../repository/pokeApiRepository";

const entity = 'berries';

const PokeApiRepository = new PokeApiEntityRepository<Berry>('berry');

const berryOptions = (action: string, params: any, fn: () => Promise<any>) => {
    return queryOptions({
        queryKey: [entity, action, params],
        queryFn: async () => fn(),
        staleTime: Infinity,
    });
};

export const useBerryGetAll = (filter: { offset: number; limit: number; }) => {
    return useQuery(berryOptions('getAll', filter, async () => {
        return await PokeApiRepository.getAll({ params: filter });
    }));
};

export const useBerryGetByName = (name: string) => {
    return useQuery(berryOptions('getByName', name, async () => {
        return await PokeApiRepository.getOne(name);
    }));
};



export const getBerryGain = (firmness?: string) => {
    return berriesGain[firmness ?? ""] ?? 1;
}; 