const User = require("../models/User");

const createUser = async (req, res) => {
  const newUser = await User.create({ ...req.body });
  res.status(200).json(newUser);
};

const getAllUsers = async (req, res) => {
  const user = await User.find({});
  res.status(200).json(user);
};

const getUserById = async (req, res) => {
  const { userId } = req.params;
  const user = await User.findById(userId);

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: "user not found" });
  }
};

const updateUser = async (req, res) => {
  const { userId } = req.params;
  const user = await User.findOneAndUpdate(
    { _id: userId },
    { ...req.body },
    { new: true }
  );
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: "user not found" });
  }
};

const deleteUser = async (req, res) => {
  const { userId } = req.params;
  const user = await User.findOneAndDelete({ _id: userId });

  if (user) {
    res.status(200).json({ message: "Car deleted successfully" });
  } else {
    res.status(404).json({ message: "Car not found" });
  }
};
module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
