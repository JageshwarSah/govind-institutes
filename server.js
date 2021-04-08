const dotenv = require('dotenv');
const app = require('./src/api/v1/app');

dotenv.config({ path: './config.env' });

const port = process.env.NODE_ENV || 3000;

app.listen(port, () => {
  console.log(`App is runing on port ${port}`);
});
