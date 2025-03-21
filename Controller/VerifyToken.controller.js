const getUser = async (req, res) => {
  res.json({message: req.user});
};

export default getUser;