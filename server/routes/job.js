const express = require("express");
const Route = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");
const db = require("../database/db");
const sequelize = db.Sequelize;
const User = db.user;
const Job = db.job;
const Profiles = db.profiles;
const Op = sequelize.Op;

//check url
Route.get("/check_url", async (req, res) => {
  const url = req.query.url;

  const exist = await Job.count({
    where: { url: url }
  });

  if (exist) {
    return res.status(402).json({ msg: "Link already exist" });
  } else {
    return res.status(200).json({ msg: "Already Applied with this Link" });
  }
});

//check company name
Route.get("/check_comp_name", async (req, res) => {
  const company_name = req.query.company_name;

  const exist = await Job.count({
    where: { companyName: company_name }
  });

  if (exist) {
    return res.status(402).json({ msg: "Link already exist" });
  } else {
    return res.status(200).json({ msg: "Already applied" });
  }
});

// Create new job
Route.post("/", auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const job = await Job.create({
      ...req.body.newJob,
      user_id: req.user.user.id,
      status: "job"
    });
    if (job) {
      const user = await User.findAll({
        where: {
          registrationNumber:  req.user.user.id
        }
      })
      const profiles = await Profiles.findAll();
      profiles.map( async (profile) => {
        try {
          await job.addAppliedWithProfiles(user[0], { through: { profile_id:profile.dataValues.id, applied: false } });
        }
        catch (error) {
          console.log('====================================');
          console.log(error);
          console.log('====================================');
        }
      })  
      return res.json({ job });
    }

  } 
  catch (error) {
    console.log('====================================');
    console.log(error);
    console.log('====================================');
    // console.log("error------------- ", error.message);
    return res.status(402).json({ msg: "Server Error" });
  }
});

//Fetch all Job
Route.get("/", auth, async (req, res) => {
  try {
    const result = await Job.findAll({
      include: [
        {
          model: User,
          as: "jobId",
          attributes: ["name"]
        },
        {
          model: Profiles,
          attributes: ["name"]
        }
      ]
    });
    res.json({ result });
  } catch (error) {
    console.log(error.message);
    return res.status(402).json({ msg: "Server Error" });
  }
});

//Update job
Route.put("/update/:id", auth, async (req, res) => {
  try {
    let result = await Job.update({
        ...req.body.updatedData
      },
      { where: { id: req.params.id } }
    );

    res.json({ result });
  } catch (error) {
    console.log(error.message);
    return res.status(402).json({ msg: "Server Error" });
  }
});

