import jwt from "jsonwebtoken";

// Helper function to generate access token
export function generateAccessToken(user: any) {
  const accessToken = jwt.sign(
    { _id: user._id, role: user.role },
    process.env.ACCESS_TOKEN_SECRET as string,
    {
      expiresIn: "7d",
    }
  );
  return accessToken;
}

// Helper function to generate refresh token
export function generateRefreshToken(user: any) {
  const refreshToken = jwt.sign(
    { _id: user._id, role: user.role },
    process.env.REFRESH_TOKEN_SECRET as string,
    {
      expiresIn: "23d",
    }
  );
  return refreshToken;
}
