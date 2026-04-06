import dotenv from "dotenv";
dotenv.config();

const secret = (process.env.JWT_SECRET || "dev_secret_change").trim();
if(process.env.NODE_ENV === "production" && secret === "dev_secret_change") {
  console.warn("⚠️ WARNING: JWT_SECRET is using the fallback dev secret in production!");
} else {
  const masked = secret.substring(0, 3) + "..." + secret.substring(secret.length - 3);
  console.log(`🔒 JWT_SECRET specialized: [${masked}]`);
}

export const jwtSecret = secret;
export const jwtExpiresIn = process.env.JWT_EXPIRES_IN || "7d";
