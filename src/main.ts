import app from './app';
import { APP_PORT } from './app/app.config';
import { connection } from './app/database/mysql';

app.listen(APP_PORT, () => {
  console.log(`App is running on port ${APP_PORT}.`);
});

/**
 * To test the mysql connection
 */
connection.connect((error) => {
  if (error) {
    console.log('Error: ', error.message);
    return;
  }
  console.log('Database connected successfully.');
});
