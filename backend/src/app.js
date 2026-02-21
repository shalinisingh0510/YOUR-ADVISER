import express from "express";
import authRoutes from "./modules/auth/auth.routes.js";
import questionnaireRoutes from "./modules/questionnaire/questionnaire.routes.js";

const app = express();

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/auth", authRoutes);
app.use("/api/questionnaire", questionnaireRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

export default app;
