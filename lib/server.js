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

router.post('/saveStateToDB', (req, res) => {
  // This is just for saving a users state when they leave or logout.
  // The databases concept of 'User Session' is different than this
  /*
    loggedIn: false,
    user : {
        user_id: '0',
        userName: 'guest_user',
        firstName: 'GUEST',
        lastName: 'GUEST',
        email: 'guestEmail',
        totalPoints: 0,
        cardCount: 0,
        rank: 'GUEST',
        guest: true
    },
    history: {cardid, whiffed, nailed},
    profile: {experience: 'guest'} */
    const user = req.body.user;
    /*  
      cards_seen,
      cards_correct,
      cards_incorrect,
      fk_user_id
    */
    // Updated the card content as sooon as update button was clicked...
    // so just save the session
    const userId = user.user_id;
    const history = req.body.data;
    const newCards = req.body.cards;
    // use this api to save the session as it is in the database, that's fine.
    // But also use the history to count the correct/incorrect answered cards, then update those accordingly.
    // TODO may have to add a new api to only update the card ratings.

    // History is an array of objects
    // get the session out of history, 
    let nailed = 0;
    let whiffed = 0;
    let total = 0;
    history.forEach( (hisElm) => {
      total++;
      nailed += hisElm.nailed;
      whiffed += hisElm.whiffed;
    });
    const sessionRowsCreated = dataApi.saveUserSession(total, nailed, whiffed, userId);
    if( sessionRowsCreated !== 1) { throw new Error('Server: User Session not updated correctly'); }

    // Get the card ratings for this session and update the cards stored in DB
    // TODO what happens when you try to rate a card that's not yet insertd.
    // handle that here...
    history.forEach( (card) => {
      if(card.cardid === undefined) { 
        // this means the card was inserted in this session, so do something different
        return;
      }
      const rateResult = dataApi.updateRating(card.cardid, card.whiffed, card.nailed);
      if(rateResult !== 1) { throw new Error(' Server: Card rating did not complete succesfully') };
    });

    // Insert the new Cards
    const multInsertResult = dataApi.addCards(newCards);
});

router.post('/updateCards', (req,res) => {
  const cards = req.body.cards;
  cards.forEach((item) =>{
    const good = dataApi.updateCard(item.card,item.answer,item.cateogry,item.cardid);
    if(good !== 1) { throw new Error('Card Not Updated correctly.') }
  });

});

router.post('/register', (req, res) => {
  /*let un = req.body.user;
  let pw = req.body.pass;
  console.log(`un = ${un}`);
  console.log(`pw = ${pw}`);
  res.send('it worked !'); */
});

router.post('/login', async (req, res) => {
  // check credentials and return yay or nay
  let un = req.body.user;
  let pw = req.body.pass;
  
  let user = await dataApi.checkCredentials(un, pw);

  if (user === 'Invalid password') {
    // 401 unauthorized
    res.sendStatus(401);
  }
  if (user === 'Not Found') {
    // 403 Forbidden
    res.sendStatus(403);
  }
  
  //this.props.login(loginResponse.data.user);
  // get id
  let id = user.user_id;
  let cardsResponse = await dataApi.getCardsForUser(id);
  console.log(chalk.magenta(`Response length from Data Api: ${cardsResponse.length}`));
  if(cardsResponse.length > 0) {
    console.log(chalk.redBright('...sending response')); 
    const body = {loggedInUser: user, cards: cardsResponse};
    res.status(200).type('application/json').send(body);
  }
  else{ throw new Error(`-- Login -- Couldn't get Cards from server  `);}
  

});

router.post('/getCards', async (req, res) => {
  let id = req.body.userid;
  // cards array
  let cards = await dataApi.getCardsForUser(id);
  res.status(200).type('application/json').send(cards);
});

app.use('/', router);

app.listen(config.port, () => {
  console.log(`Running on port: ${config.port} ... b`);
});
