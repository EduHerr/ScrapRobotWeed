const { descargarInformacion } = require('../dao/weed.dao');

const obtenerPaginado = async() => {
    try{
        return await descargarInformacion();
    }
    catch(e){
        consolo.log(e);
    }
}

module.exports = { obtenerPaginado };