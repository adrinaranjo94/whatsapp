const User = require("../models/User");
const bcryptjs = require("bcryptjs");
const { generateJWT } = require("../helpers/jwt");

const createUser = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    // Verify email exists
    const emailExists = await User.findOne({ email: email });

    if (emailExists) {
      return res.status(400).json({
        ok: false,
        message: "Email exists",
      });
    }
    // Create user
    const user = new User({ email, password, name });

    // Encrypt password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    // Save in db
    await user.save();

    // Generate JWT
    const token = await generateJWT(user.id, user.name);

    return res.json({ ok: true, user, token });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      ok: false,
      message: "Error",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verify user exists
    const userExists = await User.findOne({ email: email });

    if (!userExists) {
      return res.status(404).json({
        ok: false,
        message: "User not found",
      });
    }

    // Verify password's user is correct
    const validPassword = bcryptjs.compareSync(password, userExists.password);

    if (!validPassword) {
      return res.status(404).json({
        ok: false,
        message: "User not found",
      });
    }

    // Generate JWT
    const token = await generateJWT(userExists.id, userExists.name);
    return res.json({ ok: true, user: userExists, token });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      ok: false,
      message: "Error",
    });
  }
};

const renewToken = async (req, res) => {
  try {
    const uid = req.uid;

    // Generate new JWT
    const token = await generateJWT(uid);

    // Get user by uid
    const user = await User.findById(uid);

    return res.json({
      ok: true,
      user,
      token,
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      message: "Error",
    });
  }
};

module.exports = { createUser, loginUser, renewToken };
