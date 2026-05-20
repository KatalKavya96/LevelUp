import { PrismaClient } from "@prisma/client";
import { envConfig } from "./env.config";

export class DatabaseClient {
  private static instance: PrismaClient;

  public static getInstance(): PrismaClient {
    if (!DatabaseClient.instance) {
      DatabaseClient.instance = new PrismaClient({
        log:
          envConfig.nodeEnv === "development"
            ? ["error", "warn"]
            : ["error"]
      });
    }

    return DatabaseClient.instance;
  }

  public static async disconnect(): Promise<void> {
    if (DatabaseClient.instance) {
      await DatabaseClient.instance.$disconnect();
    }
  }
}

export const prisma = DatabaseClient.getInstance();
