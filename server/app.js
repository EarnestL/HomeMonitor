// app.js
const express = require('express');
const bodyParser = require('body-parser');
const tempRoutes = require('./routes/tempRoutes');
const humRoutes = require('./routes/humRoutes');

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/temperature', tempRoutes);
app.use('/humidity', humRoutes);

module.exports = app;
