import { UseQueryOptions, queryOptions, useQuery } from "@tanstack/react-query";
import { BaseRemoteDataSource } from "../shared/baseDataSource";
const entity = 'items';

const pokeApiDataSource = new BaseRemoteDataSource('item');

const itemOptions = (action: string, params: any, fn: () => Promise<any>, opts?: Partial<UseQueryOptions<any, Error, any, any[]>>
) => {
    return queryOptions({
        queryKey: [entity, action, params],
        queryFn: async () => fn(),
        staleTime: Infinity,
        ...opts,
    });
};

export const useItemGetAll = (filter: { offset: number; limit: number; }) => {
    return useQuery(itemOptions('getAll', filter, async () => {
        return await pokeApiDataSource.getAll({ params: filter });
    }));
};

export const useItemGetByName = (name?: string) => {
    return useQuery(itemOptions('getByName', name, async () => {
        return await pokeApiDataSource.getOne(name ?? "");
    }, {
        enabled: !!name,
    }));
};



