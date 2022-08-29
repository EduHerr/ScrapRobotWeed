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

const leer = async() => {
    try{
        const result = await DAOFeeling.read(data);
        return result;
    } 
    catch(err){
        throw err;
    }
}

module.exports = { guardar, leer };