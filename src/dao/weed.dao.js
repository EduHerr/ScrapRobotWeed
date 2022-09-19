require('../../config/database');
const Weed = require('../model/Weed');

//@exports
/* MongoDB */
const save = async (data) => {
    try{
        const weed = new Weed(data);

        await weed.save();
        return true;
    }
    catch(error){
        throw 'Error al intentar insertar:' +error.message;
    }
};

const read = async () => {
    try{
        const _Weedz = await Weed.find().exec();
        return _Weedz;
    }
    catch(error){
        throw 'Error al intentar leer:' +error;
    }
};

module.exports = { save, read };