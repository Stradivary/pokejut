import { UseQueryOptions, infiniteQueryOptions, queryOptions, useQuery, useSuspenseInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { BaseRemoteDataSource } from "../shared/baseDataSource";
import PokemonRepository from "@/data/repository/pokemonRepositoryRestImpl";
import { PokemonAdapter } from "./adapter";

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

const PokemonQueryInfinite = (filter) =>
    infiniteQueryOptions({
        queryKey: [entity, "getAll", filter],
        queryFn: async ({ pageParam = 0 }) => {
            return pokemonRepository.getPokemonList({ offset: pageParam ?? 0, limit: filter?.limit ?? 10 });
        },
        initialPageParam: 0,
        getNextPageParam: (lastPage) => {
            const { offset } = getOffsetAndLimitFromUrl(lastPage.next);
            return lastPage.next ? offset : 0;
        },
    });

export const usePokemonGetEveryting = () => {
    return useQuery(pokemonOptions('all', {
        offset: 0,
        limit: 2000,
    }, async () => {
        return PokemonAdapter.fromDTO(await pokeApiDataSource.getAll({ params: { offset: 0, limit: 2000 } }));
    }));
};

export const usePokemonGetAll = (filter: { offset: number; limit: number; }) => {
    return useQuery(pokemonOptions('getAll', filter, async () => {
        const payload = new URLSearchParams({
            offset: String(filter.offset) || "0",
            limit: String(filter.limit) || "10",
        }).toString();
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?${payload}`);
        return res.data;
    }));
};

export const usePokemonGetByName = (name: string) => {
    return useQuery(pokemonOptions('getByName', name, async () => {
        return await pokeApiDataSource.getOne(name);
    }));
};

const getOffsetAndLimitFromUrl = (url?: string) => {
    if (!url) return { offset: 0, limit: 10 };
    const urlParams = new URLSearchParams(url.split("?")[1]);
    return {
        offset: Number(urlParams.get("offset")),
        limit: Number(urlParams.get("limit")),
    };
};

export const usePokemonInfiniteGetAll = (filter: { limit: number; }) => {
    return useSuspenseInfiniteQuery(PokemonQueryInfinite(filter));
};

