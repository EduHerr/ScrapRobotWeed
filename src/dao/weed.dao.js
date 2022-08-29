const { getContenidoPaginaWeb } = require('../datasource/scrappinData');
const fs = require('fs');

//@exports
/* Scrapper */
const descargarInformacion = async() => { /* Obtener el numero del paginado */
    try{
        //Validar si ya existe el respaldo de hoy
        const validResult = await validarExistenciaHist();

        if(!validResult){
            //Obtener el contenido de toda la pagina con -Scrapping-
            const __WeedzCollection = await getContenidoPaginaWeb('https://www.leafly.com/');

            //Generar un historico/respaldo del -Scrapping- que se realizo
            const resultHistorico = await generarHistorico(__WeedzCollection);

            //Guardar la [data] en una bd Mysql
            // if(resultHistorico){

            // }
        }
        else{
            throw new Error('Ya se genero el historico del dia de hoy');
        }
    }
    catch(e){
        console.log(e);
    }
};
/* MySQL */
const save = async(data) => {
    try{
        
    }
    catch(error){
        throw 'Error in MySql:' +error.message;
    }
};

//@static
/* Scrapper */
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
};

const validarExistenciaHist = async() => {// :void
    return new Promise((resolve, reject) => {
        let name = getTodayFormat();
        name = name + '.json';

        fs.open('./src/backsource/' + name, (err) => {
            if(err){//NO EXISTE
                if(err.code === 'ENOENT'){
                    resolve(false);
                }

                reject(err);
            }

            //EXISTE
            resolve(true);
        });
    });
};

const getTodayFormat = () => {// :void
    let today = new Date();
    return today.getDate() + '-' + today.getMonth() + 1 + '-' + today.getFullYear();
};

module.exports = { descargarInformacion };