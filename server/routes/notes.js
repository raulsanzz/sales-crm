const db = require("../database/db");
const Note = db.note;

//Add a new note for an Agenda
const addNote = async(newNote) => {
    try {
        const note = await Note.create({
            ...newNote
        })       
        return note;
    } catch (error) {
        console.log(error.message);
        throw new Error ({ msg: "Server Error" });
    }
}
module.exports = {
    addNote
};
