import jwt from "jsonwebtoken";
import User from "../../models/user.js";

export const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) {
    return res.status(401).json({ message: "No refresh token found" });
  }

  const refreshToken = cookies.jwt;
  const isProduction = process.env.NODE_ENV === "production";

  try {
    //  1. Decode the refresh token
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    //  2. Fetch the user using decoded.userId
    const user = await User.findById(decoded.userId).select(
      "username email role"
    );

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    //  3. Generate new access token
    const accessToken = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "10m" }
    );

    //  4. Set new access token as cookie
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "None" : "Lax",
      maxAge: 10 * 60 * 1000, // 10 minutes
    });

    //  5. Send back user info
    res.status(200).json({
      email: user.email,
      username: user.username,
      role: user.role,
    });
  } catch (err) {
    console.error("Refresh token error:", err.message);
    res.status(403).json({ message: "Invalid or expired refresh token" });
  }
};
