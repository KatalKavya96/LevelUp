export type Difficulty = "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
export type MuscleTargetType = "PRIMARY" | "SECONDARY";

export interface ApiEnvelope<T> {
  success: boolean;
  message: string;
  data: T;
  details?: unknown;
}

export interface Muscle {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ExerciseMuscleTarget {
  id: string;
  type: MuscleTargetType;
  muscle: Muscle;
}

export interface Exercise {
  id: string;
  name: string;
  slug: string;
  description: string;
  difficulty: Difficulty;
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
  muscles: ExerciseMuscleTarget[];
  createdAt: string;
  updatedAt: string;
}
