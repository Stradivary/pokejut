import { z } from "zod";

export const pokemonItemSchema = z.object({
    attributes: z.array(z.object({ name: z.string(), url: z.string() })),
    category: z.object({ name: z.string(), url: z.string() }),
    cost: z.number(),
    id: z.number(),
    name: z.string(),
    sprites: z.object({ default: z.string() })
});


export type PokemonItem = z.infer<typeof pokemonItemSchema>;


