const express = require("express");
const Router = express.Router();
const auth = require("../middleware/auth");
const notes = require('./notes');
const db = require("../database/db");
const Agenda = db.agenda;
const Note = db.note;

//Add a new Agenda
Router.post("/", auth, async(req, res) => {
    try {
        const agenda = await Agenda.create({
            ...req.body.agenda
        })
        if(req.body.note){
            notes.addNote(req.body.note);
        }    
        return res.json({ agenda }  );
    } catch (error) {
        console.log(error.message);
        return res.status(402).json({ msg: "Server Error" });
    }
})

//get specific agenda
Router.get( "/:call_id", auth, async (req, res) => {
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
      return res.status(402).json({ msg: "Server Error" });
    }
});

//update a Agenda
Router.put("/:call_id", auth, async(req, res) => {
    try {
        if(req.body.note){
            notes.addNote(req.body.note);
        }
        const agenda = await Agenda.update({
            ...req.body.agenda
        },
        {where: {call_id: req.params.call_id}}
        )      
        return res.json({ agenda }  );
    } catch (error) {
        console.log(error.message);
        return res.status(402).json({ msg: "Server Error" });
    }
})

module.exports = Router;
