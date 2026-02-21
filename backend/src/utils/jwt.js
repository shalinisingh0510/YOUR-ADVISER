import jwt from "jsonwebtoken";
import { jwtExpiresIn, jwtSecret } from "../config/auth.js";

export const signToken = (payload) => jwt.sign(payload, jwtSecret, { expiresIn: jwtExpiresIn });

export const verifyToken = (token) => jwt.verify(token, jwtSecret);
