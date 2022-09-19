const { Schema, model } = require('mongoose');

const negativeSchema = new Schema({
    nombre: { type: String }
});

module.exports = model('Negative', negativeSchema);