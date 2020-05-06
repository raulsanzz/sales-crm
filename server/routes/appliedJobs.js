const express = require("express");
const Router = express.Router();
const clients = require('./clients');
const auth = require("../middleware/auth");
const db = require("../database/db");
const AppliedJob = db.appliedJob;
const Job = db.job;
const sequelize = db.Sequelize;
const User = db.user;
const Client = db.client;
const Profile = db.profile;
const Op = sequelize.Op;


//get all applied jobs where applied=false
Router.get( "/", auth, async (req, res) => {
    try {
      const appliedJobs = await AppliedJob.findAll({
        where: {applied: false},
        include: [
          {
            model: Job,
            attributes: ["url"],
            include: [{
                model: Client,
                attributes: ["company_name"]
            }]
          }
        ],
        order: [['createdAt', 'DESC']]
    })
    return res.json({ appliedJobs }  );
    } catch (error) {
      console.log(error.message);
      return res.status(402).json({ msg: "Server Error" });
    }
});

//get all applied jobs where applied=true
Router.get( "/manager", auth, async (req, res) => {
    try {
      const appliedJobs = await AppliedJob.findAll({
        where: {applied: true, lead_status: null},
        include: [
          {
            model: Job,
            attributes: ["url", 'client_id'],
            include: [{
                model: Client,
                attributes: ["company_name"]
            }]
          }
        ],
        order: [['updatedAt', 'DESC']]
    })
    return res.json({ appliedJobs }  );
    } catch (error) {
      console.log(error.message);
      return res.status(402).json({ msg: "Server Error" });
    }
});

//get all applied jobs where lead_status != lead
Router.get( "/leads", auth, async (req, res) => {
  try {
    const appliedJobs = await AppliedJob.findAll({
      where: { lead_status: {
        [Op.not]: 'lead'
      }},
      include: [
        {
          model: Job,
          attributes: ['job_title', 'url'],
          include: [{
              model: Client,
              attributes: ['company_name']
          }]
        },
        {
          model: Profile,
          attributes: ['name']
        }
      ],
      order: [['updatedAt', 'DESC']]
  })
  return res.json({ appliedJobs }  );
  } catch (error) {
    console.log(error.message);
    return res.status(402).json({ msg: "Server Error" });
  }
});

//get all user daily applied jobs count
Router.get( "/dailyreport", auth, async (req, res) => {
    try {
    const appliedJobs = await AppliedJob.findAll({
        where: {applied: true, applied_on: new Date()},
        attributes: ['user_id', [sequelize.fn('COUNT', sequelize.col('user_id')), 'appliedJobCount']],
        group: ['user_id'],
    })
    const fetchedJobs = await Job.findAll({
        where: {createdAt: new Date()},
        attributes: ['user_id', [sequelize.fn('COUNT', sequelize.col('user_id')), 'fetchedJobCount']],
        group: ['user_id'],
    })
    let report;
    if(fetchedJobs.length === 0 && appliedJobs.length === 0){
        return res.json( [] );
    }
    if(fetchedJobs.length > appliedJobs.length){
        report = await mappingHelper(fetchedJobs, appliedJobs, "appliedJobCount");
    }
    else{
        report = await mappingHelper(appliedJobs, fetchedJobs, "fetchedJobCount");
    }

      return res.json( report );
    } catch (error) {
      console.log('====================================');
      console.log(error);
      console.log('====================================');
      // console.log(error.message);
      return res.status(402).json({ msg: "Server Error" });
    }
});

//update applied jobs 
Router.put("/", auth, async (req, res) => {
  try {
    if(req.body.shouldUpdateUser){ 
      req.body.updatedData.user_id = req.user.user.id;
    }
    if(req.body.clientData){
      await clients.updateClient(req.body.clientData.id, {client_name: req.body.clientData.client_name});   
    }
    const updatedJob = await AppliedJob.update({
          ...req.body.updatedData
      },
      { where: {...req.body.query}}
  )
  console.log('====================================');
  console.log(updatedJob);
  console.log('====================================');
  return res.json( { updatedJob } );
  } catch (error) {
    console.log(error.message);
    return res.status(402).json({ msg: "Server Error" });
  }
});

const mappingHelper = async ( list1, list2, toBeAdded ) => {
    
    let users = list1.map((job)=> job.dataValues.user_id);
        users = await getUserNames(users);
    return list1.map( (job) => {
        let temp = 0;
        let user;
        users = users.filter( obj => {
            if(obj.dataValues.registration_number !== job.dataValues.user_id){ 
                return obj;
            }
            else{
                user = obj;
            }
            return null;
        })
        list2 = list2.filter( obj => {
        if(obj.dataValues.user_id !== job.dataValues.user_id){ 
            return obj;
        }
        else{
            temp = obj.dataValues[toBeAdded];
        }
            return null;
        })  
        return {
            ...job.dataValues,
            [toBeAdded]: temp,
            name: user.dataValues.name
        };
    })
}

const getUserNames = async(ids) => {
    try {
        const users = await User.findAll({ 
            where: { registration_number : {
                [Op.or]: [...ids]
              }},
            attributes:['name', 'registration_number']
        })
      return ( users);
      } catch (error) {
        console.log(error.message);
        return ({ msg: "Server Error" });
      }
} 

module.exports = Router;
