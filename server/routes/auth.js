//  Login Apis
const express = require("express");
const Route = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../database/config");
const auth = require("../middleware/auth");
const db = require("../database/db");
const User = db.user;

Route.get("/", auth, async (req, res) => {
  try {
    const id = req.user.user.id;
    const user = await User.findAll({
      where: { registration_number: id }
    });
    return res.json({ user });
  } catch (error) {
    res.status(500).json({ msg: "Server error, Please try again" });
  }
});

Route.post("/", async(req, res) => {
  try {
    let { registration_number, password } = req.body.newUser;
    const user = await User.findAll({
      where: { registration_number: registration_number }
    });
    if (user.length === 0) {
      return res.status(400).json({ msg: "No user found (Invalid employee number)" });
    }

    const isMatch = await bcrypt.compare(password, user[0].password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Incorrect Password" });
    }
      const payload = {
        user: {
          id: user[0].registration_number
        }
      };

      jwt.sign(payload, config.secret, (err, token) => {
        if (err) throw err;
        return res.json({ token, user });
      });
    } catch (error) {
      return res.status(500).json({ msg: "Server error, Please try again" });
    }
  }
);

module.exports = Route;
