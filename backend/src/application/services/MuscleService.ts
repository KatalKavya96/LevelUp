import { MuscleEntity } from "../../core/entities/Muscle.entity";
import { IMuscleRepository } from "../../core/interfaces/IMuscleRepository";
import { AppError } from "../../shared/errors/AppError";

export class MuscleService {
  constructor(private readonly muscleRepository: IMuscleRepository) {}

  public async getAllMuscles(): Promise<MuscleEntity[]> {
    return this.muscleRepository.findAll();
  }

  public async getMuscleBySlug(slug: string): Promise<MuscleEntity> {
    const muscle = await this.muscleRepository.findBySlug(slug);

    if (!muscle) {
      throw new AppError(404, `Muscle '${slug}' was not found.`);
    }

    return muscle;
  }
}
