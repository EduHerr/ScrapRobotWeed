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

const leer = async() => {
    try{
        const result = await DAONegative.read();
        return result;
    } 
    catch(err){
        throw err;
    }
}

module.exports = { guardar, leer };