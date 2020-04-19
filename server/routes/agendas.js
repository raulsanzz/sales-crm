const express = require("express");
const Router = express.Router();
const auth = require("../middleware/auth");
const db = require("../database/db");
const Agenda = db.agenda;

//Add a new Agenda
Router.post("/", async(req, res) => {
    try {
        const agenda = await Agenda.create({
            ...req.body.agenda
        })       
        return res.json({ agenda }  );
    } catch (error) {
        console.log(error.message);
        return res.status(402).json({ msg: "Server Error" });
    }
})

//get specific agenda
Router.get( "/:call_id", async (req, res) => {
    try {
      const agenda = await Agenda.findAll({
        where: {call_id: req.params.call_id}
      });
        return res.json({ agenda }  );
    } catch (error) {
      console.log(error.message);
      return res.status(402).json({ msg: "Server Error" });
    }
});

//update a Agenda
Router.put("/:call_id", async(req, res) => {
    try {
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
