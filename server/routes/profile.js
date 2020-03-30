const express = require("express");
const Router = express.Router();
const auth = require("../middleware/auth");
const db = require("../database/db");
const Profiles = db.profiles;


//get all profiles
Router.get( "/", auth, async (req, res) => {
    try {
      const profiles = await Profiles.findAll({
        attributes: ["id", "name"]
      });
    res.json({ profiles }  );
    } catch (error) {
      console.log(error.message);
      return res.status(402).json({ msg: "Server Error" });
    }
});

module.exports = Router;
