const express = require('express');
const router = express.Router();
const humController = require('../controllers/humControllers');

// Route to get temperature
router.get('/', humController.getHum);

router.get('/z-score', humController.getHumZ);

// Route to add new data point
router.post('/', humController.addHum);


module.exports = router;
