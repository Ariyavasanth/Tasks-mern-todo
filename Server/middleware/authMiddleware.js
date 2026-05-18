const jwt = require("jsonwebtoken");
const User = require("../model/User");

exports.protect = async (req, res, next) => {
  try {
    let accessToken = req.cookies?.accessToken;

    // Check if the token is sent in the Authorization header
    if (!accessToken && req.headers.authorization?.startsWith("Bearer ")) {
      accessToken = req.headers.authorization.split(" ")[1];
    }

    if (!accessToken) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    try {
      const payload = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);

      const user = await User.findById(payload.sub);
      if (!user) return res.status(401).json({ message: "User not found" });

      req.user = user;
      return next();
    } catch (err) {
      // Access token expired → try refresh
      const refreshToken = req.cookies?.refreshToken;
      if (!refreshToken)
        return res.status(401).json({ message: "Session expired" });

      try {
        const payload = jwt.verify(
          refreshToken,
          process.env.JWT_REFRESH_SECRET,
        );

        const user = await User.findById(payload.sub);
        if (!user || user.refreshToken !== refreshToken)
          return res.status(401).json({ message: "Invalid refresh token" });

        // Generate new access token
        const newAccessToken = jwt.sign(
          { sub: user._id, email: user.email },
          process.env.JWT_ACCESS_SECRET,
          { expiresIn: "15m" },
        );

        const isSecure = req.secure || req.headers["x-forwarded-proto"] === "https";

        res.cookie("accessToken", newAccessToken, {
          httpOnly: true,
          secure: isSecure,
          sameSite: isSecure ? "none" : "lax",
          path: "/",
          maxAge: 15 * 60 * 1000,
        });

        req.user = user;
        return next();
      } catch (err) {
        return res.status(401).json({ message: "Session expired" });
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
