const express = require('express');
const router = express.Router();
const weedController = require('../controller/weed.controller');

const weedDAO = require('../dao/weed.dao');

//
router.use(express.json());

router.get('/', (req, res) => { res.json( "WeedStrains API" ) });

router.get('/obtenerTipos', (req, res) => {
    weedController.obtenerPaginado()
    .then(result => res.json({ status: 200, message: result }))
    .catch(error => res.json({ status: 500, message: error }))
});

router.post('/crear-archivo', (req, res) => {
    weedDAO.validarExistenciaHist(req.body)
    .then(result => res.json({ status: 200, message: result }))
    .catch(error => {
        console.log(error);

        res.json({ status: 500, message: error });
    })
});

module.exports = router;