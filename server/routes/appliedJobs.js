const express = require("express");
const Router = express.Router();
const auth = require("../middleware/auth");
const db = require("../database/db");
const AppliedJobs = db.appliedJobs;
const Job = db.job;
const sequelize = db.Sequelize;
const User = db.user;
const Op = sequelize.Op;


//get all applied jobs where applied=false
Router.get( "/", auth, async (req, res) => {
    try {
      const appliedJobs = await AppliedJobs.findAll({
        where: {applied: false},
        include: [
          {
            model: Job,
            attributes: ["url", "companyName"]
          }
        ]
    })
    res.json({ appliedJobs }  );
    } catch (error) {
      console.log(error.message);
      return res.status(402).json({ msg: "Server Error" });
    }
});

//get all user daily applied jobs count
Router.get( "/dailyreport", async (req, res) => {
    try {
    const appliedJobs = await AppliedJobs.findAll({
        where: {applied: true, updatedAt: new Date()},
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
        res.json( [] );
    }
    if(fetchedJobs.length > appliedJobs.length){
        report = await mappingHelper(fetchedJobs, appliedJobs, "appliedJobCount");
    }
    else{
        report = await mappingHelper(appliedJobs, fetchedJobs, "fetchedJobCount");
    }

    res.json( report );
    } catch (error) {
      console.log(error.message);
      return res.status(402).json({ msg: "Server Error" });
    }
});

//update applied jobs 
Router.put("/", auth, async (req, res) => {
    try {
      const updatedJob = await AppliedJobs.update(
        {
            user_id: req.user.user.id, 
            applied: true
        },
        { where: {...req.body.query}}
    )
    res.json( { updatedJob } );
    } catch (error) {
      console.log(error.message);
      return res.status(402).json({ msg: "Server Error" });
    }
});

const mappingHelper = async ( list1, list2, toBeAdded ) => {
    
    let users = list1.map((job)=> job.dataValues.user_id);
        users = await getUserNames(users);
    return list1.map( (job, index) => {
        let temp = 0;
        let user;
        users = users.filter( obj => {
            if(obj.dataValues.registrationNumber !== job.dataValues.user_id){ 
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
            where: { registrationNumber : {
                [Op.or]: [...ids]
              }},
            attributes:['name', 'registrationNumber']
        })
      return ( users);
      } catch (error) {
        console.log(error.message);
        return ({ msg: "Server Error" });
      }
} 

module.exports = Router;
