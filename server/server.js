const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const courseRoutes = require("./routes/courseRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

// =======================
// Middleware
// =======================

app.use(cors());
app.use(express.json());

// =======================
// Routes
// =======================

app.get("/", (req, res) => {
  res.send("Online Learning Platform Backend is Running!");
});

app.use("/api/courses", courseRoutes);
app.use("/api/auth", authRoutes);

// =======================
// MongoDB Connection
// =======================

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully!");
  })
  .catch((error) => {
    console.error("MongoDB Connection Error:", error);
  });

// =======================
// Start Server
// =======================

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});