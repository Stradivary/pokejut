import { pokemonInternalRepo } from "@/domain/repository/pokemonRepositoryInternalImpl";
import { UseQueryOptions, infiniteQueryOptions, queryOptions, useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { BaseRemoteDataSource } from "../../data-source/shared/baseDataSource";

const entity = 'pokemon';

const pokeApiDataSource = new BaseRemoteDataSource('pokemon');

const pokemonOptions = (action: string, params: any, fn: () => Promise<any>, opts?: UseQueryOptions<any, Error, any, any[]>) => {
    return queryOptions({
        queryKey: [entity, action, params],
        queryFn: async () => fn(),
        staleTime: Infinity,
        ...opts,
    });
};

const PokemonQueryInfiniteInternal = (filter) =>
    infiniteQueryOptions({
        queryKey: [entity, "getAll", filter],
        queryFn: async ({ pageParam = 0 }) => {
            return pokemonInternalRepo.getPokemonsByPage({ page: pageParam ?? 0, pageSize: filter?.pageSize ?? 10, q: filter?.q, filter: filter?.filter });
        },
        initialPageParam: 0,
        getNextPageParam: (lastPage) => {
            return lastPage?.meta?.hasNextPage ? lastPage?.meta?.nextPage : undefined;
        },

    });

export const usePokemonGetByName = (name: string) => {
    return useQuery(pokemonOptions('getByName', name, async () => {
        const pokemon = await pokeApiDataSource.getOne(name);
        return pokemon;
    }));
};


export const usePokemonInfiniteGetAllInternal = (filter: {
    pageSize: number;
    q?: string;
    filter?: {
        type?: string;
    };
}) => {
    return useInfiniteQuery(PokemonQueryInfiniteInternal(filter));
};

