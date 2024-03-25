import { z } from "zod";

export const pokemonItemSchema = z.object({
    attributes: z.array(z.object({ name: z.string(), url: z.string() })),
    category: z.object({ name: z.string(), url: z.string() }),
    cost: z.number(),
    effectEntries: z.array(
        z.object({
            effect: z.string(),
            language: z.object({ name: z.string(), url: z.string() }),
            shortEffect: z.string()
        })
    ),
    flavorTextEntries: z.array(
        z.object({
            language: z.object({ name: z.string(), url: z.string() }),
            text: z.string(),
            versionGroup: z.object({ name: z.string(), url: z.string() })
        })
    ),
    flingEffect: z.object({ name: z.string(), url: z.string() }),
    flingPower: z.number(),
    gameIndices: z.array(
        z.object({
            gameIndex: z.number(),
            generation: z.object({ name: z.string(), url: z.string() })
        })
    ),
    heldByPokemon: z.array(
        z.object({
            pokemon: z.object({ name: z.string(), url: z.string() }),
            versionDetails: z.array(
                z.object({
                    rarity: z.number(),
                    version: z.object({ name: z.string(), url: z.string() })
                })
            )
        })
    ),
    id: z.number(),
    machines: z.array(z.unknown()),
    name: z.string(),
    names: z.array(
        z.object({
            language: z.object({ name: z.string(), url: z.string() }),
            name: z.string()
        })
    ),
    sprites: z.object({ default: z.string() })
});

export type PokemonItem = z.infer<typeof pokemonItemSchema>;
