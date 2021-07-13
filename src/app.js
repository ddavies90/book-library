const express = require('express');
const app = express();

app.get('/', (__, res) => res.send(__dirname));

module.exports = app;