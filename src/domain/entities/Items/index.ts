import { z } from "zod";

export const pokemonItemSchema = z.object({
    attributes: z.array(z.object({ name: z.string(), url: z.string() })),
    baby_trigger_for: z.null(),
    category: z.object({ name: z.string(), url: z.string() }),
    cost: z.number(),
    effect_entries: z.array(
        z.object({
            effect: z.string(),
            language: z.object({ name: z.string(), url: z.string() }),
            short_effect: z.string()
        })
    ),
    flavor_text_entries: z.array(
        z.object({
            language: z.object({ name: z.string(), url: z.string() }),
            text: z.string(),
            version_group: z.object({ name: z.string(), url: z.string() })
        })
    ),
    fling_effect: z.object({ name: z.string(), url: z.string() }),
    fling_power: z.number(),
    game_indices: z.array(
        z.object({
            game_index: z.number(),
            generation: z.object({ name: z.string(), url: z.string() })
        })
    ),
    held_by_pokemon: z.array(
        z.object({
            pokemon: z.object({ name: z.string(), url: z.string() }),
            version_details: z.array(
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


