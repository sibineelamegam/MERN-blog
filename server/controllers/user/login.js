// A robust login controller function
import User from "../../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const loginUser = async (req, res) => {
  // CRITICAL FIX: Check if the request body exists before destructuring.
  if (!req.body) {
    return res.status(400).json({ message: "Request body is missing." });
  }

  // 1. Extract and trim incoming credentials
  let { email, username, password } = req.body;
  email = email?.trim();
  username = username?.trim();

  // 2. Validate required fields
  if (!email && !username) {
    return res.status(400).json({ message: "Email or username is required." });
  }
  if (!password) {
    return res.status(400).json({ message: "Password is required." });
  }

  try {
    // 3. Check for existing admin user by email + username
    const user = await User.findOne({ $or: [{ email }, { username }] });

    // If user doesn't exist, reject login
    if (!user) {
      return res.status(401).json({ message: "Invalid email, username, or unauthorized access" });
    }

    // 4. Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 5. Generate access token
    const accessToken = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "10m" }
    );

    // 6. Generate refresh token
    const refreshToken = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    // 7. Set access & refresh tokens as httpOnly cookies
    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "None" : "Lax",
      maxAge: 10 * 60 * 1000, // 10 minutes
    });

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "None" : "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // 8. Send response with user info only
    res.status(200).json({
      email: user.email,
      username: user.username,
      role: user.role,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/*
| Cookie Sent On...                 | `Strict`  | `Lax`  | `None`  |
| -------------------------------- | -------   | -----  | ------  |
| Same-origin requests             | ✅        | ✅     | ✅      |
| Cross-origin **GET (top-level)** | ❌        | ✅     | ✅      |
| Cross-origin **POST/PUT/DELETE** | ❌        | ❌     | ✅      |
| Secure connection required?      | ❌        | ❌     | ✅      |
*/
