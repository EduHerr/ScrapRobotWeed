const DAOFlavor = require('../dao/flavor.dao');

const guardar = async(data) => {
    try{
        const result = await DAOFlavor.save(data);
        return result;
    } 
    catch(err){
        throw err;
    }
}

const leer = async(_id) => {
    try{
        const result = await DAOFlavor.read(_id);
        return result;
    } 
    catch(err){
        throw err;
    }
}

module.exports = { guardar, leer };