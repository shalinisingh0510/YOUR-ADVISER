import dotenv from "dotenv";
dotenv.config();

export const jwtSecret = process.env.JWT_SECRET || "dev_secret_change";
export const jwtExpiresIn = process.env.JWT_EXPIRES_IN || "7d";
