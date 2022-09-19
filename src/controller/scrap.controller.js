const { getContenidoPaginaWeb } = require('../datasource/scrappinData');
const { writeEvent } = require('../../utils/handle/logger.handle');
const { writeFile } = require('fs');

//@export
const downloadInfo = async () => {
    try{
        //Descargar info. -Scrapper-
        const _dataScrap = await getContenidoPaginaWeb();

        //Generar respaldo
        await createBackSource(_dataScrap);


    }
    catch(e){
        throw e;
    }
}

//@static
const createBackSource = (data) => {
    //Escribir documento JSON
    return new Promise((resolve, reject) => {
        //
        const validateResult = validarExistenciaHist.then(res => { return res; }).catch(e => { throw e; })

        //
        if(!validateResult){
            //Convertir mi -_Collection- en un String
            const _Collection = JSON.stringify(data, null, 2);

            //Conseguir la fecha de hoy para poderla ocupar en el nombre del archivo
            let name = new Date();
            name = name.getDate() + '-' + (name.getMonth() + 1) + '-' + name.getFullYear();
            name = name + '.json';

            //Escribir el archivo
            writeFile('./src/backsource/' + name, _Collection, { encoding: 'utf8' }, (err) => {
                if(!err){
                    writeEvent('Backsource from dataScrapped, generated successfully');
                    resolve(true);
                }

                reject(err);
            });
        }
        else{
            throw 'Por condiciones tecnicas, no se puede ejecutar el scrap mas de una vez por dia';
        }
    });
}

const validarExistenciaHist = async() => {// :void
    return new Promise((resolve, reject) => {
        let name = new Date();
        name = name.getDate() + '-' + (name.getMonth() + 1) + '-' + name.getFullYear();

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

//
module.exports = { downloadInfo };