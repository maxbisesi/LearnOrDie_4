import app from './expressApp';
import logger from './Logger';
import dotenv from 'dotenv';
dotenv.config();
app.listen(process.env.PORT, () => {
  logger(`Running on port: ${process.env.PORT} ...`);
});
