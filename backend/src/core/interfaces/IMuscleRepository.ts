import { MuscleEntity } from "../entities/Muscle.entity";

export interface IMuscleRepository {
  findAll(): Promise<MuscleEntity[]>;
  findBySlug(slug: string): Promise<MuscleEntity | null>;
  findBySlugs(slugs: string[]): Promise<MuscleEntity[]>;
}
