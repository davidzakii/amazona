const express = require("express");
const bcrypt = require("bcryptjs");
const expressAsyncHandler = require("express-async-handler");

const User = require("../models/userModel");
const { generateToken, isAuth } = require("../utils");

const router = express.Router();

router.post(
  "/signin",
  expressAsyncHandler(async (req, res, next) => {
    // const { email, password } = await req.body;
    const user = await User.findOne({ email: req.body.email });
    // const valid = await bcrypt.compareSync(req.body.password, user.password);
    console.log(
      bcrypt.compareSync(
        "$2a$10$sIUe8HLN6WF5HcuQl6X8cO5Cx2mtjviD//LgnLQZYpt89tOxEjIs2",
        "1234567"
      )
    );
    console.log(user);
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: "invalid email or password" });
  })
);

router.post(
  "/signup",
  expressAsyncHandler(async (req, res, next) => {
    const newUser = await new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
    });
    const user = await newUser.save();
    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user),
    });
  })
);

router.put(
  "/profile",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8);
      }
      const updateUser = await user.save();
      res.send({
        _id: updateUser._id,
        name: updateUser.name,
        email: updateUser.email,
        isAdmin: updateUser.isAdmin,
        token: generateToken(updateUser),
      });
    } else {
      res.status(404).send({ message: "User Not Found" });
    }
  })
);

module.exports = router;
