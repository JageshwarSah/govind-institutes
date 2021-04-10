const path = require('path');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');

const global_error_handler = require('./middlewares/global_error_handler');
const Error = require('./helpers/error_handler');

// IMPORT ROUTES
const studentRouter = require('./routes/students');
const userRouter = require('./routes/users');
const teacherRouter = require('./routes/teachers');

//* Express App
const app = express();

// Serve static files
app.use('public', express.static('public'));
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, './views'));

// MIDDLEWARES
// Set Http Security headers
app.use(helmet());

// For development
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

app.use(express.json({ limit: '10kb' }));

// ROUTES

app.use('/api/v1/users', userRouter);
app.use('/api/v1/students', studentRouter);
app.use('/api/v1/teachers', teacherRouter);

// Handle Unknown routes
app.use('*', (req, res, next) => {
  throw new Error('unknown route', 500);
});

//! Global Error Handler
app.use(global_error_handler);

module.exports = app;
