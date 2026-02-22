const express = require("express");
require("dotenv").config();
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
connectDB();

app.use(
  cors({
    origin: "http://localhost:5173", // frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

// ✅ cookies first
app.use(cookieParser());
// ✅ normal APIs
app.use(express.json());

// FIX: JSON + URL encoded should be ABOVE all routes
app.use(express.urlencoded({ extended: true }));

// profile route (multer works correctly now)
app.use("/api/profile", require("./routes/profileRoutes"));

// AUTHENTICATION ROUTES
app.use("/api/auth", authRoutes);

// TODO middleware
app.use("/api/todos", require("./routes/todoRoutes"));

PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Your port is listening", PORT);
});
