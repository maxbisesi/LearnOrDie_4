import express from 'express';
import { config, queries } from './config';
// import serverRender from './renderers/serverRender';
import mime from 'mime';
//import cors from 'cors';
import morgan from 'morgan';
import { extname } from 'path';
import chalk from 'chalk';
import DAO from './DAO';
import { fail } from 'assert';

const app = express();
const router = express.Router();
const dataDAO = new DAO();

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

router.post('/saveStateToDB', async (req, res) => {
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

    history.forEach( (part, i, theArray) => {
      total++;
      nailed += theArray[i].nailed;
      whiffed += theArray[i].whiffed;
    });
    const sessionRowsCreated = dataApi.saveUserSession(total, nailed, whiffed, userId);
    if( sessionRowsCreated !== 1) { throw new Error('Server: User Session not updated correctly'); }

    // Get the card ratings for this session and update the cards stored in DB
    // Function is a predicate, to test each element of the array. Return true to keep the element, false otherwise
    const ratingsNew = history.filter( (his) => {
      // undefined cardids were inserted in this session, therefore they dont' yet exist in the db.
      return his.cardid !== undefined;
    });

    // TODO What's the fallback here if one data source throws an exception is the rest of that data going to be lost ? ? 
    for (const rate of ratingsNew) { 
      const rateResult = await dataApi.updateRating(rate.cardid, rate.whiffed, rate.nailed);
      if(rateResult !== 1) { throw new Error(' Server: Card rating did not complete succesfully') };
    }
    // Insert the new Cards
    const multInsertResult = await dataApi.addCards(newCards);

    // TODO return something...
});

router.post('/updateCards', async (req,res) => {
  // TODO What's the fallback here if one data source throws an exception is the rest of that data going to be lost ? ? 
  const cards = req.body.cards;
  const failedInserts = {};

  for (const item of cards) {
    const good = await dataApi.updateCard(item.card,item.answer,item.cateogry,item.cardid);
    if(good !== 1) {
      failedInserts[item.cardid] = {errorCode: good, 'card':item.card, 'answer': item.answer, 'category': item.category};
    }
  }

  // TODO make this a utils function...
  for ( let [key,{errorCode, card, answer, category}] of Object.entries(failedInserts) ) { 
      console.log(chalk.redBright.bgYellowBright(`updateCards: card not updated successfully: card id -> ${key} errorCode: ${errorCode}`));
      console.log(chalk.redBright.bgYellowBright(`-----------------------`));
      console.log(chalk.redBright.bgYellowBright(`  updateCards: Update should be: \n`));
      console.log(chalk.redBright.bgYellowBright(`  ${card} \n`));
      console.log(chalk.redBright.bgYellowBright(`-----------------------`));
      console.log(chalk.redBright.bgYellowBright(`  ${answer} \n`));
      console.log(chalk.redBright.bgYellowBright(`-----------------------`));
      console.log(chalk.redBright.bgYellowBright(`  ${category} \n`));
      console.log(chalk.redBright.bgYellowBright(`-----------------------`));
    } 
});

router.post('/register', async (req, res) => {
  let un = req.body.user;
  let pw = req.body.pass;
  let em = req.body.email
  let av = req.body.avatar;

  let usernameExists = await dataDAO.query(queries.getUser,[un]);

  if( usernameExists.length === 0){
    // UserName not found, proceed.
    //let registeredUser = await dataApi.addFlashUser(un, pw, 'firstname', 'lastname', em, avatar);
    // go Back and have them choose an avatar == >
    res.sendStatus(202);
  }
  // That username already exists, tell them:
  else { 
    res.sendStatus(204);
  }
} 
  //Registration flow with Avatar
  else {

  }
});

router.post('/register', async (req, res) => {
  
  
});

router.post('/login', async (req, res) => {
  //Check the credentials
  // See if they exist, but also use joins ( in case they do exist ) to get everything they need.
  // What they need: Avatar, Cards, Sessions, Card Sets, Weapons.
  let un = req.body.user;
  let pw = req.body.pass;

  const userQueryResponse = dataDAO.query(queries.getUser,[un]);

  if(userQueryResponse.length === 1){
    // user returned, check password:
    const user = userQueryResponse[0];
    if(user.password === pw) {
      // Password ok
      // Get their Cards and everything else
      const cardsResponse = dataDAO.query(queries.getUsersCards,[user.user_id]);
      const avatar = dataDAO.query(queries.getAvatars,[user.user_id]);
      // these are cardsets with set id, card id.
      // Use existing list of cards for organize sets.
      const setsQueryResult = dataDAO.query(queries.getCardSetCards,[user.user_id]);

      // transform the Query Results into something more usefull:
      // the card set response: [{set_id:1,card_id:1}, {set_id:2,card_id:2}, {set_id:3,card_id:3}]
      const cardSets = {};
      setsQueryResult.forEach( set =>{
        const setid = set.set_id;
        const cardid = set.card_id;
        if( cardSets.keys.includes(setid) ){
          cardSets[setid].push(cardid);
        }else {
          cardSets[setid] = [cardid];
        }
      });
      // ================================

      const sessions = dataDAO.query(queries.getUserSessions,[user.user_id]);
      console.log(`Sessions: ${sessions.length}`);

      const body = {'loggedInUser':user,'cards':cardsResponse,'avatar':avatar,'sessions':sessions,'cardSets':cardSets};
      res.status(200).type('application/json').send(body);

    } else {
      // Send wrong pw messege
      res.sendStatus(401);
    }

  } else {
    if(userQueryResponse.length === 0){
      // user does not exist
      res.sendStatus(403);
    }else { fail(); }
  }
});

app.use('/', router);

app.listen(config.port, () => {
  console.log(`Running on port: ${config.port} ... b`);
});
