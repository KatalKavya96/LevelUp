import { Request, Response } from "express";
import { MuscleService } from "../../application/services/MuscleService";
import { ApiResponse } from "../../shared/response/ApiResponse";
import { asyncHandler } from "../../shared/utils/asyncHandler";

export class MuscleController {
  constructor(private readonly muscleService: MuscleService) {}

  public getAll = asyncHandler(async (_req: Request, res: Response) => {
    const muscles = await this.muscleService.getAllMuscles();
    res.json(ApiResponse.success(muscles, "Muscles fetched successfully."));
  });

  public getBySlug = asyncHandler(async (req: Request, res: Response) => {
    const muscle = await this.muscleService.getMuscleBySlug(req.params.slug);
    res.json(ApiResponse.success(muscle, "Muscle fetched successfully."));
  });
}
