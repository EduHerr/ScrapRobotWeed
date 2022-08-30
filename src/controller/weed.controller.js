const DAOWeed = require('../dao/weed.dao');
const DAOCannabinoide = require('../dao/cannabinoide.dao');
const DAOFlavor = require('../dao/flavor.dao');
const DAOFeeling = require('../dao/feeling.dao');
const DAONegative = require('../dao/negative.dao');

const fs = require('fs').promises;

const descargarInfo = async() => {
    try{
        // const _WeedzCollection = await DAOWeed.descargarInformacion();
        
        ///Borrar
        const _WeedzCollection = JSON.parse(await fs.readFile('./src/backsource//29-71-2022.json', 'utf8'));

        //Iterar la coleccion para extraer los fragmentos de data e insertarlos en sus respectivas tablas
        for(let Weed of _WeedzCollection)
        {
            let { name, type, qualification, substance, topEffect, aroma, _cannabinoides, _Flavors, _Feelings, _Negatives } = Weed;
            
            /*[SQL] - Insertar Weed */
            const _IdWeed = await DAOWeed.save({ name, type, qualification, substance, topEffect, aroma });

            //Validar que traiga _cannabinoides
            if(_cannabinoides != null || _cannabinoides != []){
                for(let cannabinoide of _cannabinoides)
                {
                    await DAOCannabinoide.save({
                        _idWeed: _IdWeed,
                        cannabinoide
                    });
                }
            }
            
            //Validar que traiga _flavors
            if(_Flavors != null || _Flavors != []){
                for(let flavor of _Flavors)
                {
                    await DAOFlavor.save({
                        _idWeed: _IdWeed,
                        name: flavor
                    });
                }
            }

            //Validar que traiga _Effects
            //Validar _Feelings
            if(_Feelings != null || _Feelings != []){
                for(let feeling of _Feelings)
                {
                    await DAOFeeling.save({
                        _idWeed: _IdWeed,
                        name: feeling
                    });
                }
            }

            //Validar _Negatives
            if(_Negatives != null || _Negatives != []){
                for(let negative of _Negatives)
                {
                    await DAONegative.save({
                        _idWeed: _IdWeed,
                        name: negative
                    });
                }
            }
        }

        return 'Info descargada y guardada en la base de datos!!'
    }
    catch(e){
        console.log(e);
        throw new Error(e);
    }
}

const leerColeccion = async () => {
    try{
        const _Weedz = await DAOWeed.read();

        //Iterar
        const _WeedsCollection = _Weedz.forEach(async (Weed, i) => {
            const _collection = [];

            const _cannabinoides = await DAOCannabinoide.read(Weed._id);
            const _Flavors = await DAOFlavor.read(Weed._id);
            const _Feelings = await DAOFeeling.read(Weed._id);
            const _Negatives = await DAONegative.read(Weed._id);

            _collection.push({
                name: Weed.name,
                type: Weed.type,
                qualification: Weed.qualification,
                substance: Weed.substance,
                topEffect: Weed.topEffect,
                aroma: Weed.aroma,
                Effects: { _Feelings, _Negatives },
                _Flavors,
                _cannabinoides
            });

            if(i == _Weedz.length()){
                return _collection;
            }
        });

        //
        return _WeedsCollection;
    } 
    catch(e){
        throw new Error(e);
    }
}

module.exports = { descargarInfo, leerColeccion };