const express = require("express");
const { addClient, deleteClient } = require('./clients');
const auth = require("../middleware/auth");
const db = require("../database/db");
const Route = express.Router();
const User = db.user;
const Job = db.job;
const Profile = db.profile;
const Client = db.client;

// Create new job
Route.post("/", auth, async (req, res) => {
  let client = null;
  try {
    client = await addClient(req.body.newClientData);
    
    let job = await Job.create({
      ...req.body.newJobData,
      user_id: req.user.user.id,
      client_id: client.dataValues.id,
    });
    if (job) {
      const user = await User.findAll({
        where: {
          registration_number:  req.user.user.id
        }
      })
      const profiles = await Profile.findAll();
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
      job.dataValues.client = {...client.dataValues}  
      return res.json({ job });
    }
  } 
  catch (error) {
    await deleteClient(client.dataValues.id);
    return res.status(402).json({ msg: error.errors[0].message });
  }
});

//Fetch all Job
Route.get("/", auth, async (req, res) => {
  try {
    const result = await Job.findAll({
      include: [{
          model: User,
          attributes: ["name"]
        },
        {
          model: Client
        }
      ],
      order: [['createdAt', 'DESC']]
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

module.exports = Route;
