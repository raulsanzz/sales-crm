const db = require("../database/db");
const Call = db.call;

//Add a new Client
const addCall = async(callData) => {
    try {
        const newCall = await Call.create({
            ...callData
        })       
        return(newCall);
    } catch (error) {
        console.log(error.message);
        throw new error(error);
    }
}

//Update an existing Client
const updateCall = async(id, callData) => {
    try {
        const updatedCall = await Call.update(
            {...callData},
            { where: { id: id } }
        );
        return(updatedCall);
    } catch (error) {
      console.log(error.message);
      throw new error(error);
    }
} 

module.exports = {updateCall, addCall};
