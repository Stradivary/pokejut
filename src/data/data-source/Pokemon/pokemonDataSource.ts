import { pokemonInternalRepo } from "@/data/repository/pokemonRepositoryInternalImpl";
import PokemonRepository from "@/data/repository/pokemonRepositoryRestImpl";
import { UseQueryOptions, infiniteQueryOptions, queryOptions, useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BaseRemoteDataSource } from "../shared/baseDataSource";

const entity = 'pokemon';

const pokeApiDataSource = new BaseRemoteDataSource('pokemon');
const pokemonRepository = new PokemonRepository();

const pokemonOptions = (action: string, params: any, fn: () => Promise<any>, opts?: UseQueryOptions<any, Error, any, any[]>) => {
    return queryOptions({
        queryKey: [entity, action, params],
        queryFn: async () => fn(),
        staleTime: Infinity,
        ...opts,
    });
};

// const PokemonQueryInfinite = (filter) =>
//     infiniteQueryOptions({
//         queryKey: [entity, "getAll", filter],
//         queryFn: async ({ pageParam = 0 }) => {
//             return pokemonRepository.getPokemonList({ offset: pageParam ?? 0, limit: filter?.limit ?? 10 });
//         },
//         initialPageParam: 0,
//         getNextPageParam: (lastPage) => {
//             const { offset } = getOffsetAndLimitFromUrl(lastPage.next);
//             return lastPage.next ? offset : 0;
//         },
//     });

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
        return await pokeApiDataSource.getOne(name);
    }));
};

export const getOffsetAndLimitFromUrl = (url?: string) => {
    if (!url) return { offset: 0, limit: 10 };
    const urlParams = new URLSearchParams(url.split("?")[1]);
    return {
        offset: Number(urlParams.get("offset")),
        limit: Number(urlParams.get("limit")),
    };
};



export const usePokemonInfiniteGetAllInternal = (filter: {
    pageSize: number;
    q?: string; // General search query
    filter?: {
        type?: string; // Filter by type
    };
}) => {
    return useInfiniteQuery(PokemonQueryInfiniteInternal(filter));
};

