import express from "express";
import cors from "cors";
import authRoutes from "./modules/auth/auth.routes.js";
import questionnaireRoutes from "./modules/questionnaire/questionnaire.routes.js";
import roadmapRoutes from "./modules/roadmap/roadmap.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/auth", authRoutes);
app.use("/api/questionnaire", questionnaireRoutes);
app.use("/api/roadmap", roadmapRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

export default app;
