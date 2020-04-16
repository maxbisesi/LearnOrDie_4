import express from 'express';
import { config, queries } from './config';
// import serverRender from './renderers/serverRender';
import mime from 'mime';
//import cors from 'cors';
import morgan from 'morgan';
import { extname } from 'path';
import DAO from './DAO';
import { fail } from 'assert';
import logger from './Logger';
import chalk from 'chalk';

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

router.post('/insertCard', async (req, res) => {
  const user_id = req.body.user_id;
  const {card,answer,category} = req.body.card;

  const newCard = await dataDAO.runQuery(queries.insertCard,[card,answer,category,user_id]);
  const newCard_Id = newCard.insertId;
  const newCardRows = newCard.affectedRows;

  const linkRecord = await dataDAO.runQuery(queries.insertFlashCardUser,[newCard_Id,user_id,0,0,user_id]);
  const linkRecordRows = linkRecord.affectedRows;
  
  // THINK ABOUT THIS WHERE SHOULD OWNER ID BE HELD ???? >>>
  // Should Be on the card, that way when you're updating a card you can check that the
  // user updating is the owner of the card.
  const dbCard = {'card_id':newCard_id, 'card':card, 'answer':answer, 'category':category, 'owner_id':user_id};
  if(newCardRows === 1 && linkRecordRows === 1) {
    res.status(200).type('application/json').send(dbCard);
  } else { fail(); }

});

router.post('/saveSession', async (req, res) => {
  // This is just for saving a users state when they leave or logout.

    logger('SERVER SAVE SESSION BEFORE UNLOAD');
    const { cards_seen, correct, incorrect, cards_added, points_added,  card_sets_added, user_id } = req.body.session;
    /*
    cards_seen,
    correct,
    incorrect,
    cards_added,
    points_added,
    card_sets_added,
    date,user_id */
    const sessionResult = await dataDAO.runQuery(config.insertSession,[cards_seen, correct, incorrect, cards_added, points_added,  card_sets_added, user_id]);
    if( sessionResult.affectedRows === 1) {
      res.sendStatus(200);
    }else { fail('Server: /saveSession session didnt save.'); }
});

router.post('/updateCard', async (req,res) => {
  // TODO What's the fallback here if one data source throws an exception is the rest of that data going to be lost ? ? 
  const { card_id, card, answer, category } = req.body.card;
  const upCardResult = await dataDAO.runQuery(config.updateCard,[card,answer,category,card_id]);
  if(upCardResult.affectedRows === 1) {
    res.status(200).type('application/json').send({ card_id, card, answer, category });
  } else { fail( 'Server /updateCard: Card did not update.'); }


});

router.post('/register', async (req, res) => {
  const un = req.body.user;
  const pw = req.body.pass;
  const em = req.body.email
  const av = req.body.avatar;
  const wp = req.body.weapon;
  const bs = req.body.birthstar;
  const sty = req.body.style;

  let usernameExists = await dataDAO.runQuery(queries.getUser,[un]);

  if( usernameExists.length === 0){
    // UserName not found, proceed.
    //Insert User, get their ID
    let registeredUser = await dataDAO.runQuery(queries.createUser,[un,pw,em]);
    const userId = registeredUser.insertId;
    // Insert their weapon
    // WARNING Still must decide what weapons are, until then this will just insert a blank weapon
    const damage = 0; // Maybve get this from the store ?
    const defense = 0; // < -- this too
    // - - - - - - - - - - - - - - - -
    let userWeapon = await dataDAO.runQuery(queries.createWeapon,[wp,damage,defense]);
    const weaponId = userWeapon.insertId;
    // Insert Avatar using previous two ids...
    let insertedAvatar = await dataDAO.runQuery(queries.createAvatar, [sty,bs,userId,weaponId,av,1]);
    let avatarId = insertedAvatar.insertId;

    //Now package that data and log them into the store

    // Return this first time user, Register will set them in the store
    const user = {'user_id': userId,
                  'username': un,
                  'email': em,
                  'points': 0,
                  'rank': "Recruit",
                  'guest': false,
                  'firstTimeUser': true};
    // Set up their avatar so Register can set it in the store
    const avatar = {'avatar_id':avatarId,
           'style':sty,
            'user_id':userId,
             'birthstar':bs,
              'primary_weapon':wp,
              'weaponId':weaponId,
              'name':av 
          };

    const body = {'user':user,'avatar':avatar};
    logger(body);
    res.status(200).type('application/json').send(body);
  }
  // That username already exists, tell them:
  else if(usernameExists.length > 0){ 
    res.sendStatus(204);
  } else {
    // Assert false;
    fail();
  }

});

router.post('/login', async (req, res) => {
  //Check the credentials
  // See if they exist, but also use joins ( in case they do exist ) to get everything they need.
  // What they need: Avatar, Cards, Sessions, Card Sets, Weapons.
  let un = req.body.user;
  let pw = req.body.pass;
  logger(`/login: username: ${un} password:${pw}`);
  // REMEBER This returns an array. 
  const userQueryResponse = await dataDAO.runQuery(queries.getUser,[un]);
  //dataDAO.runQuery(`SELECT * FROM FlashUsers WHERE username='maxbisesi'`,[un]);
  logger(`/login: response: ${JSON.stringify(userQueryResponse)}`);
  if(userQueryResponse.length === 1){
    // user returned, check password:
    const user = userQueryResponse[0];
    if(user.password === pw) {
      logger(`/login: Passwords match ${user.password} = ${pw}`);
      // Password ok
      // Get their Cards and everything else
      // What do you do if they have no cards ? 
      const cardsResponse = await dataDAO.runQuery(queries.getUsersCards,[user.user_id]);
      cardsResponse.forEach( (card,ind) => { if(Object.values(card).includes(undefined)) {fail(`undefined value for: ${JSON.stringify(card)}`)}  })
      const avatar = await dataDAO.runQuery(queries.getAvatars,[user.user_id]);
      // these are cardsets with set id, card id.
      // Use existing list of cards for organize sets.
      const setsQueryResult = await dataDAO.runQuery(queries.getCardSetCards,[user.user_id]);
      logger(`/login: cards: ${cardsResponse.length}, avatar: ${avatar.length}, sets: ${setsQueryResult.length}`);
      // transform the Query Results into something more usefull:
      // the card set response: [{set_id:1,card_id:1}, {set_id:2,card_id:2}, {set_id:3,card_id:3}]
      const cardSets = {};
      setsQueryResult.forEach( set =>{
        const setid = set.set_id;
        const cardid = set.card_id;
        if( Object.keys(cardSets).includes(setid) ){
          cardSets[setid].push(cardid);
        }else {
          cardSets[setid] = [cardid];
        }
      });
      // ================================

      const sessions = await dataDAO.runQuery(queries.getUserSessions,[user.user_id]);
      logger(`/login: sessions: ${sessions.length}`);

      const body = {'loggedInUser':user,'cards':cardsResponse,'avatar':avatar,'sessions':sessions,'cardSets':cardSets};
      res.status(200).type('application/json').send(body);
    } else {
      // Send wrong pw messege
      res.sendStatus(401);
    }

  } else if(userQueryResponse.length === 0){
      // user does not exist
      logger('User name not found.');
      res.sendStatus(403);
  }else { 
    fail('ERROR: More than one user returned on Login. Or incorrect response.'); 
  }
});

router.post('/loadData', async (req, res) => {
  loadData();
});

app.use('/', router);

app.listen(config.port, () => {
  logger(`Running on port: ${config.port} ... b`);
});
