const jwt = require("jsonwebtoken");
const User = require("../model/User");

exports.protect = async (req, res, next) => {
  try {
    console.log("=== PROTECT HIT ===");
    const token = req.cookies?.accessToken || null;

    if (!token) return res.status(401).json({ message: "Not authenticated" });
    // console.log("token:", token);

    let payload;
    try {
      payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    } catch (error) {
      return res.status(401).json({ message: "Token invalid/expired" });
    }

    const user = await User.findById(payload.sub);
    // console.log("User found:", user);
    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = user;
    // console.log("request:", req.user);
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
