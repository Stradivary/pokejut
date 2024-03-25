// PokemonEvolution.ts
import { z } from "zod";

export const pokemonEvolutionSchema = z.object({
    id: z.number(),
    babyTriggerItem: z.null(),
    chain: z.object({
        isBaby: z.boolean(),
        species: z.object({ name: z.string(), url: z.string() }),
        evolutionDetails: z.null(),
        evolvesTo: z.array(
            z.object({
                isBaby: z.boolean(),
                species: z.object({ name: z.string(), url: z.string() }),
                evolutionDetails: z.array(
                    z.object({
                        item: z.null(),
                        trigger: z.object({ name: z.string(), url: z.string() }),
                        gender: z.null(),
                        heldItem: z.null(),
                        knownMove: z.null(),
                        knownMoveType: z.null(),
                        location: z.null(),
                        minLevel: z.number(),
                        minHappiness: z.null(),
                        minBeauty: z.null(),
                        minAffection: z.null(),
                        needsOverworldRain: z.boolean(),
                        partySpecies: z.null(),
                        partyType: z.null(),
                        relativePhysicalStats: z.null(),
                        timeOfDay: z.string(),
                        tradeSpecies: z.null(),
                        turnUpsideDown: z.boolean()
                    })
                ),
                evolvesTo: z.array(z.unknown())
            })
        )
    })
});

export type PokemonEvolution = z.infer<typeof pokemonEvolutionSchema>;
