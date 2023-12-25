import { useQuery, useSuspenseInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { Pokemon } from "../../models/Pokemon";

export const usePokemonGetEveryting = () => {
    return useQuery({
        queryKey: ["pokemon", "all"],
        queryFn: () => axios.get("https://pokeapi.co/api/v2/pokemon?limit=2000").then((res) => res.data),
        staleTime: Infinity,
    });
};

export const usePokemonGetAll = (filter: { offset: number; limit: number; }) => {

    return useQuery({
        queryKey: ["pokemon", "getAll", filter],
        queryFn: async () => {
            const payload = new URLSearchParams({
                offset: String(filter.offset) || "0",
                limit: String(filter.limit) || "10",
            }).toString();
            const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?${payload}`);
            return res.data;
        },
    });
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
    return useSuspenseInfiniteQuery({
        queryKey: ["pokemon", "getAll", filter],
        queryFn: async ({ pageParam = 0 }) => {
            const payload = new URLSearchParams({
                offset: String(pageParam) || "0",
                limit: String(filter.limit) || "10",
            }).toString();
            const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?${payload}`);
            return res.data;
        },
        initialPageParam: 0,
        getNextPageParam: (lastPage) => {
            const { offset } = getOffsetAndLimitFromUrl(lastPage.next);

            return lastPage.next ? offset : 0;
        },
    });
};

export const usePokemonGetByName = (name?: string) => {
    return useQuery<Pokemon>({
        queryKey: ["pokemon", name],
        queryFn: async () => await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`).then((res) => res.data),
        enabled: !!name,
    });
};

// weakness, type, ability, move, etc...

export const usePokemonGetByType = (type?: string) => {
    return useQuery({
        queryKey: ["pokemon", "type", type],
        queryFn: async () => await axios.get(`https://pokeapi.co/api/v2/type/${type}`).then((res) => res.data),
        enabled: !!type,
    });
};

export const usePokemonGetByAbility = (ability?: string) => {
    return useQuery({
        queryKey: ["pokemon", "ability", ability],
        queryFn: async () => await axios.get(`https://pokeapi.co/api/v2/ability/${ability}`).then((res) => res.data),
        enabled: !!ability,
    });
};

