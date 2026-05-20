import { Prisma, PrismaClient } from "@prisma/client";
import { prisma } from "../../config/db.config";
import {
  ExerciseEntity,
  ExerciseMuscleTargetEntity
} from "../../core/entities/Exercise.entity";
import {
  ExerciseFilters,
  IExerciseRepository
} from "../../core/interfaces/IExerciseRepository";
import { CreateExerciseDTO } from "../../application/dtos/CreateExerciseDTO";
import { UpdateExerciseDTO } from "../../application/dtos/UpdateExerciseDTO";

type ExerciseRecord = Prisma.ExerciseGetPayload<{
  include: {
    muscles: {
      include: {
        muscle: true;
      };
    };
  };
}>;

const exerciseInclude = {
  muscles: {
    include: {
      muscle: true
    },
    orderBy: {
      type: "asc" as const
    }
  }
};

export class ExerciseRepository implements IExerciseRepository {
  constructor(private readonly db: PrismaClient = prisma) {}

  public async findAll(filters: ExerciseFilters = {}): Promise<ExerciseEntity[]> {
    const exercises = await this.db.exercise.findMany({
      where: filters.muscleSlug
        ? {
            muscles: {
              some: {
                muscle: {
                  slug: filters.muscleSlug
                }
              }
            }
          }
        : undefined,
      include: exerciseInclude,
      orderBy: { name: "asc" }
    });

    return exercises.map((exercise) => this.mapExercise(exercise));
  }

  public async findById(id: string): Promise<ExerciseEntity | null> {
    const exercise = await this.db.exercise.findUnique({
      where: { id },
      include: exerciseInclude
    });

    return exercise ? this.mapExercise(exercise) : null;
  }

  public async findBySlug(slug: string): Promise<ExerciseEntity | null> {
    const exercise = await this.db.exercise.findUnique({
      where: { slug },
      include: exerciseInclude
    });

    return exercise ? this.mapExercise(exercise) : null;
  }

  public async create(data: CreateExerciseDTO): Promise<ExerciseEntity> {
    const exercise = await this.db.exercise.create({
      data: {
        ...this.toCreateScalarData(data),
        muscles: {
          create: this.buildMuscleTargets(
            data.primaryMuscleSlug,
            data.secondaryMuscleSlugs
          )
        }
      },
      include: exerciseInclude
    });

    return this.mapExercise(exercise);
  }

  public async update(id: string, data: UpdateExerciseDTO): Promise<ExerciseEntity> {
    const targetUpdateRequested =
      data.primaryMuscleSlug !== undefined ||
      data.secondaryMuscleSlugs !== undefined;

    const existing = targetUpdateRequested
      ? await this.findById(id)
      : null;

    const primaryMuscleSlug =
      data.primaryMuscleSlug ??
      existing?.muscles.find((target) => target.type === "PRIMARY")?.muscle.slug;

    const secondaryMuscleSlugs =
      data.secondaryMuscleSlugs ??
      existing?.muscles
        .filter((target) => target.type === "SECONDARY")
        .map((target) => target.muscle.slug) ??
      [];

    const exercise = await this.db.exercise.update({
      where: { id },
      data: {
        ...this.toUpdateScalarData(data),
        ...(targetUpdateRequested && primaryMuscleSlug
          ? {
              muscles: {
                deleteMany: {},
                create: this.buildMuscleTargets(
                  primaryMuscleSlug,
                  secondaryMuscleSlugs
                )
              }
            }
          : {})
      },
      include: exerciseInclude
    });

    return this.mapExercise(exercise);
  }

  public async delete(id: string): Promise<void> {
    await this.db.exercise.delete({
      where: { id }
    });
  }

  private buildMuscleTargets(
    primaryMuscleSlug: string,
    secondaryMuscleSlugs: string[]
  ) {
    const uniqueSecondarySlugs = Array.from(
      new Set(secondaryMuscleSlugs.filter((slug) => slug !== primaryMuscleSlug))
    );

    return [
      {
        type: "PRIMARY" as const,
        muscle: {
          connect: { slug: primaryMuscleSlug }
        }
      },
      ...uniqueSecondarySlugs.map((slug) => ({
        type: "SECONDARY" as const,
        muscle: {
          connect: { slug }
        }
      }))
    ];
  }

  private toCreateScalarData(data: CreateExerciseDTO): Prisma.ExerciseCreateInput {
    return {
      name: data.name,
      slug: data.slug,
      description: data.description,
      difficulty: data.difficulty,
      recommendedSets: data.recommendedSets,
      recommendedReps: data.recommendedReps,
      restTimeSeconds: data.restTimeSeconds,
      timerDurationSeconds: data.timerDurationSeconds ?? null,
      animationUrl: data.animationUrl ?? null,
      muscleImageUrl: data.muscleImageUrl ?? null,
      equipment: data.equipment,
      instructions: data.instructions,
      commonMistakes: data.commonMistakes,
      benefits: data.benefits
    };
  }

  private toUpdateScalarData(data: UpdateExerciseDTO): Prisma.ExerciseUpdateInput {
    const scalarData: Prisma.ExerciseUpdateInput = {};

    if (data.name !== undefined) scalarData.name = data.name;
    if (data.slug !== undefined) scalarData.slug = data.slug;
    if (data.description !== undefined) scalarData.description = data.description;
    if (data.difficulty !== undefined) scalarData.difficulty = data.difficulty;
    if (data.recommendedSets !== undefined) {
      scalarData.recommendedSets = data.recommendedSets;
    }
    if (data.recommendedReps !== undefined) {
      scalarData.recommendedReps = data.recommendedReps;
    }
    if (data.restTimeSeconds !== undefined) {
      scalarData.restTimeSeconds = data.restTimeSeconds;
    }
    if (data.timerDurationSeconds !== undefined) {
      scalarData.timerDurationSeconds = data.timerDurationSeconds;
    }
    if (data.animationUrl !== undefined) scalarData.animationUrl = data.animationUrl;
    if (data.muscleImageUrl !== undefined) {
      scalarData.muscleImageUrl = data.muscleImageUrl;
    }
    if (data.equipment !== undefined) scalarData.equipment = data.equipment;
    if (data.instructions !== undefined) scalarData.instructions = data.instructions;
    if (data.commonMistakes !== undefined) {
      scalarData.commonMistakes = data.commonMistakes;
    }
    if (data.benefits !== undefined) scalarData.benefits = data.benefits;

    return scalarData;
  }

  private mapExercise(exercise: ExerciseRecord): ExerciseEntity {
    return {
      id: exercise.id,
      name: exercise.name,
      slug: exercise.slug,
      description: exercise.description,
      difficulty: exercise.difficulty,
      recommendedSets: exercise.recommendedSets,
      recommendedReps: exercise.recommendedReps,
      restTimeSeconds: exercise.restTimeSeconds,
      timerDurationSeconds: exercise.timerDurationSeconds,
      animationUrl: exercise.animationUrl,
      muscleImageUrl: exercise.muscleImageUrl,
      equipment: exercise.equipment,
      instructions: exercise.instructions as string[],
      commonMistakes: exercise.commonMistakes as string[],
      benefits: exercise.benefits as string[],
      muscles: exercise.muscles.map((target) => ({
        id: target.id,
        type: target.type,
        muscle: target.muscle
      })) as ExerciseMuscleTargetEntity[],
      createdAt: exercise.createdAt,
      updatedAt: exercise.updatedAt
    };
  }
}
