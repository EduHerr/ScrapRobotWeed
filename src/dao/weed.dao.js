const { getContenidoPaginaWeb } = require('../datasource/scrappinData');

const getNumeroPaginas = async() => { /* Obtener el numero del paginado */
    try{
        let $ = await getContenidoPaginaWeb('https://www.leafly.com/strains?page=1');
    }
    catch(e){
        console.log(e);
    }
}

module.exports = { getNumeroPaginas };