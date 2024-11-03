const express = require('express');
const router = express.Router();
const tempController = require('../controllers/tempControllers');

// Route to get temperature
router.get('/', tempController.getTemp);

// Route to add new data point
router.post('/', tempController.addTemp);


module.exports = router;
