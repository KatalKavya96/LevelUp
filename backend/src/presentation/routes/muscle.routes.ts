import { Router } from "express";
import { MuscleService } from "../../application/services/MuscleService";
import { MuscleRepository } from "../../infrastructure/repositories/MuscleRepository";
import { MuscleController } from "../controllers/MuscleController";

const router = Router();
const muscleRepository = new MuscleRepository();
const muscleService = new MuscleService(muscleRepository);
const muscleController = new MuscleController(muscleService);

router.get("/", muscleController.getAll);
router.get("/:slug", muscleController.getBySlug);

export default router;
