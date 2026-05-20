import { Router } from "express";
import { ExerciseService } from "../../application/services/ExerciseService";
import { createExerciseSchema } from "../../application/dtos/CreateExerciseDTO";
import { updateExerciseSchema } from "../../application/dtos/UpdateExerciseDTO";
import { ExerciseRepository } from "../../infrastructure/repositories/ExerciseRepository";
import { MuscleRepository } from "../../infrastructure/repositories/MuscleRepository";
import { ExerciseController } from "../controllers/ExerciseController";
import { validate } from "../middleware/validate.middleware";

const router = Router();
const exerciseRepository = new ExerciseRepository();
const muscleRepository = new MuscleRepository();
const exerciseService = new ExerciseService(exerciseRepository, muscleRepository);
const exerciseController = new ExerciseController(exerciseService);

router.get("/", exerciseController.getAll);
router.get("/:slug", exerciseController.getBySlug);
router.post("/", validate(createExerciseSchema), exerciseController.create);
router.patch("/:id", validate(updateExerciseSchema), exerciseController.update);
router.delete("/:id", exerciseController.delete);

export default router;
