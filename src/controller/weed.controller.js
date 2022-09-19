const DAOWeed = require('../dao/weed.dao');
const { writeEvent } = require('../../utils/handle/logger.handle');
const { Parser } = require('json2csv');
const descargarInfo = async() => {
    try{
        //Obtener coleccion de _Weedz
        const _WeedzCollection = await DAOWeed.descargarInformacion();

        //Iterar la coleccion para extraer los fragmentos de data e insertarlos en sus respectivas tablas
        for(let i = 0; i < _WeedzCollection.length; i++)
        {
            let { name, type, qualification, substance, topEffect, aroma, _cannabinoides, _Flavors, Effects: { _Feelings, _Negatives } } = _WeedzCollection[i];

            let _idWeed = await DAOWeed.save({ name, type, qualification, substance, topEffect, aroma });
            _idWeed = _idWeed._id;

            //Validar que traiga _cannabinoides
            if(_cannabinoides != null || _cannabinoides != []){
                for(const cannabinoide of _cannabinoides)
                {
                    await CannabinoideController.guardar({ _idWeed, cannabinoide });
                }
            }

            //Validar que traiga _flavors
            if(_Flavors != null || _Flavors != []){
                for(const flavor of _Flavors)
                {
                    await FlavorController.guardar({ _idWeed, flavor });
                }
            }

            //Validar _Feelings
            if(_Feelings != null || _Feelings != []){
                for(const feeling of _Feelings)
                {
                    await FeelingController.guardar({ _idWeed, feeling });
                }
            }

            //Validar _Negatives
            if(_Negatives != null || _Negatives != []){
                for(const negative of _Negatives)
                {
                    await NegativeController.guardar({ _idWeed, negative });
                }
            }
        }

        //
        writeEvent('Info descargada y guardada en la base de datos!!');

        //
        return 'Info descargada y guardada en la base de datos!!';
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

module.exports = { descargarInfo, leer };