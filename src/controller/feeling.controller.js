const DAOFeeling = require('../DAO/feeling.dao');

const guardar = async(data) => {
    try{
        const result = await DAOFeeling.save(data);
        return result;
    } 
    catch(err){
        throw err;
    }
}

const leer = async(_id) => {
    try{
        const result = await DAOFeeling.read(_id);
        return result;
    } 
    catch(err){
        throw err;
    }
}

module.exports = { guardar, leer };