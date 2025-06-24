const express = require('express');
const router = express.Router();
const partidoCtrl = require('../controllers/partido.controller');

// POST /api/partidos
router.post('/partidos', partidoCtrl.addPartido);

module.exports = router;
