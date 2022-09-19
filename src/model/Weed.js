const { Schema, model } = require('mongoose');

const weedSchema = new Schema({
    nombre: { type: String, default: null }, 
    calificacion: { type: Number, default: null }, 
    tipo: { type: String, default: null }, 
    efecto: { type: String, default: null }, 
    aroma: { type: String, default: null }, 
    sustancia: { type: String, default: null },
    _Flavor: [{ type: String, default: null }],
    _Feeling: [{ type: String, default: null }],
    _Negative: [{ type: String, default: null }],
    _Cannabinoide: [{ type: String, default: null }],
    createdAt: { type: Date, default: new Date() }
});

module.exports = model('Weed', weedSchema);