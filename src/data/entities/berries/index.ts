import { z } from "zod";

export const berrySchema = z.object({
    id: z.number(),
    name: z.string(),
    firmness: z.object({ name: z.string(), url: z.string() }),
    item: z.object({ name: z.string(), url: z.string() }),
});

export type Berry = z.infer<typeof berrySchema>;