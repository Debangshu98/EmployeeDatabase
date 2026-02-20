import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";
import cors from "cors";

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error(err));

const app = express();
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173", // Vite
  // origin: "http://localhost:3000", // CRA
  credentials: true
}));

app.use("/auth", authRoutes);

app.listen(process.env.PORT, () =>
  console.log(`🚀 Server running on port ₹{process.env.PORT}`)
);
