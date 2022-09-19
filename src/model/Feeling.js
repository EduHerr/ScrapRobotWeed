const { Schema, model } = require('mongoose');

const feelingSchema = new Schema({
    nombre: { type: String }
});

module.exports = model('Feeling', feelingSchema);