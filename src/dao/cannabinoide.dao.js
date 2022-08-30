const conn = require('../../configuration/database');

const save = async (data) => {
    const { _idWeed, cannabinoide } = data;

    try{
        return new Promise((resolve, reject) => {
            conn.query("CALL SP_CANNABINOIDE(?, ?, ?, ?)", [1, null, _idWeed, cannabinoide], (err, result) => {
                if(!err){
                    return result;
                }

                throw 'Error al intentar insertar *Cannabinoide: ' + err.message;
            });
        });
    }
    catch(error){
        throw error;
    }
};

const read = async (_idWeed) => {
    try{
        return new Promise((resolve, reject) => {
            conn.query("CALL SP_CANNABINOIDE(?, ?, ?, ?, ?)", [3, null, _idWeed, null], (err, rows) => {
                if(!err){
                    return rows[0].length > 0 ? rows[0] : null;
                }

                throw 'Error al intentar leer *Feeling: '+ err.message;
            });
        });
    }
    catch(error){
        throw error;
    }
};

module.exports = { save, read };