const { getContenidoPaginaWeb } = require('../datasource/scrappinData');
const { guardar } = require('./weed.controller');
const { writeEvent } = require('../../utils/handle/logger.handle');
const { writeFile, open } = require('fs');

//@export
const downloadInfo = async () => {
    try{
        //Conseguir la fecha de hoy para poderla ocupar en el nombre del archivo
        let name = new Date();
        name = name.getDate() + '-' + (name.getMonth() + 1) + '-' + name.getFullYear();
        name = name + '.json';

        //Validar existencia
        const validateResult = await validarExistenciaHist(name);
    
        if(!validateResult){
            //Descargar info. -Scrapper-
            const _dataScrap = await getContenidoPaginaWeb();

            //Generar respaldo
            const result = await createBackSource({ _dataScrap, name });
            
            //Guardar en la bd
            if(result){
                //Iterar coleccion
                for(const Weed of _dataScrap){
                    await guardar({
                        nombre: Weed.name,
                        calificacion: Weed.qualification,
                        tipo: Weed.type,
                        efecto: Weed.topEffect,
                        aroma: Weed.aroma,
                        sustancia: Weed.substance,
                        _Flavor: Weed._Flavors,
                        _Feeling: Weed.Effects._Feelings,
                        _Negative: Weed.Effects._Negatives,
                        _Cannabinoide: Weed._cannabinoides
                    });
                }
            }
        }
        else{
            throw 'Por cuestiones tecnicas, el scrapper solo se puede ejecutar una vez por dia';
        }

        return true;
    }
    catch(e){
        throw e;
    }
}

//@static
const createBackSource = (data) => {
    let { _dataScrap, name } = data;

    //Escribir documento JSON
    return new Promise((resolve, reject) => {
        //Convertir mi -_Collection- en un String
        _dataScrap = JSON.stringify(_dataScrap, null, 2);

        //Escribir el archivo
        writeFile('./src/backsource/' + name, _dataScrap, { encoding: 'utf8' }, (err) => {
            if(!err){
                writeEvent('Backsource from dataScrapped, generated successfully');
                resolve(true);
            }

            reject(err);
        });
    });
}   

const validarExistenciaHist = async(name) => {// :void
    return new Promise((resolve, reject) => {
        open('./src/backsource/' + name, (err) => {
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

//
module.exports = { downloadInfo };