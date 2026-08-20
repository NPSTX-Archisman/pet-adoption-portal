import { z } from "zod";

export const UpdatePetSchema =
  z.object({
    name: z.string().min(1).optional(),

    breed: z.string().optional(),

    age: z.number().min(0).optional(),

    imageUrl: z.url().optional(),

    description: z.string().optional(),

    weight: z.number().min(0).optional(),

    vaccinated: z.boolean().optional(),

    neutered: z.boolean().optional(),
  });