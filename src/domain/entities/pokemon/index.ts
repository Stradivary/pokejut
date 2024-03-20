import { z } from "zod";

export const PokemonSchema = z.object({
    id: z.number(),
    name: z.string(),
    height: z.number(),
    weight: z.number(),
    // abilities: z.array(z.string()),
    species: z.object({ name: z.string(), url: z.string() }),
    types: z.array(z.object({ slot: z.number(), type: z.object({ name: z.string(), url: z.string() }) })),
    // stats: z.object({ hp: z.number(), attack: z.number(), defense: z.number(), speed: z.number() }),
    sprites: z.object({
        back_default: z.string(),
        front_default: z.string(),
        other: z.object({
            "official-artwork": z.object({ front_default: z.string() }),
            "home": z.object({ front_default: z.string() })
        })
    })
});

export type Pokemon =  z.infer<typeof PokemonSchema>;
