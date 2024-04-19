import { z } from "zod";

const EvolveToSchema = z.object({
    species: z.object({ name: z.string(), url: z.string() }),
    evolves_to: z.array(z.lazy(() => EvolveToSchema))
});

const EvolutionChainSchema = z.object({
    is_baby: z.boolean(),
    species: z.object({ name: z.string(), url: z.string() }),
    evolves_to: z.array(z.lazy(() => EvolveToSchema))
});

export const pokemonEvolutionSchema = z.object({
    id: z.number(),
    baby_trigger_item: z.null(),
    chain: EvolutionChainSchema
});

export type PokemonEvolution = z.infer<typeof pokemonEvolutionSchema>;

export type EvolutionChain = z.infer<typeof EvolutionChainSchema>;

export type EvolveTo = z.infer<typeof EvolveToSchema>;