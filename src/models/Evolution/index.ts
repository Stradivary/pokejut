import { z } from "zod";

export const pokemonEvolution = z.object({
    id: z.number(),
    baby_trigger_item: z.null(),
    chain: z.object({
        is_baby: z.boolean(),
        species: z.object({ name: z.string(), url: z.string() }),
        evolution_details: z.null(),
        evolves_to: z.array(
            z.object({
                is_baby: z.boolean(),
                species: z.object({ name: z.string(), url: z.string() }),
                evolution_details: z.array(
                    z.object({
                        item: z.null(),
                        trigger: z.object({ name: z.string(), url: z.string() }),
                        gender: z.null(),
                        held_item: z.null(),
                        known_move: z.null(),
                        known_move_type: z.null(),
                        location: z.null(),
                        min_level: z.number(),
                        min_happiness: z.null(),
                        min_beauty: z.null(),
                        min_affection: z.null(),
                        needs_overworld_rain: z.boolean(),
                        party_species: z.null(),
                        party_type: z.null(),
                        relative_physical_stats: z.null(),
                        time_of_day: z.string(),
                        trade_species: z.null(),
                        turn_upside_down: z.boolean()
                    })
                ),
                evolves_to: z.array(z.unknown())
            })
        )
    })
});

export type PokemonEvolution = z.infer<typeof pokemonEvolution>;
