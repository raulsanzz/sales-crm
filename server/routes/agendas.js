const express = require('express');
const db = require('../database/db');
const router = express.Router();
const Agenda = db.agenda;
const Note = db.note;

//Add a new Agenda
router.post('/', async(req, res) => {
    try {
        const agenda = await Agenda.create({
            ...req.body.agenda
        })
        if(req.body.note){
           addNote(req.body.note);
        }    
        return res.json({ agenda }  );
    } catch (error) {
        console.log(error.message);
        return res.status(402).json({ msg: 'Server Error' });
    }
})

//get specific agenda
router.get( '/:call_id', async (req, res) => {
    try {
      const agenda = await Agenda.findAll({
        where: {call_id: req.params.call_id},
        include:[
            {
                model: Note
            }
        ],
        order: [ [Note, 'createdAt', 'DESC'] ]
      });
        return res.json({ agenda }  );
    } catch (error) {
      console.log(error.message);
      return res.status(402).json({ msg: 'Server Error' });
    }
});

//update a Agenda
router.put('/:call_id', async(req, res) => {
    try {
        if(req.body.note){
            addNote(req.body.note);
        }
        const agenda = await Agenda.update({
            ...req.body.agenda
        },
        {where: {call_id: req.params.call_id}}
        )      
        return res.json({ agenda }  );
    } catch (error) {
        console.log(error.message);
        return res.status(402).json({ msg: 'Server Error' });
    }
})

//Add a new note for an Agenda
const addNote = async(newNote) => {
    try {
        const note = await Note.create({
            ...newNote
        })       
        return note;
    } catch (error) {
        console.log(error.message);
        throw new Error ({ msg: 'Server Error' });
    }
}

module.exports = router;
