import app from "./app";
import { DatabaseClient } from "./config/db.config";
import { envConfig } from "./config/env.config";

const server = app.listen(envConfig.port, () => {
  console.log(`API server listening on http://localhost:${envConfig.port}`);
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
