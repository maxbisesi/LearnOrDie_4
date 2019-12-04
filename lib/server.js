import express from 'express';
import config from './config';

const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
	res.render('index', { answer: 4 });
});

app.listen(config.port, () => {
  console.log(`Running on port: ${config.port} ... b`);
});
