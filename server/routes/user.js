const express = require("express");
const Route = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../database/config");
const auth = require("../middleware/auth");
const sequelize = require("../database/db").Sequelize;
const db = require("../database/db");
const User = db.user;
const Job = db.job;
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
    console.log("req.body.newUser")
    console.log(req.body.newUser)
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
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
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

Route.post("/details", auth, async (req, res) => {
  const { startDate, endDate } = getPreviousWeekDate();
  let { registration_number, role } = req.body;

  if (role === "sales_executive") {
    try {
      const result = await Job.count({
        where: {
          userId: registration_number,
          createdAt: {
            [Op.between]: [startDate, endDate]
          }
        }
      });
      return res.json({ result });
    } catch (error) {
      console.log(error.message);
      return res.status(402).json({ msg: "Server Error" });
    }
  }

  if (role === "manager" || role === "admin") {
    try {
      const result = await Job.count({
        where: {
          assignTo: registration_number,
          lead_status: "done",
          call_date: {
            [Op.between]: [startDate, endDate]
          }
        }
      });
      return res.json({ result });
    } catch (error) {
      console.log(error.message);
      return res.status(402).json({ msg: "Server Error" });
    }
  }
});

Route.post("/monthly_details", auth, async (req, res) => {
  const { first_date, last_date } = getMonthDate();
  let { registration_number, role } = req.body;

  if (role === "sales_executive") {
    try {
      const result = await Job.count({
        where: {
          userId: registration_number,
          createdAt: {
            [Op.between]: [first_date, last_date]
          }
        }
      });
      return res.json({ result });
    } catch (error) {
      console.log(error.message);
      return res.status(402).json({ msg: "Server Error" });
    }
  }

  if (role === "manager" || role === "admin") {
    try {
      const result = await Job.count({
        where: {
          assignTo: registration_number,
          lead_status: "done",
          call_date: {
            [Op.between]: [first_date, last_date]
          }
        }
      });
      return res.json({ result });
    } catch (error) {
      console.log(error.message);
      return res.status(402).json({ msg: "Server Error" });
    }
  }
});

function getPreviousWeekDate() {
  var curr = new Date(); // get current date
  var first = curr.getDate() - curr.getDay() - 6; // Gets day of the month (e.g. 21) - the day of the week (e.g. wednesday = 3) = Sunday (18th) - 6
  var last = first + 6; // last day is the first day + 6
  var startDate = new Date(curr.setDate(first));
  var endDate = new Date(curr.setDate(last));

  return {
    startDate: startDate,
    endDate: endDate
  };
}

function getMonthDate() {
  var now = new Date();
  var prevMonthLastDate = new Date(now.getFullYear(), now.getMonth(), 0);
  var prevMonthFirstDate = new Date(
    now.getFullYear() - (now.getMonth() > 0 ? 0 : 1),
    (now.getMonth() - 1 + 12) % 12,
    1
  );
  return {
    last_date: prevMonthLastDate,
    first_date: prevMonthFirstDate
  };
}
module.exports = Route;
