const { Schema, model } = require('mongoose');

const weedSchema = new Schema({
    nombre: { type: String, default: null }, 
    calificacion: { type: Number, default: null }, 
    tipo: { type: String, default: null }, 
    efecto: { type: String, default: null }, 
    aroma: { type: String, default: null }, 
    sustancia: { type: String, default: null },
    _Sabor: { type: Array, default: null },
    _Sensacion: { type: Array, default: null },
    _SensacionNegativa: { type: Array, default: null },
    _Cannabinoide: { type: Array, default: null },
    createdAt: { type: Date, default: new Date.now() }
});

module.exports = model('Weed', weedSchema);