const getUser = async (req, res) => {
  res.json({message: req.user});
};

module.exports = getUser;