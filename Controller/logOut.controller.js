export const logOut = async (req, res) => {
  try {
    // Clear the cookie by setting its expiration date to a past date
    res.clearCookie('token', {
        httpOnly: true,
        secure: true,       // same as when you set it
        sameSite: 'none',    // same as when you set it
      });
    
    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    return res.status(500).json({ message: "Server error during logout" });
  }
};
