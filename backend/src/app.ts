import cors from "cors";
import express from "express";
import morgan from "morgan";
import { envConfig } from "./config/env.config";
import exerciseRoutes from "./presentation/routes/exercise.routes";
import muscleRoutes from "./presentation/routes/muscle.routes";
import {
  errorMiddleware,
  notFoundMiddleware
} from "./presentation/middleware/error.middleware";
import { ApiResponse } from "./shared/response/ApiResponse";

const app = express();

app.use(
  cors({
    origin: envConfig.frontendUrl,
    credentials: true
  })
);
app.use(express.json({ limit: "1mb" }));
app.use(morgan(envConfig.nodeEnv === "production" ? "combined" : "dev"));

app.get("/health", (_req, res) => {
  res.json(
    ApiResponse.success(
      {
        status: "ok",
        service: "pushup-builder-api"
      },
      "API is healthy."
    )
  );
});

app.use("/api/muscles", muscleRoutes);
app.use("/api/exercises", exerciseRoutes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
