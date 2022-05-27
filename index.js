require('dotenv').config();
const app = require('./src/app');
const connectToDb = require('./src/config/database');
const { PORT } = require('./config');

connectToDb();

app.listen(PORT, () => {
  console.info(`Server is running on PORT: ${PORT}`.yellow.bold);
});
