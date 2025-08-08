export const logoutUser = async (req, res) => {
  // 1. Check if refresh token cookie exists
  const cookies = req.cookies;
  const isProduction = process.env.NODE_ENV === "production";

  if (!cookies?.jwt && !cookies?.accessToken) {
    return res.sendStatus(204); // No content, but not an error
  }

  // 2. Clear the refresh token cookie
  res.clearCookie("jwt", {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "None" : "Lax",
  });

  // 3. Clear the access token cookie
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "None" : "Lax",
  });

  // 4. Respond with confirmation
  res.status(200).json({ message: "Logged out successfully" });
};
