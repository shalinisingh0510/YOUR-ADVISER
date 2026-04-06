import { verifyToken } from "../utils/jwt.js";

export const requireAuth = (req, res, next) => {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) {
    console.warn(`🔒 [Auth] Missing token for ${req.method} ${req.url}`);
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    return next();
  } catch (error) {
    console.warn(`🔒 [Auth] Verification failed for ${req.method} ${req.url}: ${error.message} - Token head: ${token.substring(0, 10)}...`);
    return res.status(401).json({ message: "Invalid token" });
  }
};
