import { ExerciseEntity } from "../entities/Exercise.entity";
import { CreateExerciseDTO } from "../../application/dtos/CreateExerciseDTO";
import { UpdateExerciseDTO } from "../../application/dtos/UpdateExerciseDTO";

export interface ExerciseFilters {
  muscleSlug?: string;
}

export interface IExerciseRepository {
  findAll(filters?: ExerciseFilters): Promise<ExerciseEntity[]>;
  findById(id: string): Promise<ExerciseEntity | null>;
  findBySlug(slug: string): Promise<ExerciseEntity | null>;
  create(data: CreateExerciseDTO): Promise<ExerciseEntity>;
  update(id: string, data: UpdateExerciseDTO): Promise<ExerciseEntity>;
  delete(id: string): Promise<void>;
}
