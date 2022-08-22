const { getNumeroPaginas } = require('../dao/weed.dao');

const obtenerPaginado = async() => {
    try{
        return await getNumeroPaginas();
    }
    catch(e){
        consolo.log(e);
    }
}

module.exports = { obtenerPaginado };