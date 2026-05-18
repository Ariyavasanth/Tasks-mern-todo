const express = require("express");
require("dotenv").config();
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const app = express();
connectDB();

const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:5173",
  "http://localhost:3000"
].filter(Boolean);

app.use(
  cors({
    origin: process.env.NODE_ENV === "production" ? allowedOrigins : true,
    credentials: true,
  }),
);

// ✅ cookies first
app.use(cookieParser());
// ✅ normal APIs
app.use(express.json());

// FIX: JSON + URL encoded should be ABOVE all routes
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("API running successfully");
});

// profile route (multer works correctly now)
app.use("/api/profile", require("./routes/profileRoutes"));

// AUTHENTICATION ROUTES
app.use("/api/auth", authRoutes);

// TODO middleware
app.use("/api/todos", require("./routes/todoRoutes"));

const PORT = process.env.PORT || 5000;

// Serve React frontend in production
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "client/build")));

//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//   });
// }
app.listen(PORT, () => {
  console.log("Your port is listening", PORT);
});
