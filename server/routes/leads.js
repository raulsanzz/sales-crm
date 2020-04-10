const express = require("express");
const Router = express.Router();
const auth = require("../middleware/auth");
const db = require("../database/db");
const Profile = db.profile;
const Job = db.job;
const sequelize = db.Sequelize;
const User = db.user;
const Lead = db.lead;
const Client = db.client;
const Op = sequelize.Op;

Router.post ('/', auth, async(req, res) => {
    try{
        const newLead = await Lead.create({
            ...req.body.newLeadData
        })
    res.json({ newLead }  );

    }
    catch (error){
        console.log('====================================');
        console.log(error);
        console.log('====================================');
    }
})

// get all leads
Router.get( "/", auth, async (req, res) => {
    try {
        const leads = await Lead.findAll({
            include: [
                {   model: Job,
                    attributes: ['job_title', 'salary', 'url', 'source'],

                    include: [{
                        model: Client,
                        attributes: { exclude: ['createdAt', 'updatedAt'] }
                    }]
                },
                {   model: Profile,
                    attributes: ['name']

                }
        ]
    })
        return res.json({ leads }  );
    } catch (error) {
      console.log(error.message);
      return res.status(402).json({ msg: "Server Error" });
    }
});

//update Lead 
// Router.put("/", auth, async (req, res) => {
//     try {
//       const updatedJob = await AppliedJob.update(
//         {
//             user_id: req.user.user.id, 
//             applied: true
//         },
//         { where: {...req.body.query}}
//     )
//     res.json( { updatedJob } );
//     } catch (error) {
//       console.log(error.message);
//       return res.status(402).json({ msg: "Server Error" });
//     }
// });



module.exports = Router;
