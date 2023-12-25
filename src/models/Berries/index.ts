import { z } from "zod";

export const berrySchema = z.object({
    id: z.number(),
    name: z.string(),
    growth_time: z.number(),
    max_harvest: z.number(),
    natural_gift_power: z.number(),
    size: z.number(),
    smoothness: z.number(),
    soil_dryness: z.number(),
    firmness: z.object({ name: z.string(), url: z.string() }),
    flavors: z.array(
        z.object({
            potency: z.number(),
            flavor: z.object({ name: z.string(), url: z.string() })
        })
    ),
    item: z.object({ name: z.string(), url: z.string() }),
    natural_gift_type: z.object({ name: z.string(), url: z.string() })
});

export type Berry = z.infer<typeof berrySchema>;