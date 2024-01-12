import { useQuery, useSuspenseInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { Pokemon } from "../../models/Pokemon";

/**
 * Retrieves all the information about every Pokemon.
 *
 * @return {QueryResult} The result of the query, containing the information about every Pokemon.
 */
export const usePokemonGetEveryting = () => {
    return useQuery({
        queryKey: ["pokemon", "all"],
        queryFn: () => axios.get("https://pokeapi.co/api/v2/pokemon?limit=2000").then((res) => res.data),
        staleTime: Infinity,
    });
};

/**
 * Retrieves a list of Pokémon based on the provided filter options.
 *
 * @param {Object} filter - The filter options for the Pokémon list.
 * @param {number} filter.offset - The offset for pagination.
 * @param {number} filter.limit - The maximum number of Pokémon to retrieve.
 * @return {Promise<any>} A promise that resolves to the list of Pokémon.
 */
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

/**
 * Extracts the offset and limit values from the given URL string.
 *
 * @param {string} url - The URL string from which to extract the offset and limit values.
 * @return {Object} An object containing the extracted offset and limit values.
 */
const getOffsetAndLimitFromUrl = (url?: string) => {
    if (!url) return { offset: 0, limit: 10 };
    const urlParams = new URLSearchParams(url.split("?")[1]);
    return {
        offset: Number(urlParams.get("offset")),
        limit: Number(urlParams.get("limit")),
    };
};

/**
 * Retrieves all Pokemon data using an infinite query.
 *
 * @param {Object} filter - The filter object containing the limit.
 * @param {number} filter.limit - The maximum number of Pokemon to retrieve.
 * @return {Object} - The result of the query containing Pokemon data.
 */
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

/**
 * A hook that fetches a Pokemon by name from the PokeAPI.
 *
 * @param {string} name - The name of the Pokemon to fetch.
 * @return {QueryResult<Pokemon>} The result of the query, containing the Pokemon data.
 */
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

export const usePokemonGetByMove = (move?: string) => {
    return useQuery({
        queryKey: ["pokemon", "move", move],
        queryFn: async () => await axios.get(`https://pokeapi.co/api/v2/move/${move}`).then((res) => res.data),
        enabled: !!move,
    });
};

export const usePokemonGetByWeakness = (weakness?: string) => {
    return useQuery({
        queryKey: ["pokemon", "weakness", weakness],
        queryFn: async () => await axios.get(`https://pokeapi.co/api/v2/type/${weakness}`).then((res) => res.data),
        enabled: !!weakness,
    });
};

export const usePokemonGetEvolutionChain = (evolutionChain?: string) => {
    return useQuery({
        queryKey: ["pokemon", "evolutionChain", evolutionChain],
        queryFn: async () => await axios.get(`https://pokeapi.co/api/v2/evolution-chain/${evolutionChain}`).then((res) => res.data),
        enabled: !!evolutionChain,
    });
};