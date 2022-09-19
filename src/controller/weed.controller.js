const DAOWeed = require('../dao/weed.dao');
const { writeEvent } = require('../../utils/handle/logger.handle');
const { Parser } = require('json2csv');

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
    const _collection = [];

    try{
        const _Weedz = await DAOWeed.read();

        //Iterar
        for(let x=0; x<_Weedz.length; x++)
        {
            

            const _cannabinoides = await CannabinoideController.leer(_Weedz[x]._id);
            const _Flavors = await FlavorController.leer(_Weedz[x]._id);
            const _Feelings = await FeelingController.leer(_Weedz[x]._id);
            const _Negatives = await NegativeController.leer(_Weedz[x]._id);

            _collection.push({
                name: _Weedz[x].name,
                type: _Weedz[x].type,
                qualification: _Weedz[x].qualification,
                substance: _Weedz[x].substance,
                topEffect: _Weedz[x].topEffect,
                aroma: _Weedz[x].aroma,
                Effects: { _Feelings, _Negatives },
                _Flavors,
                _cannabinoides
            });
        }

        //
        return _collection;
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
                const fields = ['nombre', 'seccion', 'precio', 'descripcion', 'Source'];
    
                //Parser-CSV
                const parser = new Parser({ fields });
                const csv = parser.parse(_Dishes);
                
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