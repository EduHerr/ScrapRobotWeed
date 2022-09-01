class ExternalError extends Error{
    constructor(message){
        super(message);
        this.name = "ExternalError";
    }
}

module.exports = ExternalError;