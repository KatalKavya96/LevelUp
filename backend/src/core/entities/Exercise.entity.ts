import { MuscleEntity } from "./Muscle.entity";

export type ExerciseDifficulty = "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
export type MuscleTargetType = "PRIMARY" | "SECONDARY";

export interface ExerciseMuscleTargetEntity {
  id: string;
  type: MuscleTargetType;
  muscle: MuscleEntity;
}

export interface ExerciseEntity {
  id: string;
  name: string;
  slug: string;
  description: string;
  difficulty: ExerciseDifficulty;
  recommendedSets: number;
  recommendedReps: string;
  restTimeSeconds: number;
  timerDurationSeconds: number | null;
  animationUrl: string | null;
  muscleImageUrl: string | null;
  equipment: string;
  instructions: string[];
  commonMistakes: string[];
  benefits: string[];
  muscles: ExerciseMuscleTargetEntity[];
  createdAt: Date;
  updatedAt: Date;
}
