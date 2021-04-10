const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');

const global_error_handler = require('./middlewares/global_error_handler');
const Error = require('./helpers/error_handler');

// IMPORT ROUTES
const studentRouter = require('./routes/students');
const userRouter = require('./routes/users');

//* Express App
const app = express();

// MIDDLEWARES
// Set Http Security headers
app.use(helmet());

// For development
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

app.use(express.json({ limit: '10kb' }));

// ROUTES
app.use('/api/v1/students', studentRouter);
app.use('/api/v1/users', userRouter);
// Handle Unknown routes
app.use('*', (req, res, next) => {
  console.log('No-needed');
  throw new Error('unknown route', 500);
});

// Global Error Handler
app.use(global_error_handler);
module.exports = app;
