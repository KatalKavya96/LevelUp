import dotenv from "dotenv";

dotenv.config();

class EnvConfig {
  public readonly databaseUrl: string;
  public readonly frontendUrl: string;
  public readonly nodeEnv: string;
  public readonly port: number;

  constructor() {
    this.databaseUrl =
      process.env.DATABASE_URL ??
      "mysql://root:password@localhost:3306/pushup_builder";
    this.frontendUrl = process.env.FRONTEND_URL ?? "http://localhost:3000";
    this.nodeEnv = process.env.NODE_ENV ?? "development";
    this.port = Number(process.env.PORT ?? 5000);
  }
}

export const envConfig = Object.freeze(new EnvConfig());
