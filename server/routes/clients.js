const db = require("../database/db");
const Client = db.client;

//Add a new Client
const addClient = async(clientData) => {
    try {
        const newClient = await Client.create({
            ...clientData
        })       
        return( newClient );
    } catch (error) {
        console.log(error.message);
        throw new error(error);
    }
}

//Update an existing Client
const updateClient = async(id, clientData) => {
    try {
        const updatedClient = await Client.update(
            {...clientData},
            { where: { id: id } }
        );
        return(updatedClient);
    } catch (error) {
        console.log(error.message);
        throw new error(error);
    }
} 

module.exports = {updateClient, addClient};