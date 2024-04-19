import { pokemonInternalRepo } from "@/domain/repository/pokemonRepository";
import { UseQueryOptions, infiniteQueryOptions, queryOptions, useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { PokeApiEntityDataSource } from "../../repository/pokeApiRepository";
import { Pokemon } from "@/data/entities/pokemon";

const entity = 'pokemon';

const pokeApiDataSource = new PokeApiEntityDataSource<Pokemon>('pokemon');

const pokemonOptions = (action: string, params: any, fn: () => Promise<any>, opts?: UseQueryOptions<any, Error, any, any[]>) => {
    return queryOptions({
        queryKey: [entity, action, params],
        queryFn: async () => fn(),
        staleTime: Infinity,
        ...opts,
    });
};


export const usePokemonGetByName = (name: string) => {
    return useQuery(pokemonOptions('getByName', name, async () => {
        const pokemon = await pokeApiDataSource.getOne(name);
        return pokemon;
    }));
};


export const usePokemonInfiniteGetAllInternal = (filter: {
    q?: string;
    filter?: string;
}) => {
    const params = {
        ...(filter?.q ? { q: filter.q } : undefined),
        ...(filter?.filter ? { filter: filter.filter } : undefined),
    };
    return useInfiniteQuery(infiniteQueryOptions({
        queryKey: ['pokemon', 'getAll', filter],
        queryFn: async ({ pageParam }) => {
            console.log('pageParam', pageParam);
            return pokemonInternalRepo.getPokemonsByPage({
                page: pageParam,
                ...params,
            });
        },
        initialPageParam: 0,
        getNextPageParam: (lastPage) => {
            return lastPage?.meta?.hasNextPage ? lastPage?.meta?.nextPage : undefined;
        },
    }));
};

