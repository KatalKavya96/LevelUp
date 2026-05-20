import { Request, Response } from "express";
import { ExerciseService } from "../../application/services/ExerciseService";
import { ApiResponse } from "../../shared/response/ApiResponse";
import { asyncHandler } from "../../shared/utils/asyncHandler";

export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) {}

  public getAll = asyncHandler(async (req: Request, res: Response) => {
    const muscleSlug =
      typeof req.query.muscle === "string" ? req.query.muscle : undefined;

    const exercises = await this.exerciseService.getExercises({
      muscleSlug
    });

    res.json(ApiResponse.success(exercises, "Exercises fetched successfully."));
  });

  public getBySlug = asyncHandler(async (req: Request, res: Response) => {
    const exercise = await this.exerciseService.getExerciseBySlug(req.params.slug);
    res.json(ApiResponse.success(exercise, "Exercise fetched successfully."));
  });

  public create = asyncHandler(async (req: Request, res: Response) => {
    const exercise = await this.exerciseService.createExercise(req.body);
    res.status(201).json(ApiResponse.success(exercise, "Exercise created."));
  });

  public update = asyncHandler(async (req: Request, res: Response) => {
    const exercise = await this.exerciseService.updateExercise(
      req.params.id,
      req.body
    );
    res.json(ApiResponse.success(exercise, "Exercise updated."));
  });

  public delete = asyncHandler(async (req: Request, res: Response) => {
    await this.exerciseService.deleteExercise(req.params.id);
    res.status(204).send();
  });
}
