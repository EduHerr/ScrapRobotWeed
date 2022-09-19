const { Schema, model } = require('mongoose');
const Flavor = require('./Flavor');
const Feeling = require('./Feeling');
const Negative = require('./Negative');
const Cannabinoide = require('./Cannabinoide');

const weedSchema = new Schema({
    nombre: { type: String, default: null }, 
    calificacion: { type: Number, default: null }, 
    tipo: { type: String, default: null }, 
    efecto: { type: String, default: null }, 
    aroma: { type: String, default: null }, 
    sustancia: { type: String, default: null },
    _Sabor: { type: [ Flavor ], default: null },
    _Sensacion: { type: [ Feeling ], default: null },
    _SensacionNegativa: { type: [ Negative ], default: null },
    _Cannabinoide: { type: [ Cannabinoide ], default: null },
    createdAt: { type: Date, default: new Date.now() }
});

module.exports = model('Weed', weedSchema);