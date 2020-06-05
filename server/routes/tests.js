const express = require('express');
const Router = express.Router();
const auth = require('../middleware/auth');
const db = require('../database/db');
const sequelize = db.Sequelize;
const Test = db.test;
const Op = sequelize.Op;
//Add a new Test
Router.post('/', auth, async(req, res) => {
    try {
        const test = await Test.create({
            ...req.body.test
        })
        return res.json({ test }  );
    } catch (error) {
        console.log('====================================');
        console.log(error.message);
        console.log('====================================');
        return res.status(402).json({ msg: 'Server Error' });
    }
})


//get all test statuses respect to pass no response etc.
Router.put( '/testReport', auth, async (req, res) => {
  try {
  const testReport = await Test.findAll({
    where: {
      createdAt:{
            [Op.and]: {
              [Op.gte]: req.body.startDate,
              [Op.lte]: req.body.endDate
            } }

          },
          attributes: ['status', [sequelize.fn('COUNT', sequelize.col('status')), 'total']],
      group: ['status'],
    })

    
    return res.json({testReport});
  } catch (error) {
    console.log('====================================');
    console.log(error);
    console.log('====================================');
    // console.log(error.message);
    return res.status(402).json({ msg: 'Server Error' });
  }
});

//get all tests
Router.put( '/:id', async (req, res) => {
    try {
      const test = await Test.update({
        ...req.body.test
      },
      {where: { lead_id: req.params.id}});
        return res.json({ test }  );
    } catch (error) {
      console.log(error.message);
      return res.status(402).json({ msg: 'Server Error' });
    }
});


module.exports = Router;
