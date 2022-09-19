const DAOWeed = require('../dao/weed.dao');
const { writeEvent } = require('../../utils/handle/logger.handle');
const { Parser } = require('json2csv');
const { writeFile } = require('fs');

const guardar = async(data) => {
    try{
        //
        const result = await DAOWeed.save(data);

        //
        if(result){
            writeEvent('Data guardada en la bd!!');
        }
    }
    catch(e){
        throw e;
    }
}

const leer = async () => {
    try{
        const _Weedz = await DAOWeed.read();
        return _Weedz;
    } 
    catch(e){
        throw e;
    }
}

const exportar = () => {
    try{
        return new Promise(async(resolve, reject) => {
            const _Weedz = await leer();
    
            //Validar que hay registros
            if(_Weedz.length > 0){
                //Fields to Parser-csv
                const fields = ['nombre', 'calificacion', 'tipo', 'efecto', 'aroma', 'sustancia', '_Flavor', '_Feeling', '_Negative', '_Cannabinoide'];
    
                //Parser-CSV
                const parser = new Parser({ fields });
                const csv = parser.parse(_Weedz);
                
                //CSV-File
                //Conseguir la fecha de hoy para poderla ocupar en el nombre del archivo
                let name = new Date();
                name = name.getDate() + '-' + (name.getMonth() + 1) + '-' + name.getFullYear();
                name = (Math.random() * (100000000 - 1) + 1) + name;
                name = './src/backsource/csv/' + name + '.csv';
                
                //Escribir el archivo
                writeFile(name, csv, (err) => {
                    if(!err){
                        writeEvent('Backsource CSV, generated successfully');
                        resolve({ route: name, csv });
                    }
                    else{
                        reject(err);
                    }
                });
            }
            else{
                reject('No se cuenta con registros para exportar');
            }
        });
    }
    catch(e){
        throw e;
    }
}

module.exports = { guardar, leer, exportar };