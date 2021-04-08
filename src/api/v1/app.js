const express = require('express');

const app = express();

app.use('*', (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'The api is under construction',
  });
});

module.exports = app;
