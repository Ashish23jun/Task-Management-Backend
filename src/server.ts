import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import taskRoutes from "./routes/taskRoutes";
import dashboardRoutes from "./routes/dashboardRoutes";

dotenv.config();
const app = express();
const allowedOrigins = [
  "http://localhost:5173",
  "https://task-sigma-rust.vercel.app",
];

app.use(cors({ origin: allowedOrigins, credentials: true }));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, World! Backend is running!");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/dashboard", dashboardRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
