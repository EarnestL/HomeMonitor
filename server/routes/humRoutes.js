const express = require('express');
const router = express.Router();
const humController = require('../controllers/humControllers');

// Route to get humidity
router.get('/', humController.getHum);

// Route to add new data point
router.post('/', humController.addHum);


module.exports = router;
