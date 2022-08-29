const express = require('express');
const router = express.Router();
const weedController = require('../controller/weed.controller');

//
const weedDao = require('../dao/weed.dao');

//
router.use(express.json());

router.get('/', (req, res) => { res.json( "WeedStrains API" ) });

router.get('/downloadInfo', (req, res) => {
    weedController.descargarInfo()
    .then(result => res.json({ status: 200, message: result }))
    .catch(error => res.json({ status: 500, message: error }))
});

router.get('/crear', (req, res) => {
    weedDao.read()
    .then(result => res.json({ status: 200, message: result }))
    .catch(error => res.json({ status: 500, message: error }))
});

module.exports = router;