import { z } from "zod";

export const PokemonSchema = z.object({
    id: z.number(),
    name: z.string(),
    height: z.number(),
    weight: z.number(),
    species: z.object({ name: z.string().optional(), url: z.string().optional(), }).optional(),
    types: z.array(z.any()).optional(),
    stats: z.object({ hp: z.number(), attack: z.number(), defense: z.number(), speed: z.number() }).optional(),
    sprites: z.object({
        front_default: z.string().optional(),
        other: z.object({
            "dream_world": z.object({ front_default: z.string().optional(), }).optional(),
            "official-artwork": z.object({ front_default: z.string().optional(), }).optional(),
            "home": z.object({ front_default: z.string().optional(), }).optional(),
        }).optional(),
    })
});

export type Pokemon = z.infer<typeof PokemonSchema>;
