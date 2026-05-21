import net from "node:net";
import { envConfig } from "../../config/env.config";

const server = net.createServer();

server.once("error", (error: NodeJS.ErrnoException) => {
  if (error.code === "EADDRINUSE") {
    console.error(
      `Port ${envConfig.port} is already in use. Set PORT=5001 in backend/.env or run npm run dev:backend:5001 from the repo root.`
    );
    process.exit(1);
  }

  console.error(`Unable to check port ${envConfig.port}.`, error);
  process.exit(1);
});

server.once("listening", () => {
  server.close(() => process.exit(0));
});

server.listen(envConfig.port);
