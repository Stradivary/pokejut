
import { BaseRemoteDataSource } from "../shared/baseDataSource";
import { queryOptions, useQuery } from "@tanstack/react-query";

const entity = 'types';

const pokeApiDataSource = new BaseRemoteDataSource('type');

const typesOptions = (action: string, params: any, fn: () => Promise<any>) => {
    return queryOptions({
        queryKey: [entity, action, params],
        queryFn: async () => fn(),
        staleTime: Infinity,
    });
};

export const useTypeGetAll = (filter: { offset: number; limit: number; }) => {
    return useQuery(typesOptions('getAll', filter, async () => {
        return await pokeApiDataSource.getAll({ params: filter });
    }));
};

export const useTypeGetByName = (name: string) => {
    return useQuery(typesOptions('getByName', { name }, async () => {
        return await pokeApiDataSource.getOne(name).then((res) => res.data);
    }));
};
