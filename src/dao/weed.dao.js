const { getContenidoPaginaWeb } = require('../datasource/scrappinData');
const fs = require('fs');

//@exports
const descargarInformacion = async() => { /* Obtener el numero del paginado */
    try{
        //Obtener el contenido de toda la pagina con -Scrapping-
        const __WeedzCollection = await getContenidoPaginaWeb('https://www.leafly.com/');

        //
    }
    catch(e){
        console.log(e);
    }
}

//@static
const generarHistorico = async(_Collection) => { /* Genera un historico en JSON, en un archivo... De lo -Scrappeado- */
    //Escribir documento JSON
    return new Promise((resolve, reject) => {
        //Convertir mi -_Collection- en un String
        _Collection = JSON.stringify(_Collection, null, 2);

        //Conseguir la fecha de hoy para poderla ocupar en el nombre del archivo
        let name = getTodayFormat();
        name = name + '.json';
        
        //Escribir el archivo
        fs.writeFile('./src/backsource/' + name, _Collection, { encoding: 'utf8' }, (err) => {
            if(!err){
                resolve(true);
            }

            reject(err);
        });
    });
}

const validarExistenciaHist = async() => {// :void
    return new Promise((resolve, reject) => {
        let name = getTodayFormat();
        name = name + '.json';

        fs.open('./src/backsource/' + name, (err) => {
            if(err.code === 'ENOENT'){//NO EXISTE
                resolve(true);
            }
            else if(err){
                reject(err);
            }

            //EXISTE
            resolve(false);
        });
    });
}

const getTodayFormat = () => {// :void
    let today = new Date();
    return today.getDate() + '-' + today.getMonth() + 1 + '-' + today.getFullYear();
};

module.exports = { descargarInformacion, validarExistenciaHist };