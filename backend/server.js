import "dotenv/config";
import express from "express";
import cors from "cors";

import interviewRoutes from "./routes/interviewRoutes.js";
import authRoutes from "./routes/auth.js";
import contactRoutes from "./routes/contactRoutes.js"; // ✅ ADD THIS
import connectDB from "./config/db.js";

connectDB();       // ✅ THEN DB

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Debug (optional)
console.log("API KEY:", process.env.GEMINI_API_KEY);

// ✅ TEST ROUTE
app.get("/", (req, res) => {
  res.send("Backend working ✅");
});

// ✅ ROUTES
app.use("/api", interviewRoutes);
app.use("/api/auth", authRoutes);
app.use("/api", contactRoutes); // ✅ ADD THIS

// ✅ SERVER
app.listen(5001, () => {
  console.log("Server running on port 5001");
});