require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

// Import Routes
const clientRoutes = require("./routes/clientRoutes");
const taskRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/authRoutes");

// Connect to Database
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/clients", clientRoutes);
app.use("/tasks", taskRoutes);
app.use("/auth", authRoutes);

// Root Endpoint
app.get("/", (req, res) => {
  res.send("Backend is running 🚀 with MongoDB");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});