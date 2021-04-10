const Error = require('./../helpers/error_handler');
// Custom Global Error Handler

//* Send production error response
const send_production_error = (error, res) => {
  response.fail(res, error.status_code, error.message);
};

// TODO Define more operational errors
// Duplicate field error
const duplicate_field_error_db = (err) => {
  const message = `Duplicate field entry, [${Object.keys(
    err.keyValue
  )}: ${Object.values(err.keyValue)}]`;
  return new Error(message, 400);
};

const validation_error_db = (err) => {
  return new Error('Error Login, try again', 400);
};

const jwt_token_error = () => {
  return new Error();
};

//* This is the global error handler overridden method provided by express
module.exports = (err, req, res, next) => {
  err.status_code = err.status_code || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    //* Send detailed informatin for debugging
    res.status(err.status_code).json({
      status: err.status,
      message: err.message,
      descrpition: 'This is from global error middleware',
      err,
    });
  }

  if (process.env.NODE_ENV === 'production') {
    let error = Object.assign(err);

    //! Mark known error as operational
    if (error.code === 11000) error = duplicate_field_error_db(error);
    // if (error.name === 'ValidationError') error = validation_error_db(error);
    if (error.name === 'JsonWebTokenError') error = jwt_token_error();

    //* Send proper user friendly error
    if (error.is_operational) {
      console.log(error);
      res.status(error.status_code).json({
        status: 'fail',
        message: error.message,
      });
    } else {
      //* Send generic error message --dont leak any info
      console.log(error);
      res.status(500).json({
        status: 'error',
        message: 'Something went wrong',
      });
    }
  }
};
