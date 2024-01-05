import { z } from "zod";

const abilitySchema = z.object({
    ability: z.object({ name: z.string(), url: z.string() }),
    is_hidden: z.boolean(),
    slot: z.number()
});

const versionSchema = z.object({
    name: z.string(),
    url: z.string()
});

const versionGroupDetailsSchema = z.object({
    level_learned_at: z.number(),
    move_learn_method: z.object({ name: z.string(), url: z.string() }),
    version_group: versionSchema
});

const itemSchema = z.object({
    name: z.string(),
    url: z.string()
});

const versionDetailsSchema = z.object({
    rarity: z.number(),
    version: versionSchema
});

const moveSchema = z.object({
    move: z.object({ name: z.string(), url: z.string() }),
    version_group_details: z.array(versionGroupDetailsSchema)
});

const spritesSchema = z.object({
    back_default: z.string(),
    back_female: z.null(),
    back_shiny: z.string(),
    back_shiny_female: z.null(),
    front_default: z.string(),
    front_female: z.null(),
    front_shiny: z.string(),
    front_shiny_female: z.null(),
    other: z.object({
        dream_world: z.object({
            front_default: z.string(),
            front_female: z.null()
        }),
        home: z.object({
            front_default: z.string(),
            front_female: z.null(),
            front_shiny: z.string(),
            front_shiny_female: z.null()
        }),
        "official-artwork": z.object({
            front_default: z.string(),
            front_shiny: z.string()
        }),
        showdown: z.object({
            back_default: z.string(),
            back_female: z.null(),
            back_shiny: z.string(),
            back_shiny_female: z.null(),
            front_default: z.string(),
            front_female: z.null(),
            front_shiny: z.string(),
            front_shiny_female: z.null()
        })
    }),
    versions: z.object({
        "generation-i": z.object({
            "red-blue": versionSchema,
            yellow: versionSchema
        }),
        "generation-ii": z.object({
            crystal: versionSchema,
            gold: versionSchema,
            silver: versionSchema
        }),
        "generation-iii": z.object({
            emerald: versionSchema,
            "firered-leafgreen": versionSchema,
            "ruby-sapphire": versionSchema
        }),
        "generation-iv": z.object({
            "diamond-pearl": versionSchema,
            "heartgold-soulsilver": versionSchema,
            platinum: versionSchema
        }),
        "generation-v": z.object({
            "black-white": versionSchema
        }),
        "generation-vi": z.object({
            "omegaruby-alphasapphire": versionSchema,
            "x-y": versionSchema
        }),
        "generation-vii": z.object({
            icons: z.object({ front_default: z.string(), front_female: z.null() }),
            "ultra-sun-ultra-moon": versionSchema
        }),
        "generation-viii": z.object({
            icons: z.object({ front_default: z.string(), front_female: z.null() })
        })
    })
});

const statSchema = z.object({
    base_stat: z.number(),
    effort: z.number(),
    stat: z.object({ name: z.string(), url: z.string() })
});

const typeSchema = z.object({
    slot: z.number(),
    type: z.object({ name: z.string(), url: z.string() })
});

export const PokemonSchema = z.object({
    abilities: z.array(abilitySchema),
    base_experience: z.number(),
    forms: z.array(versionSchema),
    game_indices: z.array(z.object({ game_index: z.number(), version: versionSchema })),
    height: z.number(),
    held_items: z.array(z.object({ item: itemSchema, version_details: z.array(versionDetailsSchema) })),
    id: z.number(),
    is_default: z.boolean(),
    location_area_encounters: z.string(),
    moves: z.array(moveSchema),
    name: z.string(),
    order: z.number(),
    past_abilities: z.array(z.unknown()),
    evolution_chain: z.array(z.unknown()),
    past_types: z.array(z.unknown()),
    species: z.object({ name: z.string(), url: z.string() }),
    sprites: spritesSchema,
    stats: z.array(statSchema),
    types: z.array(typeSchema),
    weight: z.number()
});


export type Pokemon = z.infer<typeof PokemonSchema>;


