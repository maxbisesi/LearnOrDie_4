import app from './expressApp';
import { config } from './config';
import logger from './Logger';

app.listen(config.port, () => {
  logger(`Running on port: ${config.port} ...`);
});
