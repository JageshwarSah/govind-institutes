const dotenv = require('dotenv');
const mongoose = require('mongoose');

const database = require('./src/api/v1/helpers/database');
const app = require('./src/api/v1/app');

dotenv.config({ path: './config.env' });

const port = process.env.PORT || 3000;

// Database initialization
const db = process.env.DATABASE_URL.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

// TODO Implement Retry Function for db connection
const start_applicatoin = async () => {
  try {
    await database.connect(db);
    app.listen(port, () => {
      console.log(`App is runing on port ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
};

// Start Application
start_applicatoin();
//
/* Steps in server starting
 * 1) Initialize Database
 *
 * 2) Connect Database
 *
 * 3) Start listening - only after database connection established
 */
