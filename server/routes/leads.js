const express = require("express");
const Router = express.Router();
const auth = require("../middleware/auth");
const clients = require('./clients');
const calls = require('./calls');
const db = require("../database/db");
const Profile = db.profile;
const Job = db.job;
const sequelize = db.Sequelize;
const Lead = db.lead;
const Client = db.client;
const Call = db.call;
const Op = sequelize.Op;

Router.post ('/', auth, async(req, res) => {
    try{
        const call = await calls.addCall(null);
        const newLead = await Lead.create({
            ...req.body.newLeadData,
            call_id: call.dataValues.id
        })
    return res.json({ newLead }  );

    }
    catch (error){
        console.log('====================================');
        console.log(error);
        console.log('====================================');
      return res.status(402).json({ msg: "Server Error" });

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

                },
                {   
                    model: Call
                }
        ]
    })
        return res.json({ leads }  );
    } catch (error) {
      console.log(error.message);
      return res.status(402).json({ msg: "Server Error" });
    }
});

// update Lead 
Router.put("/", auth, async (req, res) => {
    try {
        if(req.body.newClientData){
            await clients.updateClient(req.body.query.client_id, req.body.newClientData);       
        }
        if(req.body.newCallData){
            await calls.updateCall(req.body.query.call_id, req.body.newCallData);  
        }

        const updatedLead = await Lead.update({
            ...req.body.newLeadData
        },
        {   where: {id : req.body.query.lead_id}}
        )
        return res.json( { updatedLead } );
    } catch (error) {
      console.log(error.message);
      return res.status(402).json({ msg: "Server Error" });
    }
});

module.exports = Router;

// get all Scheduled leads
// Router.get( "/scheduled", async (req, res) => {
//     try {
//         const leads = await Lead.findAll({
//             include: [
//                 {   
//                     model: Job,
//                     attributes: ['client_id'],
//                     include: [{
//                         model: Client,
//                         attributes: ['company_name']
//                     }]
//                 },
//                 {   model: Profile,
//                     attributes: ['name']

//                 },
//                 {   
//                     model: Call,
//                     where :{
//                         call_date: {
//                             [Op.gte]: new Date() 
//                         }
//                     },
//                     attributes: ['call_date', 'call_time']
//                 }
//             ],
//             order: [ [Call, 'call_date', 'ASC'] ]

//     })
//         return res.json({ leads }  );
//     } catch (error) {
//       console.log(error.message);
//       return res.status(402).json({ msg: "Server Error" });
//     }
// });