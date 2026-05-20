import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";
import { AppError } from "../../shared/errors/AppError";

export const validate =
  (schema: ZodSchema) =>
  (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const details = result.error.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message
      }));

      return next(new AppError(400, "Validation failed.", details));
    }

    req.body = result.data;
    return next();
  };
