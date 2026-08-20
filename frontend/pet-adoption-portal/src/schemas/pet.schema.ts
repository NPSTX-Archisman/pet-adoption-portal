import { z } from "zod";

export const petSchema = z.object({
  name: z.string().min(1, "Pet name is required"),

  species: z.string().min(1, "Species is required"),

  age: z.number().min(0,"Age cannot be negative"),

  imageUrl: z.url("Enter a valid image URL"),
});

export type PetFormValues =
  z.infer<typeof petSchema>;