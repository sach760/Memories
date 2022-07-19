const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require(`${__dirname}/../models/user`);

exports.signin = async (req, res) => {
  try {
    console.log("signin", req.body);

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User does not exist" });

    const correctPassword = await bcrypt.compare(password, user.password);

    if (!correctPassword)
      return res.status(404).json({ message: "Invalid credentials" });

    const token = jwt.sign({ email, id: user._id }, "secret", {
      expiresIn: "1h",
    });

    return res.status(200).json({ result: user, token });
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

exports.signup = async (req, res) => {
  try {
    console.log("signup server");
    console.log(req.body);
    const { email, password, firstName, lastName, confirmPassword } = req.body;

    const user = await User.findOne({ email });
    if (user) return res.status(404).json({ message: "User already exists" });

    if (password !== confirmPassword)
      return res.status(404).json({ message: "Passwords do not match" });

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });

    const token = jwt.sign({ email, id: newUser._id }, "secret", {
      expiresIn: "1h",
    });

    return res.status(200).json({ result: newUser, token });
  } catch (error) {
    console.log(error);
    return res.status(404).json(error);
  }
};
