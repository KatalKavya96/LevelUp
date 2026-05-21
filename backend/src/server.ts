import app from "./app";
import { DatabaseClient } from "./config/db.config";
import { envConfig } from "./config/env.config";

const server = app.listen(envConfig.port, () => {
  console.log(`API server listening on http://localhost:${envConfig.port}`);
});

server.on("error", (error: NodeJS.ErrnoException) => {
  if (error.code === "EADDRINUSE") {
    console.error(
      `Port ${envConfig.port} is already in use. Set PORT=5001 in backend/.env or run npm run dev:backend:5001 from the repo root.`
    );
    process.exit(1);
  }

  console.error("Failed to start API server.", error);
  process.exit(1);
});

const shutdown = async () => {
  console.log("Shutting down API server...");
  await DatabaseClient.disconnect();
  server.close(() => {
    process.exit(0);
  });
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
