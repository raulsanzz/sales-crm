const express = require('express');
const clients = require('./clients');
const calls = require('./calls');
const db = require('../database/db');
const router = express.Router();
const Profile = db.profile;
const Job = db.job;
const Lead = db.lead;
const Client = db.client;
const Agenda = db.agenda;
const Note = db.note;
const Call = db.call;
const Test = db.test;
const sequelize = db.Sequelize;
const Op = sequelize.Op;


router.post ('/', async(req, res) => {
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
      return res.status(402).json({ msg: 'Server Error' });

    }
})

// get all leads
router.get( '/', async (req, res) => {
    try {
        const leads = await Lead.findAll({
            include: [
                {   model: Job,
                    attributes: ['job_title', 'url', 'source'],

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
                },
                {   
                    model: Test
                }
            ],
            order: [['createdAt', 'DESC']]
    })
        return res.json({ leads }  );
    } catch (error) {
      console.log(error.message);
      return res.status(402).json({ msg: 'Server Error' });
    }
});

// update Lead 
router.put('/', async (req, res) => {
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
      return res.status(402).json({ msg: 'Server Error' });
    }
});


// get all Scheduled leads
router.get( '/callTaken', async (req, res) => {
    try {
        const leads = await Lead.findAll({
            include: [
                {   
                    model: Job,
                    attributes: ['job_title', 'url', 'source'],
                    include: [{
                        model: Client,
                        attributes: { exclude: ['createdAt', 'updatedAt'] }
                    }]
                },
                {  
                    model: Profile,
                    attributes: ['name']
                },
                {   
                    model: Call,
                    required: true,
                    include: [{
                        model: Agenda,
                        required: true,
                        include: [{
                            model: Note,
                            order: [['createdAt', 'DESC']]
                        }],
                    }],
                },
                {   
                    model: Test
                }
            ],
            
        })
        return res.json({ leads }  );
    } catch (error) {
      console.log(error.message);
      return res.status(402).json({ msg: 'Server Error' });
    }
});

//get all job status of leads with respect to status
router.put( '/leadReport', async (req, res) => {
    try {
        const leadReport = await Lead.findAll({
            where: {
                createdAt: {
                    [Op.and]: {
                        [Op.gte]: req.body.startDate,
                        [Op.lte]: req.body.endDate
                    } 
                }
            },
        attributes: ['status', [sequelize.fn('COUNT', sequelize.col('status')), 'total']],
        group: ['status'],
    })
    
    
    return res.json({leadReport});
} catch (error) {
    console.log('====================================');
    console.log(error);
    console.log('====================================');
    // console.log(error.message);
    return res.status(402).json({ msg: 'Server Error' });
}
});

// get Lead W.R.T. voice(agendaId) 
router.put( '/voiceleads', async (req, res) => {
    try {
        const leads = await Lead.findAll({
            where: {
                call_id: {
                [Op.in]: req.body.ids
            }},    
        attributes: ['status', [sequelize.fn('COUNT', sequelize.col('status')), 'total']],
        group: ['status']
        })
        return res.json({ leads } );
    } catch (error) {
      console.log(error.message);
      return res.status(402).json({ msg: 'Server Error' });
    }
});
module.exports = router;