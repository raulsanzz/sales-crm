const db = require('../database/db');
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
//delete a client
const deleteClient = async(clientId) => {
    try {
        const deletedClient = await Client.destroy({
            where: { id: clientId}
          })     
        return ( deletedClient );
    } catch (error) {
        console.log(error.message);
        throw new error(error);
    }
}
module.exports = {updateClient, addClient, deleteClient};