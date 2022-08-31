const DAONegative = require('../DAO/negative.dao');

const guardar = async(data) => {
    try{
        const result = await DAONegative.save(data);
        return result;
    } 
    catch(err){
        throw err;
    }
}

const leer = async(_id) => {
    try{
        const result = await DAONegative.read(_id);
        return result;
    } 
    catch(err){
        throw err;
    }
}

module.exports = { guardar, leer };