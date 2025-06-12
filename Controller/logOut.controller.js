export const logOut = async (req, res) => {
  try {
    // Clear the cookie by setting its expiration date to a past date
    res.clearCookie('token', {
        httpOnly: true,
      // secure: process.env.NODE_ENV === "production" ? true : false, // Set secure to true in production
      // sameSite: process.env.NODE_ENV === "production" ? 'none' : 'lax', // Set sameSite to none in production
       secure: true, // Set secure to true in production
      sameSite: 'none', // Set sameSite to none in production
      });
    
    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    return res.status(500).json({ message: "Server error during logout" });
  }
};
