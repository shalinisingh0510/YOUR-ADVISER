import dotenv from "dotenv";
import app from "./app.js";
import pool from "./config/db.js";
import { initDb } from "./utils/initDb.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

await initDb();

pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("❌ DB connection failed", err);
  } else {
    console.log("🟢 DB connected. Time:", res.rows[0]);
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
