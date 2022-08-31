const DAOCannabinoide = require('../dao/cannabinoide.dao');

const guardar = async(data) => {
    try{
        const result = await DAOCannabinoide.save(data);
        return result;
    } 
    catch(err){
        throw err;
    }
}

const leer = async(_id) => {
    try{
        const result = await DAOCannabinoide.read(_id);
        return result;
    } 
    catch(err){
        throw err;
    }
}

module.exports = { guardar, leer };