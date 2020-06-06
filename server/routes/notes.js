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
  let voiceReport = await Note.findAll({
    where: {
      createdAt:{
        [Op.and]: {
          [Op.gte]: req.body.startDate,
          [Op.lte]: req.body.endDate
        }}
      },
      attributes: ['agenda_id', 'voice', [sequelize.fn('COUNT', sequelize.col('voice')), 'total']],
      group: ['agenda_id', 'voice'],
      order: [ ['voice', 'DESC'] ]
    })
    let voiceStatusesReport = await Note.findAll({
      where: {
        createdAt:{
          [Op.and]: {
            [Op.gte]: req.body.startDate,
            [Op.lte]: req.body.endDate
          }}
        },
      attributes: [ 'call_status', 'voice', [sequelize.fn('COUNT', sequelize.col('voice')), 'total']],
      group: ['call_status', 'voice'],
      order: [ ['voice', 'DESC'] ]
    })
    voiceReport = removeDuplicationOfVoiceReport(voiceReport);
    voiceStatusesReport = removeDuplicationOfVoiceStatusesReport(voiceStatusesReport);
    return res.json({voiceReport, voiceStatusesReport});
  } catch (error) {
    console.log('====================================');
    console.log(error);
    console.log('====================================');
    return res.status(402).json({ msg: 'Server Error' });
  }
});

const removeDuplicationOfVoiceReport = (voiceReport) => {
  let temp = {
    agendas: [],
    total: 0,
    voice: null
  };
  let res = voiceReport.map((obj, index) => {
    if(voiceReport.length - 1 === index){
      temp = {
        ...temp,
        agendas: [...temp.agendas, obj.dataValues.agenda_id],
        total: Number(temp.total) + Number(obj.dataValues.total),
        voice: obj.dataValues.voice
      }
      return temp;
    }
    else{
      if(obj.dataValues.voice ===  voiceReport[index + 1].dataValues.voice){
        temp = {
          ...temp,
          agendas: [...temp.agendas, obj.dataValues.agenda_id],
          total: Number(temp.total) + Number(obj.dataValues.total),
          voice: obj.dataValues.voice
        }
        return null;
      }
      else{
        temp = {
          ...temp,
          agendas: [...temp.agendas, obj.dataValues.agenda_id],
          total: Number(temp.total) + Number(obj.dataValues.total),
          voice: obj.dataValues.voice
        }
        let newTemp = {...temp};
        temp = {
          agendas: [],
          total: 0,
          voice: null
        }
        return newTemp;
      }
    }
  })
  res = res.filter(obj => obj ? obj : null);
  return res;
}

const removeDuplicationOfVoiceStatusesReport = (voiceStatusesReport) => {
  let temp = [];
  let res = voiceStatusesReport.map((obj, index) => {
    if(voiceStatusesReport.length - 1 === index){
      temp = [
        ...temp,
        {...obj.dataValues}
      ]
      return temp;
    }
    else{
      if(obj.dataValues.voice ===  voiceStatusesReport[index + 1].voice){
        temp = [
          ...temp,
          {...obj.dataValues}
        ]
        return null;
      }
      else{
        temp = [
          ...temp,
          {...obj.dataValues}
        ]
        let newTemp = [...temp];
        temp = [];
        return newTemp;
      }
    }
  })
  res = res.filter(obj => obj ? obj : null);
  return res;
}

module.exports = Router;