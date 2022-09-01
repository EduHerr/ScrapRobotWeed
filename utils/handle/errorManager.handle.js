const { writeError } = require('./logger.handle');

module.exports.manage = (Error) => {
    try{
        //Validar que errores si iran al log
        if(Error.name == 'Error'){
            //Solo se guardan en el log los errores-internos && se excluyen las excepciones -ExteranlError-
            writeError(Error);
        }
        
        throw Error;
    }
    catch(error){
        console.log(error);
    }
}