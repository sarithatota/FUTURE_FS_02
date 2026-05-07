const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const SECRET = "mysecretkey";

// REGISTER
router.post("/register", async (req, res) => {
  const hashed = await bcrypt.hash(req.body.password, 10);

  const user = new User({
    username: req.body.username,
    password: hashed
  });

  await user.save();
  res.json({ message: "User created" });
});

// LOGIN
router.post("/login", async (req, res) => {
  const user = await User.findOne({ username: req.body.username });

  if (!user) return res.status(400).json({ msg: "User not found" });

  const match = await bcrypt.compare(req.body.password, user.password);

  if (!match) return res.status(400).json({ msg: "Wrong password" });

  const token = jwt.sign({ id: user._id }, SECRET);
  res.json({ token });
});

module.exports = router;
