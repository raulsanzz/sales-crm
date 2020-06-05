const db = require('../database/db');
const express = require('express');
const auth = require('../middleware/auth');
const Router = express.Router();
const Note = db.note;
const sequelize = db.Sequelize;
const Op = sequelize.Op;

//Get all notes with respect to names
Router.put( '/voiceReport', auth, async (req, res) => {
    try {
    const voiceReport = await Note.findAll({
      where: {
        createdAt:{
              [Op.and]: {
                [Op.gte]: req.body.startDate,
                [Op.lte]: req.body.endDate
              } }
  
            },
            attributes: ['voice', [sequelize.fn('COUNT', sequelize.col('voice')), 'total']],
        group: ['voice'],
      })
  
      
      return res.json({voiceReport});
    } catch (error) {
      console.log('====================================');
      console.log(error);
      console.log('====================================');
      // console.log(error.message);
      return res.status(402).json({ msg: 'Server Error' });
    }
  });
  
module.exports = Router;

