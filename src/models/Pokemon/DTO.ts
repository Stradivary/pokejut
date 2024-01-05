// PokemonDTO.ts
import { z } from "zod";

export const pokemonDTOSchema = z.object({
    abilities: z.array(z.any()),
    baseExperience: z.number(),
    forms: z.array(z.any()),
    gameIndices: z.array(z.object({ gameIndex: z.number(), version: z.any() })),
    height: z.number(),
    heldItems: z.array(z.object({ item: z.any(), versionDetails: z.array(z.any()) })),
    id: z.number(),
    isDefault: z.boolean(),
    locationAreaEncounters: z.string(),
    moves: z.array(z.any()),
    name: z.string(),
    order: z.number(),
    pastAbilities: z.array(z.unknown()),
    evolutionChain: z.array(z.unknown()),
    pastTypes: z.array(z.unknown()),
    species: z.object({ name: z.string(), url: z.string() }),
    sprites: z.any(),
    stats: z.array(z.any()),
    types: z.array(z.any()),
    weight: z.number()
});

export type PokemonDTO = z.infer<typeof pokemonDTOSchema>;
