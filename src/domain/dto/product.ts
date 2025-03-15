import { z } from "zod";

export const CreateProductDTO = z.object({
  name: z.string(),
  price: z.number(),
  description: z.string(),
  categoryId: z.string(),
  image: z.string(),
  category: z.string(),
  stock: z.number().default(100)
});
