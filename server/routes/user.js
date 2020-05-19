const express = require("express");
const Route = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../database/config");
const auth = require("../middleware/auth");
const db = require("../database/db");
const sequelize = db.Sequelize;
const User = db.user;
const Op = sequelize.Op;

//@POST api/user @user registration
Route.post("/",async (req, res) => { 
    
    const userExist = await User.count({
      where: { registration_number: req.body.newUser.registration_number }
    });

    if (userExist) {
      return res
        .status(402)
        .json({ msg: "Employee number already used by another user" });
    }

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.newUser.password, salt);

    try {
      let user = await User.create({
        ...req.body.newUser,
        password :password
      });

      const payload = {
        user: {
          id: user.registration_number
        }
      };

      jwt.sign(payload, config.secret, { expiresIn: 360000 }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (error) {
      console.log(error.message);
      return res.status(402).json({ msg: "Server Error" });
    }
  }
);

//Fetch all voices
Route.get("/voice", async(req, res) => {
  try {
    const users = await User.findAll({
      where: { role : {
        [Op.in]: ["Sales Manager","Sales Voice"]
      }},
      attributes:['name']
    });
    return res.json({users})
  }
  catch (error) {
    console.log(error.message);
    return res.status(402).json({ msg: "Server Error" });
  }
})

Route.get("/", auth, async (req, res) => {
  try {
    const result = await User.findAll();
    if (result) {
      res.json({ result });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(402).json({ msg: "Server Error" });
  }
});

//Delete User
Route.delete("/:id", auth, async (req, res) => {
  let id = req.params.id;

  try {
    const result = await User.destroy({
      where: {
        registration_number: id
      }
    });
    if (result) {
      return res.status(200).json({ msg: "Deleted" });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(402).json({ msg: "Server Error" });
  }
});

//@POST api/user @user Update
Route.put( "/edit/:id", auth, async (req, res) => {

    try {
      let result = await User.update(
        { ...req.body.updatedData },
        { where: { registration_number: req.params.id } }
      );

     return res.json({ result });
    } catch (error) {
      console.log(error.message);
      return res.status(402).json({ msg: "Server Error" });
    }
  });

//@POST api/user @user Update
Route.put( "/edit/password/:id", auth, async (req, res) => {

  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.updatedData.password, salt);
  try {
    let result = await User.update(
      { password: password },
      { where: { registration_number: req.params.id } }
    );

    return res.json({ result });
  } catch (error) {
    console.log(error.message);
    return res.status(402).json({ msg: "Server Error" });
  }
});

module.exports = Route;
