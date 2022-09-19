const express = require('express');
const router = express.Router();
const { writeError } = require('../../utils/handle/logger.handle');
const { downloadInfo } = require('../controller/scrap.controller');

//
router.use(express.json());

router.get('/', (req, res) => { res.json( "WeedStrains API" ) });

router.get('/downloadInfo', (req, res) => {
    downloadInfo()
    .then(result => res.json({ status: 200, message: result }))
    .catch(error => {
        //
        writeError(error);
        
        //
        res.json({ status: 500, message: error })
    })
});

router.get('/leer', (req, res) => {
    weedController.leer()
    .then(result => res.json({ status: 200, message: result }))
    .catch(error => {
        //
        writeError(error);
        
        //
        res.json({ status: 500, message: error })
    })
});

router.get('/exportar', (req, res) => {
    weedController.exportar()
    .then(file => {
        res.attachment(file.route);
        res.status(200).send(file.csv);
    })
    .catch(error => {
        //
        writeError(error);
        
        //
        res.json({ status: 500, message: error })
    })
});

module.exports = router;