import { PrismaClient } from "@prisma/client";
import { prisma } from "../../config/db.config";
import { MuscleEntity } from "../../core/entities/Muscle.entity";
import { IMuscleRepository } from "../../core/interfaces/IMuscleRepository";

export class MuscleRepository implements IMuscleRepository {
  constructor(private readonly db: PrismaClient = prisma) {}

  public async findAll(): Promise<MuscleEntity[]> {
    const muscles = await this.db.muscle.findMany({
      orderBy: { name: "asc" }
    });

    return muscles;
  }

  public async findBySlug(slug: string): Promise<MuscleEntity | null> {
    return this.db.muscle.findUnique({
      where: { slug }
    });
  }

  public async findBySlugs(slugs: string[]): Promise<MuscleEntity[]> {
    if (slugs.length === 0) {
      return [];
    }

    return this.db.muscle.findMany({
      where: {
        slug: {
          in: slugs
        }
      }
    });
  }
}
