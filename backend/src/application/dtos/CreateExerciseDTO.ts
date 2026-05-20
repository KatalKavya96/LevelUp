import { z } from "zod";

const slugSchema = z
  .string()
  .trim()
  .min(2)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use a URL-safe kebab-case slug.");

const difficultySchema = z.preprocess(
  (value) => (typeof value === "string" ? value.toUpperCase() : value),
  z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"])
);

const nullableUrlSchema = z
  .string()
  .trim()
  .url()
  .nullable()
  .optional();

export const createExerciseSchema = z
  .object({
    name: z.string().trim().min(2),
    slug: slugSchema,
    description: z.string().trim().min(20),
    difficulty: difficultySchema,
    recommendedSets: z.number().int().positive(),
    recommendedReps: z.string().trim().min(1),
    restTimeSeconds: z.number().int().nonnegative(),
    timerDurationSeconds: z.number().int().nonnegative().nullable().optional(),
    animationUrl: nullableUrlSchema,
    muscleImageUrl: nullableUrlSchema,
    equipment: z.string().trim().min(2),
    instructions: z.array(z.string().trim().min(2)).min(1),
    commonMistakes: z.array(z.string().trim().min(2)).min(1),
    benefits: z.array(z.string().trim().min(2)).min(1),
    primaryMuscleSlug: slugSchema,
    secondaryMuscleSlugs: z.array(slugSchema).default([])
  })
  .strict();

export type CreateExerciseDTO = z.infer<typeof createExerciseSchema>;
