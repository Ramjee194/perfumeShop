import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import productRoutes from "./routes/productRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send(" API is working");
});

app.use("/api/products", productRoutes);

// Check for required ENV variables
if (!process.env.MONGO_URI) {
  console.error(" MONGO_URI is missing! Please set it in Render Environment Variables.");
  process.exit(1); // Stop the server so you notice
}

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { dbName: "perfumeShop" })
  .then(() => console.log(" MongoDB Connected"))
  .catch((err) => {
    console.error("MongoDB Connection Error:", err.message);
    process.exit(1);
  });

// Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});
