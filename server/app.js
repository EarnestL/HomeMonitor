// app.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const tempRoutes = require('./routes/tempRoutes');
const humRoutes = require('./routes/humRoutes');


const app = express();

app.use(cors());
// Middleware
app.use(bodyParser.json());

// Routes
app.use('/temperature', tempRoutes);
app.use('/humidity', humRoutes);

module.exports = app;
