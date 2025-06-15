const getUser = async (req, res, next) => {
  try {
    res.status(201).json({ message: req.user });
  } catch (err) {
    next(err);
  }
};

export default getUser;
