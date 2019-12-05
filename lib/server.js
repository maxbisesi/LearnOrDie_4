import express from 'express';
import config from './config';
import serverRender from 'renderers/serverRender';

const app = express();

app.use(express.static('public'));
app.use(express.json());

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  const initialContent = serverRender();
  res.render('index', { initialContent });
});

app.post('/login', (req, res) => {
	let un = req.body.user;
	let pw = req.body.pass;

	console.log(`un = ${un}`);
	console.log(`pw = ${pw}`);

	res.send('it worked !');
});

app.listen(config.port, () => {
  console.log(`Running on port: ${config.port} ... b`);
});
