const DAOWeed = require('../dao/weed.dao');
const DAOCannabinoide = require('../dao/cannabinoide.dao');
const DAOFlavor = require('../dao/flavor.dao');
const DAOFeeling = require('../dao/feeling.dao');
const DAONegative = require('../dao/negative.dao');

const descargarInfo = async() => {
    try{
        const _WeedzCollection = await DAOWeed.descargarInformacion();

        //Iterar la coleccion para extraer los fragmentos de data e insertarlos en sus respectivas tablas
        _WeedzCollection.filter(async (Weed) => {
            /*[SQL] - Insertar Weed */
            const _IdWeed = await DAOWeed.save({
                name: Weed.name,
                type: Weed.type,
                substance: Weed.substance,
                topEffect: Weed.topEffect,
                aroma: Weed.aroma
            });

            //Validar que traiga _cannabinoides
            if(Weed._cannabinoides != null || Weed._cannabinoides != []){
                Weed._cannabinoides.forEach(async (cannabinoide) => {
                    await DAOCannabinoide.save({
                        _idWeed: _IdWeed,
                        cannabinoide
                    });
                });
            }
            
            //Validar que traiga _flavors
            if(Weed._Flavors != null || Weed._cannabinoides != []){
                Weed._Flavors.forEach(async (flavor) => {
                    await DAOFlavor.save({
                        _idWeed: _IdWeed,
                        name: flavor
                    });
                });
            }

            //Validar que traiga _Effects
            if(Weed.Effects != null || Weed.Effects != []){
                Weed.Effects.forEach((Effect) => {
                    //Validar _Feelings
                    if(Effect._Feelings != null || Weed._Feelings != []){
                        Effect._Feelings.forEach(async (Feeling) => {
                            await DAOFeeling.save({
                                _idWeed: _IdWeed,
                                name: Feeling
                            });
                        });
                    }

                    //Validar _Negatives
                    if(Effect._Negatives != null || Weed._Negatives != []){
                        Effect._Negatives.forEach(async (Negative) => {
                            await DAONegative.save({
                                _idWeed: _IdWeed,
                                name: Negative
                            });
                        });
                    }
                });
            }
        });

        return 'Info descargada y guardada en la base de datos!!'
    }
    catch(e){
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