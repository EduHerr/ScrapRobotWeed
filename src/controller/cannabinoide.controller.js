const DAOCannabinoide = require('../DAO/cannabinoide.dao');

const guardar = async(data) => {
    try{
        const result = await DAOCannabinoide.save(data);
        return result;
    } 
    catch(err){
        throw err;
    }
}

const leer = async() => {
    try{
        const result = await DAOCannabinoide.read();
        return result;
    } 
    catch(err){
        throw err;
    }
}

module.exports = { guardar, leer };