//Delete  Job
Route.post("/delete", auth, async (req, res) => {
  const { id } = req.body;
  console.log(id);

  try {
    const result = await Job.destroy({
      where: {
        id: id
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


//Fetch all leads
Route.get("/leads", auth, async (req, res) => {
  try {
    const result = await Job.findAll({
      where: {
        status: {
          [Op.notLike]: "job"
        }
      }
    });
    if (result) {
      res.json({ result });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(402).json({ msg: "Server Error" });
  }
});

//changed status
Route.post("/changed_staus", auth, async (req, res) => {
  const { id, status } = req.body;

  try {
    let result = await Job.update(
      {
        status
      },
      { where: { id: id } }
    );

    res.json({ result });
  } catch (error) {
    console.log(error.message);
    return res.status(402).json({ msg: "Server Error" });
  }
});

//changed call status
Route.post("/call_status", auth, async (req, res) => {
  const { id, call_status } = req.body;

  try {
    let result = await Job.update(
      {
        call_status
      },
      { where: { id: id } }
    );

    res.json({ result });
  } catch (error) {
    console.log(error.message);
    return res.status(402).json({ msg: "Server Error" });
  }
});

//changed call status
Route.post("/lead_status", auth, async (req, res) => {
  const { id, lead_status } = req.body;

  try {
    let result = await Job.update(
      {
        lead_status
      },
      { where: { id: id } }
    );

    res.json({ result });
  } catch (error) {
    console.log(error.message);
    return res.status(402).json({ msg: "Server Error" });
  }
});

//assign to user
Route.post("/assign_to", auth, async (req, res) => {
  const { id, assignTo } = req.body;

  try {
    let result = await Job.update(
      {
        assignTo
      },
      { where: { id: id } }
    );

    res.json({ result });
  } catch (error) {
    console.log(error.message);
    return res.status(402).json({ msg: "Server Error" });
  }
});
//Daily Applied jobs
Route.get("/count", auth, async (req, res) => {
  try {
    const result = await Job.findAll({
      attributes: [
        "userId",
        [
          db.Sequelize.fn("count", db.Sequelize.col("registration_number")),
          "count"
        ]
      ],
      where: {
        createdAt: new Date()
      },
      group: ["job.registration_number"],
      raw: true,
      order: db.Sequelize.literal("count DESC")
    });

    res.json({ result });
  } catch (error) {
    console.log(error.message);
    return res.status(402).json({ msg: "Server Error" });
  }
});
// My Leads
Route.get("/my_leads", auth, async (req, res) => {
  try {
    const result = await Job.findAll({
      where: {
        status: ["lead", "good_lead"]
      }
    });
    if (result) {
      res.json({ result });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(402).json({ msg: "Server Error" });
  }
});
//Update Lead
Route.post(
  "/lead/edit",

  auth,

  async (req, res) => {
    const {
      id,
      profile,
      job_title,
      salary,
      source,
      email,
      website,
      client_name,
      phone_number,
      call_time,
      time_zone,
      call_date
    } = req.body;

    const job = await Job.count({
      where: { id: id }
    });

    if (!job) {
      return res
        .status(400)
        .json({ errors: [{ msg: "This Company Data does not Exist" }] });
    }
    try {
      let result = await Job.update(
        {
          profile,
          job_title,
          salary,
          source,
          email,
          website,
          client_name,
          phone_number,
          call_time,
          time_zone,
          call_date
        },
        { where: { id: id } }
      );

      res.json({ result });
    } catch (error) {
      console.log(error.message);
      return res.status(402).json({ msg: "Server Error" });
    }
  }
);

//Lead Call Scheduler
Route.get("/lead_scedule", auth, async (req, res) => {
  var currentDate = new Date();
  var someDate = new Date();
  var numberOfDaysToAdd = 6;
  someDate.setDate(someDate.getDate() + numberOfDaysToAdd);
  console.log(currentDate);
  console.log(someDate);
  try {
    const result = await Job.findAll({
      where: {
        call_date: {
          [Op.between]: [currentDate, someDate] // BETWEEN 6 AND 10
        }
      },
      include: [
        {
          model: User,
          as: "leadId",
          attributes: ["name"]
        }
      ],

      order: ["call_date"]
    });

    res.json({ result });
  } catch (error) {
    console.log(error.message);
    return res.status(402).json({ msg: "Server Error" });
  }
});

// Previous Week Report and Apis
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
//Total Job Applied Previous Week
Route.get("/status_job_count", auth, async (req, res) => {
  const { startDate, endDate } = getPreviousWeekDate();

  try {
    const result = await Job.findAll({
      attributes: ["id"],

      where: {
        createdAt: {
          [Op.between]: [startDate, endDate] // BETWEEN 6 AND 10
        },
        status: "job"
      }
    });

    res.json({ result });
  } catch (error) {
    console.log(error.message);
    return res.status(402).json({ msg: "Server Error" });
  }
});

Route.get("/status_lead_count", auth, async (req, res) => {
  const { startDate, endDate } = getPreviousWeekDate();

  try {
    const result = await Job.findAll({
      attributes: ["id"],

      where: {
        createdAt: {
          [Op.between]: [startDate, endDate] // BETWEEN 6 AND 10
        },
        status: "lead"
      }
    });

    res.json({ result });
  } catch (error) {
    console.log(error.message);
    return res.status(402).json({ msg: "Server Error" });
  }
});

Route.get("/status_good_lead_count", auth, async (req, res) => {
  const { startDate, endDate } = getPreviousWeekDate();

  try {
    const result = await Job.findAll({
      attributes: ["id"],

      where: {
        createdAt: {
          [Op.between]: [startDate, endDate] // BETWEEN 6 AND 10
        },
        status: "good_lead"
      }
    });

    res.json({ result });
  } catch (error) {
    console.log(error.message);
    return res.status(402).json({ msg: "Server Error" });
  }
});

Route.get("/status_hot_lead_count", auth, async (req, res) => {
  const { startDate, endDate } = getPreviousWeekDate();

  try {
    const result = await Job.findAll({
      attributes: ["id"],

      where: {
        createdAt: {
          [Op.between]: [startDate, endDate] // BETWEEN 6 AND 10
        },
        status: "hot"
      }
    });

    res.json({ result });
  } catch (error) {
    console.log(error.message);
    return res.status(402).json({ msg: "Server Error" });
  }
});

Route.get("/status_closed_lead_count", auth, async (req, res) => {
  const { startDate, endDate } = getPreviousWeekDate();

  try {
    const result = await Job.findAll({
      attributes: ["id"],

      where: {
        createdAt: {
          [Op.between]: [startDate, endDate] // BETWEEN 6 AND 10
        },
        status: "closed"
      }
    });

    res.json({ result });
  } catch (error) {
    console.log(error.message);
    return res.status(402).json({ msg: "Server Error" });
  }
});

Route.get("/status_rejected_lead_count", auth, async (req, res) => {
  const { startDate, endDate } = getPreviousWeekDate();

  try {
    const result = await Job.findAll({
      attributes: ["id"],

      where: {
        createdAt: {
          [Op.between]: [startDate, endDate] // BETWEEN 6 AND 10
        },
        status: "rejected"
      }
    });

    res.json({ result });
  } catch (error) {
    console.log(error.message);
    return res.status(402).json({ msg: "Server Error" });
  }
});

//Previous Monthly Reports function and Apis
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
Route.get("/status_job_monthly_count", auth, async (req, res) => {
  const { first_date, last_date } = getMonthDate();

  console.log(last_date);

  try {
    const result = await Job.findAll({
      attributes: ["id"],

      where: {
        createdAt: {
          [Op.between]: [first_date, last_date] // BETWEEN 6 AND 10
        },
        status: "job"
      }
    });

    res.json({ result });
  } catch (error) {
    console.log(error.message);
    return res.status(402).json({ msg: "Server Error" });
  }
});

Route.get("/status_lead_monthly_count", auth, async (req, res) => {
  const { first_date, last_date } = getMonthDate();

  try {
    const result = await Job.findAll({
      attributes: ["id"],

      where: {
        createdAt: {
          [Op.between]: [first_date, last_date] // BETWEEN 6 AND 10
        },
        status: "lead"
      }
    });

    res.json({ result });
  } catch (error) {
    console.log(error.message);
    return res.status(402).json({ msg: "Server Error" });
  }
});

Route.get("/status_good_lead_monthly_count", auth, async (req, res) => {
  const { first_date, last_date } = getMonthDate();

  try {
    const result = await Job.findAll({
      attributes: ["id"],

      where: {
        createdAt: {
          [Op.between]: [first_date, last_date] // BETWEEN 6 AND 10
        },
        status: "good_lead"
      }
    });

    res.json({ result });
  } catch (error) {
    console.log(error.message);
    return res.status(402).json({ msg: "Server Error" });
  }
});

Route.get("/status_hot_lead_month_count", auth, async (req, res) => {
  const { first_date, last_date } = getMonthDate();

  try {
    const result = await Job.findAll({
      attributes: ["id"],

      where: {
        createdAt: {
          [Op.between]: [first_date, last_date] // BETWEEN 6 AND 10
        },
        status: "hot"
      }
    });

    res.json({ result });
  } catch (error) {
    console.log(error.message);
    return res.status(402).json({ msg: "Server Error" });
  }
});

Route.get("/status_closed_lead_monthly_count", auth, async (req, res) => {
  const { first_date, last_date } = getMonthDate();

  try {
    const result = await Job.findAll({
      attributes: ["id"],

      where: {
        createdAt: {
          [Op.between]: [first_date, last_date] // BETWEEN 6 AND 10
        },
        status: "closed"
      }
    });

    res.json({ result });
  } catch (error) {
    console.log(error.message);
    return res.status(402).json({ msg: "Server Error" });
  }
});

Route.get("/status_rejected_lead_monthly_count", auth, async (req, res) => {
  const { first_date, last_date } = getMonthDate();

  try {
    const result = await Job.findAll({
      attributes: ["id"],

      where: {
        createdAt: {
          [Op.between]: [first_date, last_date] // BETWEEN 6 AND 10
        },
        status: "rejected"
      }
    });

    res.json({ result });
  } catch (error) {
    console.log(error.message);
    return res.status(402).json({ msg: "Server Error" });
  }
});

module.exports = Route;
