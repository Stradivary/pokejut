import { z } from "zod";

export const PokemonSchema = z.object({
    id: z.number(),
    name: z.string(),
    height: z.number(),
    weight: z.number(),
    abilities: z.array(z.string()),
    species: z.object({ name: z.string(), url: z.string() }),
    types: z.array(z.object({ slot: z.number(), type: z.object({ name: z.string(), url: z.string() }) })),
    stats: z.object({ hp: z.number(), attack: z.number(), defense: z.number(), speed: z.number() }),
    sprites: z.object({
        back_default: z.string(),
        other: z.object({
            "official-artwork": z.object({ front_default: z.string() }),
            "home": z.object({ front_default: z.string() })
        })
    })
});

export type Pokemon = {
    id: number;
    name: string;
    height: number;
    weight: number;
    abilities: string[];
    species: {
        name: string;
        url: string;
    };
    types: {
        slot: number;
        type: {
            name: string;
            url: string;
        };
    }[];
    stats: {
        hp: number;
        attack: number;
        defense: number;
        speed: number;
    };
    sprites: {
        back_default: string;
        other: {
            "official-artwork": {
                front_default: string;
            };
            "home": {
                front_default: string;
            };
        }
    };
}

