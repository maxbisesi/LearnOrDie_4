import express from 'express';
import config from './config';
// import serverRender from './renderers/serverRender';
import mime from 'mime';
//import cors from 'cors';
import morgan from 'morgan';
import { extname } from 'path';
import chalk from 'chalk';
import Data from './DataApi';

const app = express();
const router = express.Router();
const dataApi = new Data();
/*
What a server response looks like --- >

{data: {…}, status: 200, statusText: "OK", headers: {…}, config: {…}, …}
config:
adapter: ƒ xhrAdapter(config)
data: "{"user":"max","pass":"pass"}"
headers: {Accept: "application/json, text/plain, ", Content-Type: "application/json;charset=utf-8"}
maxContentLength: -1
method: "post"
timeout: 0
transformRequest: [ƒ]
transformResponse: [ƒ]
url: "/login"
validateStatus: ƒ validateStatus(status)
xsrfCookieName: "XSRF-TOKEN"
xsrfHeaderName: "X-XSRF-TOKEN"
__proto__: Object
data:
name: "Max Bisesi"
password: "pass"
username: "max"
__proto__: Object
headers:
connection: "keep-alive"
content-length: "56"
content-type: "application/json; charset=utf-8"
date: "Wed, 11 Dec 2019 19:21:39 GMT"
etag: "W/"38-RYojwT5JM+xHalw11Yd6MAOESgc""
x-powered-by: "Express"
__proto__: Object
request: XMLHttpRequest {readyState: 4, timeout: 0, withCredentials: false, upload: XMLHttpRequestUpload, onreadystatechange: ƒ, …}
status: 200
statusText: "OK"
__proto__: Object


*/
app.use(morgan('combined'));
app.set('view engine', 'ejs');

// Middleware for every reqest that comes in
router.use(express.json());
router.use((req, res, next) => {
  console.log(chalk.blue('%s %s %s', req.method, req.url, req.path));
  next();
});

router.use(express.static('public'));

router.get('/', async (req, res) => {
  // const initialContent = await serverRender();
  res.render('main');
});

router.post('/register', (req, res) => {
  /*let un = req.body.user;
  let pw = req.body.pass;
  console.log(`un = ${un}`);
  console.log(`pw = ${pw}`);
  res.send('it worked !'); */
});

router.post('/login', async (req, res) => {
  console.log(chalk.yellowBright('please login'));
  
  // check credentials and return yay or nay
  let un = req.body.user;
  let pw = req.body.pass;
  
  let loginResult = dataApi.checkCredentials(un, pw);

  if (loginResult === 'Invalid password') {
    // 401 unauthorized
    res.sendStatus(401);
  }
  if (loginResult === 'Not Found') {
    // 403 Forbidden
    res.sendStatus(403);
  }
  if (typeof loginResult === 'object' && loginResult.username === un && loginResult.password === pw) {
    console.log(chalk.blue.bgGray(' credentials accepted'));
    res.status(200).type('application/json').send(loginResult);
  }

});

router.get('/getCards', async (req, res) => {
  let id = req.body.userid;
  // cards array
  let cards = dataApi.getCardsForUser(id);
  res.status(200).type('application/json').send(cards);
});

app.use('/', router);

app.listen(config.port, () => {
  console.log(`Running on port: ${config.port} ... b`);
});
