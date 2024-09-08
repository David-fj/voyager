const express = require('express');
const userRoutes = require('./routes/userRoutes');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, '../public')));

app.use(express.json());

app.use('/api', userRoutes);

module.exports = app;
