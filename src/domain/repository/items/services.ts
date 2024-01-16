import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { PokemonItem } from "../../entities/Items";

export const useItemGetEveryting = () => {
    return useQuery({
        queryKey: ["item", "all"],
        queryFn: () => axios.get("https://pokeapi.co/api/v2/item?limit=2000").then((res) => res.data),
        staleTime: Infinity,
    });
};

export const useItemGetAll = (filter: { offset: number; limit: number; }) => {
    return useQuery({
        queryKey: ["item", "getAll", filter],
        queryFn: async () => {
            const payload = new URLSearchParams({
                offset: String(filter.offset) || "0",
                limit: String(filter.limit) || "10",
            }).toString();
            const res = await axios.get(`https://pokeapi.co/api/v2/item?${payload}`);
            return res.data;
        },
    });
};


export const useItemGetByName = (name?: string) => {
    return useQuery<PokemonItem>({
        queryKey: ["item", name],
        queryFn: async () => await axios.get(`https://pokeapi.co/api/v2/item/${name}`).then((res) => res.data),
        enabled: !!name,
    });
};

