import { ExerciseEntity } from "../../core/entities/Exercise.entity";
import {
  ExerciseFilters,
  IExerciseRepository
} from "../../core/interfaces/IExerciseRepository";
import { IMuscleRepository } from "../../core/interfaces/IMuscleRepository";
import { CreateExerciseDTO } from "../dtos/CreateExerciseDTO";
import { UpdateExerciseDTO } from "../dtos/UpdateExerciseDTO";
import { AppError } from "../../shared/errors/AppError";

export class ExerciseService {
  constructor(
    private readonly exerciseRepository: IExerciseRepository,
    private readonly muscleRepository: IMuscleRepository
  ) {}

  public async getExercises(filters: ExerciseFilters = {}): Promise<ExerciseEntity[]> {
    if (filters.muscleSlug) {
      const muscle = await this.muscleRepository.findBySlug(filters.muscleSlug);

      if (!muscle) {
        throw new AppError(404, `Muscle '${filters.muscleSlug}' was not found.`);
      }
    }

    return this.exerciseRepository.findAll(filters);
  }

  public async getExerciseBySlug(slug: string): Promise<ExerciseEntity> {
    const exercise = await this.exerciseRepository.findBySlug(slug);

    if (!exercise) {
      throw new AppError(404, `Exercise '${slug}' was not found.`);
    }

    return exercise;
  }

  public async createExercise(data: CreateExerciseDTO): Promise<ExerciseEntity> {
    const existingExercise = await this.exerciseRepository.findBySlug(data.slug);

    if (existingExercise) {
      throw new AppError(409, `Exercise slug '${data.slug}' already exists.`);
    }

    await this.ensureMusclesExist([
      data.primaryMuscleSlug,
      ...data.secondaryMuscleSlugs
    ]);

    return this.exerciseRepository.create(data);
  }

  public async updateExercise(
    id: string,
    data: UpdateExerciseDTO
  ): Promise<ExerciseEntity> {
    const existingExercise = await this.exerciseRepository.findById(id);

    if (!existingExercise) {
      throw new AppError(404, `Exercise '${id}' was not found.`);
    }

    if (data.slug && data.slug !== existingExercise.slug) {
      const exerciseWithSlug = await this.exerciseRepository.findBySlug(data.slug);

      if (exerciseWithSlug) {
        throw new AppError(409, `Exercise slug '${data.slug}' already exists.`);
      }
    }

    const targetSlugs = [
      data.primaryMuscleSlug,
      ...(data.secondaryMuscleSlugs ?? [])
    ].filter((slug): slug is string => Boolean(slug));

    await this.ensureMusclesExist(targetSlugs);

    return this.exerciseRepository.update(id, data);
  }

  public async deleteExercise(id: string): Promise<void> {
    const existingExercise = await this.exerciseRepository.findById(id);

    if (!existingExercise) {
      throw new AppError(404, `Exercise '${id}' was not found.`);
    }

    await this.exerciseRepository.delete(id);
  }

  private async ensureMusclesExist(slugs: string[]): Promise<void> {
    const uniqueSlugs = Array.from(new Set(slugs));
    const muscles = await this.muscleRepository.findBySlugs(uniqueSlugs);
    const foundSlugs = new Set(muscles.map((muscle) => muscle.slug));
    const missingSlugs = uniqueSlugs.filter((slug) => !foundSlugs.has(slug));

    if (missingSlugs.length > 0) {
      throw new AppError(400, "One or more muscle targets are invalid.", {
        missingSlugs
      });
    }
  }
}
