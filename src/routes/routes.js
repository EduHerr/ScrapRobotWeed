const express = require('express');
const router = express.Router();
const weedController = require('../controller/weed.controller');

const fs = require('fs');
const { resolve } = require('path');

//
router.use(express.json());

router.get('/', (req, res) => { res.json( "WeedStrains API" ) });

router.get('/downloadInfo', (req, res) => {
    weedController.descargarInfo()
    .then(result => res.json({ status: 200, message: result }))
    .catch(error => res.json({ status: 500, message: error }))
});

router.get('/leer-strains', (req, res) => {
    weedController.leerColeccion()
    .then(result => res.json({ status: 200, message: result }))
    .catch(error => res.json({ status: 500, message: error }))
});

router.get('/prueba', (req, res) => {
    fs.writeFile('./src/backsource/prueba.txt', 'hello world!!! Prueba', { encoding: 'utf8'}, (err) => {
        if(!err){
            res.json({status: 200, message:'archivo generado con exito!!'});
        }
        else{
            res.json({status: 500, message:'Hubo un error: '+err});
        }
    });
});

module.exports = router;