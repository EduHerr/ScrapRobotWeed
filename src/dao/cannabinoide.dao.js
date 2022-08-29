const conn = require('../../configuration/database');

const save = async (data) => {
    const { _idWeed, name, porcent } = data;

    try{
        return new Promise((resolve, reject) => {
            conn.query('CALL SP_CANNABINOIDE(?, ?, ?, ?, ?)', [1, NULL, _idWeed, name, porcent], (err, result) => {
                if(!err){
                    return result;
                }

                throw 'Error al intentar insertar *Feeling: ' + err.message;
            });
        });
    }
    catch(error){
        throw error;
    }
};

const read = async () => {
    try{
        return new Promise((resolve, reject) => {
            conn.query('CALL SP_CANNABINOIDE(?, ?, ?, ?, ?)', [3, NULL, NULL, NULL, NULL], (err, rows) => {
                if(!err){
                    return rows[0];
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