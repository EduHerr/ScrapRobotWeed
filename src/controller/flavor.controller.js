const DAOFlavor = require('../DAO/flavor.dao');

const guardar = async(data) => {
    try{
        const result = await DAOFlavor.save(data);
        return result;
    } 
    catch(err){
        throw err;
    }
}

const leer = async() => {
    try{
        const result = await DAOFlavor.read();
        return result;
    } 
    catch(err){
        throw err;
    }
}

module.exports = { guardar, leer };