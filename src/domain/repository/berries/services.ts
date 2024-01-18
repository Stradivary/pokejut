
import { BaseRemoteDataSource } from "@/data/dataSource/shared/baseDataSource";
import { queryOptions, useQuery } from "@tanstack/react-query";
import axios from "axios";

const entity = 'berries';

const pokeApiDataSource = new BaseRemoteDataSource('berry');

const berryOptions = (action: string, params: any, fn: () => Promise<any>) => {
    return queryOptions({
        queryKey: [entity, action, params],
        queryFn: async () => fn(),
        staleTime: Infinity,
    });
}

export const useBerryGetAll = (filter: { offset: number; limit: number; }) => {

    return useQuery(berryOptions('getAll', filter, async () => {
        return await pokeApiDataSource.getAll({ params: filter });
    }));
};

export const useBerryGetByName = (name?: string) => {
    return useQuery({
        queryKey: ["berries", name],
        queryFn: async () => await axios.get(`https://pokeapi.co/api/v2/berry/${name}`).then((res) => res.data),
        staleTime: Infinity,
    });
};