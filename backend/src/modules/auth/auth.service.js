import pool from "../../config/db.js";
import { comparePassword, hashPassword } from "./auth.utils.js";
import { signToken } from "../../utils/jwt.js";

export const createUser = async ({ name, email, password }) => {
  const passwordHash = await hashPassword(password);

  const result = await pool.query(
    `INSERT INTO users (name, email, password_hash)
     VALUES ($1, $2, $3)
     RETURNING id, name, email`,
    [name, email, passwordHash]
  );

  return result.rows[0];
};

export const authenticateUser = async ({ email, password }) => {
  const result = await pool.query(
    `SELECT id, name, email, password_hash FROM users WHERE email = $1`,
    [email]
  );

  const user = result.rows[0];
  if (!user) {
    const error = new Error("Invalid credentials");
    error.status = 401;
    throw error;
  }

  const ok = await comparePassword(password, user.password_hash);
  if (!ok) {
    const error = new Error("Invalid credentials");
    error.status = 401;
    throw error;
  }

  const token = signToken({ id: user.id, email: user.email });

  return {
    token,
    user: { id: user.id, name: user.name, email: user.email }
  };
};
