const { Schema, model } = require('mongoose');

const flavorSchema = new Schema({
    nombre: { type: String }
});

module.exports = model('Flavor', flavorSchema);