const { Schema, model } = require('mongoose');

const cannabinoideSchema = new Schema({
    nombre: { type: String }
});

module.exports = model('Cannabinoide', cannabinoideSchema);