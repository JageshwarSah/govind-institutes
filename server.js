const dotenv = require('dotenv');

//! Handle UncaughtException Event
process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  process.exit(1);
});

const database = require('./src/api/v1/helpers/database');
const app = require('./src/api/v1/app');

dotenv.config({ path: './config.env' });

const port = process.env.PORT || 3000;

// Database initialization
const db = process.env.DATABASE_URL.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

// TODO: Implement Retry Function for db connection

let server;
let retry_count = 3;
const start_applicatoin = async () => {
  try {
    await database.connect(db);
    server = app.listen(port, () => {
      console.log(`App is runing on port ${port}`);
    });
  } catch (err) {
    console.log(err.name, err.message);
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

//! Handle UnhandledRejection Event
process.on('unhandledRejection', (err) => {
  console.log('Shutting down server...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
