import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useBerryGetAll = (filter: { offset: number; limit: number; }) => {

    return useQuery({
        queryKey: ["berries", "getAll", filter],
        queryFn: async () => {
            const payload = new URLSearchParams({
                offset: String(filter.offset) || "0",
                limit: String(filter.limit) || "10",
            }).toString();
            const res = await axios.get(`https://pokeapi.co/api/v2/berry?${payload}`);
            return res.data;
        },
    });
};

export const useBerryGetByName = (name?: string) => {
    return useQuery({
        queryKey: ["berries", name],
        queryFn: async () => await axios.get(`https://pokeapi.co/api/v2/berry/${name}`).then((res) => res.data),
        staleTime: Infinity,
    });
};