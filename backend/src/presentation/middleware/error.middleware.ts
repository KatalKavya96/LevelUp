import { Prisma } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { AppError } from "../../shared/errors/AppError";

export const notFoundMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  next(new AppError(404, `Route ${req.method} ${req.originalUrl} was not found.`));
};

export const errorMiddleware = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
      details: error.details ?? null
    });
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      return res.status(409).json({
        success: false,
        message: "A record with that unique value already exists.",
        details: error.meta ?? null
      });
    }

    if (error.code === "P2025") {
      return res.status(404).json({
        success: false,
        message: "The requested record was not found.",
        details: error.meta ?? null
      });
    }
  }

  if (error instanceof Prisma.PrismaClientInitializationError) {
    return res.status(503).json({
      success: false,
      message:
        "Database connection failed. Check DATABASE_URL and ensure MySQL is running.",
      details: null
    });
  }

  console.error(error);

  return res.status(500).json({
    success: false,
    message: "Unexpected server error.",
    details: null
  });
};
