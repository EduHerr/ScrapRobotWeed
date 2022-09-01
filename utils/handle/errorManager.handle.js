const { writeError } = require('./logger.handle');

module.exports.manage = (Error) => {
    try{
    //Validar que errores si iran al log
        // if(Error.name != 'ExternalError'){

        // }
        
        writeError(Error);

        // throw Error;
    }
    catch(error){
        console.log(error);
    }
}