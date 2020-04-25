import app from './expressApp';

app.listen(config.port, () => {
  logger(`Running on port: ${config.port} ... b`);
});
