const Message = require("../models/Message");
const User = require("../models/User");

const userConnected = async (uid) => {
  const user = await User.findById(uid);
  user.online = true;

  await user.save();
  return user;
};

const userDisconnected = async (uid) => {
  const user = await User.findById(uid);
  user.online = false;

  await user.save();
  return user;
};

const getUsers = async () => {
  const users = await User.find().sort("-online");

  return users;
};

const saveMessage = async (payload) => {
  const message = new Message(payload);
  await message.save();

  return message;
};

module.exports = {
  userConnected,
  userDisconnected,
  getUsers,
  saveMessage,
};
