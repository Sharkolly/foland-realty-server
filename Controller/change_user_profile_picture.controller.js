export const change_user_profile_picture = (req, res, next) => {
  const profilePicture = req.file ? req.file : null;

  console.log(profilePicture);
  try {
    console.log("Working");
  } catch (err) {
    next(err);
  }
};
