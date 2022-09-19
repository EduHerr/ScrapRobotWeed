const { Schema, model } = require('mongoose');

const weedSchema = new Schema({
    nombre: { type: String, default: null }, 
    calificacion: { type: Number, default: null }, 
    tipo: { type: String, default: null }, 
    efecto: { type: String, default: null }, 
    aroma: { type: String, default: null }, 
    sustancia: { type: String, default: null },
    _Sabor: [{ type: Schema.Types.ObjectId, ref: 'Flavor' }],
    _Sensacion: [{ type: Schema.Types.ObjectId, ref: 'Feeling' }],
    _SensacionNegativa: [{ type: Schema.Types.ObjectId, ref: 'Negative' }],
    _Cannabinoide: [{ type: Schema.Types.ObjectId, ref: 'Cannabinoide' }],
    createdAt: { type: Date, default: new Date() }
});

module.exports = model('Weed', weedSchema);