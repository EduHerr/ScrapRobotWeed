const conn = require('../../configuration/database');

const save = async (data) => {
    const { _idWeed, flavor } = data;

    try{
        return new Promise((resolve, reject) => {
            conn.query("CALL SP_FLAVOR(?, ?, ?)", [1, _idWeed, flavor], (err, result) => {
                if(!err){
                    resolve();
                }
                else{
                    reject('Error al intentar insertar *Flavor: ' + err.message);
                }
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
            conn.query("CALL SP_FLAVOR(?, ?, ?)", [1, _idWeed, null], (err, rows) => {
                if(!err){
                    let result = rows[0].length > 0 ? rows[0] : null;
                    resolve(result);
                }
                else{
                    reject('Error al intentar leer *Feeling: '+ err.message);
                }
            });
        });
    }
    catch(error){
        throw error;
    }
};

module.exports = { save, read };