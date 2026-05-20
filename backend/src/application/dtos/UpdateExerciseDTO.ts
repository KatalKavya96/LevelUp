import { z } from "zod";
import { createExerciseSchema } from "./CreateExerciseDTO";

export const updateExerciseSchema = createExerciseSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required."
  });

export type UpdateExerciseDTO = z.infer<typeof updateExerciseSchema>;
