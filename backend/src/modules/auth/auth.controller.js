import { authenticateUser, createUser } from "./auth.service.js";
import { signToken } from "../../utils/jwt.js";

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await createUser({ name, email, password });
    const token = signToken({ id: user.id, email: user.email });

    res.status(201).json({
      message: "User registered successfully",
      user,
      token
    });
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({ message: "Email already exists" });
    }
    res.status(500).json({ message: "Signup failed" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const result = await authenticateUser({ email, password });
    res.json(result);
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ message: error.message || "Login failed" });
  }
};
