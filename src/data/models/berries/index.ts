import { z } from "zod";

export const berrySchema = z.object({
    id: z.number(),
    name: z.string(),
    growthTime: z.number(),
    maxHarvest: z.number(),
    naturalGiftPower: z.number(),
    size: z.number(),
    smoothness: z.number(),
    soilDryness: z.number(),
    firmness: z.object({ name: z.string(), url: z.string() }),
    flavors: z.array(
        z.object({
            potency: z.number(),
            flavor: z.object({ name: z.string(), url: z.string() })
        })
    ),
    item: z.object({ name: z.string(), url: z.string() }),
    naturalGiftType: z.object({ name: z.string(), url: z.string() })
});

export type Berry = z.infer<typeof berrySchema>;
