const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createAccessToken = (user) => {
  return jwt.sign(
    { sub: user._id, email: user.email },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: "15m" }, //shor-lived
  );
};

const createRefreshToken = (user) => {
  return jwt.sign(
    { sub: user._id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" }, // longer
  );
};

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    //validate input
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "give the valid email or password" });
    }

    //2. Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered" });
    }

    //3.Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    //4. Create user
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });
    await user.save();

    //5. Respond (no cookie here - cookies only on login)
    res.status(201).json({ message: "Signup successful" });
  } catch (error) {
    console.log("Signup Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Missing fields" });

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(401).json({ message: "Password not correct" });

    const accessToken = createAccessToken(user);
    // console.log("AT", accessToken);
    const refreshToken = createRefreshToken(user);
    // console.log("RT", refreshToken);

    user.refreshToken = refreshToken; // store (or store hashed)
    await user.save();

    res.cookie("accessToken", accessToken, {
      httpOnly: false,
      secure: false, //process.env.NODE_ENV === "production"
      sameSite: "lax",
      maxAge: 15 * 60 * 1000,
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: false,
      secure: false, //process.env.NODE_ENV === "production"
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ message: "Logged in" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.refreshToken = async (req, res) => {
  try {
    const token = req.cookies?.refreshToken;
    if (!token) return res.status(401).json({ message: "No refresh token" });

    //verify refresh token
    let payload;
    try {
      payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    } catch (error) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    const user = await User.findById(payload.sub);
    if (!user || user.refreshToken !== token) {
      // compare stored token (or token hash)
      return res.status(401).json({ message: "Refresh token mismatch" });
    }

    //rotate tokens: Create new access token (and optionally new refresh token )
    const newAccessToken = createAccessToken(user);
    //optional rotate refresh token:
    const newRefreshToken = createRefreshToken(user);
    user.refreshToken = newRefreshToken;
    await user.save();

    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ message: "Token refreshed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.logout = async (req, res) => {
  try {
    const token = req.cookies?.refreshToken;
    if (token) {
      //find user and clear stored refresh token
      try {
        const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
        await User.findByIdAndUpdate(payload.sub, {
          $unset: { refreshToken: 1 },
        });
      } catch (error) {
        //token ivalid or expired - ignore
      }
    }

    //clear cookies
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.json({ message: "Logged out" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
