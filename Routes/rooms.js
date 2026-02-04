const express = require('express');
const router = express.Router();
const produitController = require('../controler/usercontroler.js'); // <-- corrige le dossier + extension

router.post('/create', produitController.create);

module.exports = router;