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
  logger(` - INSERTED CARD ID  --- ${newCard.insertId} ---`);
  logger(JSON.stringify(newCard));
  logger(`==========================`);
  const newCard_Id = newCard.insertId;
  const newCardRows = newCard.affectedRows;

  const linkRecord = await dataDAO.runQuery(queries.insertFlashCardUser,[newCard_Id,user_id,0,0]);
  logger(` - LINK RECORD CREATED -`);
  logger(JSON.stringify(linkRecord));
  logger(`==========================`);
  const linkRecordRows = linkRecord.affectedRows; 

  // user updating is the owner of the card.
  // Put together this card object to be added to the store in the app.
  // You have to do this becasue the way the cards are represented in the app is different than
  //    in the database. 
  const dbCard = {'card_id':newCard_Id, 'card':card, 'answer':answer, 'category':category, 'owner_id':user_id};
  if(newCardRows === 1 && linkRecordRows === 1) {
    res.status(200).type('application/json').send(dbCard);
  } else { fail(); }
});

router.post('/insertCardList', async (req, res) => { 
  const cardList = req.body.cards;
  const owner_id = req.body.user_id;
  const vals = [];
  logger(`INSERTING: ${cardList.length} cards`);
  // Build multi query:
  // INSERT INTO FlashCards(card,answer,category,owner_id) VALUES(?,?,?,?)`
  /*
    card_id:
    card:
    answer:
    category:
    owner_id:
    insertCard: `INSERT INTO FlashCards(card,answer,category,owner_id) VALUES(?,?,?,?)`, */
  cardList.forEach( (c) => {
      if(c.card === undefined || c.answer === undefined || c.category === undefined) { 
        fail('/insertCardList: undefined attribute.');
      }
      vals.push([c.card,c.answer,c.category,owner_id]);
  });

  //const newIDs = [['New Card Id','Index in vals']];
  const newIDs = [];
  for(let j = 0; j<vals.length; j++) {
    const insResult = await dataDAO.runQuery(queries.insertCard,vals[j]);
    if(insResult.affectedRows === 1) {
      newIDs.push([insResult.insertId,j]);
    } else { fail(`A card was not inserted: ${JSON.stringify(val)}`); }
  }

  // Turn data into new Card list
  const newCards = [];
  if(newIDs.length === vals.length) {
    newIDs.forEach( (elm) => { 
      const valindex = elm[1];
      const id = elm[0];
      const cardData = vals[valindex];
      const card = cardData[0];
      const ans = cardData[1];
      const cat = cardData[2];
      const ownerid = cardData[3];
      const c = { 'card_id':id,'card':card,'answer':ans,'category':cat,'owner_id':ownerid };
      newCards.push(c);
    });
  }

  if(newCards.length === cardList.length) {
    res.status(200).type('application/json').send({'cards':newCards});
  } else { fail(`Number of inserted IDs: - ${newCards.length} - does not equal number of cards: - ${cardList.length} -`); }
});

router.post('/saveSession', async (req, res) => {
    logger(`/saveSession: session:\n ${JSON.stringify(req.body.session)} \n`);
    const { correct, incorrect, cards_added, points_added,  card_sets_added, user_id } = req.body.session;
    const sessionResult = await dataDAO.runQuery(queries.insertSession,[correct, incorrect, cards_added, points_added, card_sets_added, user_id]);
    logger(`/saveSession: SESSION SAVED - ${JSON.stringify(sessionResult)} -`);
    if( sessionResult.affectedRows === 1) {
      res.status(200).type('application/json').send({'sessionId':sessionResult.insertId});;
    }else { fail('Server: /saveSession session didnt save.'); }
});

router.post('/updateCard', async (req,res) => {
  // TODO What's the fallback here if one data source throws an exception is the rest of that data going to be lost ? ? 
  const { card_id, card, answer, category } = req.body;
  logger(`/updateCard: \n- ${card_id} -\n- ${JSON.stringify(card)} -\n- ${answer} -\n- ${category} -`);
  const _card = card.replace(`'`,`\'`);
  const _answer = answer.replace(`'`,`\'`);
  const _category = category.replace(`'`,`\'`);
  logger(`/updateCard: ${queries.updateCard}\n card_id: -- ${card_id} --`);
  const upCardResult = await dataDAO.runQuery(queries.updateCard,[_card,_answer,_category,card_id]);
  if(upCardResult.affectedRows === 1) {
    res.status(200).type('application/json').send({card_id, card, answer, category});
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

  if( usernameExists.length === 0 ){
    // UserName not found, proceed.
    //Insert User, get their ID
    let registeredUser = await dataDAO.runQuery(queries.createUser,[un,pw,em,'Recruit']);
    const userId = registeredUser.insertId;
    
    /*
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
    */
    //Now package that data and log them into the store

    // Return this first time user, Register will set them in the store
    const user = {'user_id': userId,
                  'username': un,
                  'email': em,
                  'userrank':'Recruit',
                  'points': 0};
    // Set up their avatar so Register can set it in the store
    /*const avatar = {'avatar_id':avatarId,
                    'style':sty,
                    'user_id':userId,
                    'birthstar':bs,
                    'primary_weapon':wp,
                    'weaponId':weaponId,
                    'name':av 
                };
    */
    const body = {'user':user};
    res.status(200).type('application/json').send(body);
  }
  // That username already exists, tell them:
  else if(usernameExists.length > 0){ 
    res.sendStatus(400);
  } else {
    // Assert false;
    fail();
  }

});

router.post('/deletUser', async (req, res) => { 
  // Deletes the user, but not his cards, nullifies his cards.
  const user_id = req.data.user_id;
  
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
      //logger(`/login: cards: ${cardsResponse.length}, avatar: ${avatar.length}, sets: ${setsQueryResult.length}`);
      // transform the Query Results into something more usefull:
      // the card set response: [{set_id:1,card_id:1}, {set_id:2,card_id:2}, {set_id:3,card_id:3}]
      // CARDSETS = set_id | setname | description
      let cardSetCards = {};
      logger(`setsQUERY: ${JSON.stringify(setsQueryResult)}`);
      // [{"set_id":9,"card_id":10},{"set_id":9,"card_id":11},{"set_id":9,"card_id":12}]
      for(let y = 0; y<setsQueryResult.length; y++) {
        let set = setsQueryResult[y];
          if( cardSetCards.hasOwnProperty(set.set_id) ) { 
            cardSetCards[set.set_id].push(set.card_id);
          } else {
            cardSetCards[set.set_id] = [set.card_id];
          }
      }
      // Now you'll have an object where properties are set ids and the value is an array of card_ids ! 
      // ================================
      const cardSetData = {};
      let setKeys = Object.keys(cardSetCards);
      for(let x = 0; x < setKeys.length; x++) {
        let setid = setKeys[x];
        let setData = await dataDAO.runQuery(queries.getCardSet,[setid]);
        cardSetData[setid] = {'setname':setData[0].setname, 'description':setData[0].description };
      }
      if(Object.keys(cardSetData).length !== Object.keys(cardSetCards).length) { fail(`Card Set data not matching CardSetCard data`); }
      
      const sessions = await dataDAO.runQuery(queries.getUserSessions,[user.user_id]);
      logger(`/login: sessions: ${sessions.length}`);

      const body = {'loggedInUser':user,'cards':cardsResponse,'avatar':avatar,'sessions':sessions,'cardSetCards':cardSetCards,'cardSetData':cardSetData};
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

router.post('/createSet', async (req,res) => {
  logger('Creating a card set...');
  const user_id = req.body.user_id;
  const cardsInSet = req.body.cards;
  const setname = req.body.setname;
  const setDesc = req.body.description;
  const _desc = setDesc.replace(`'`,`\'`);
  const _setname = setname.replace(`'`,`\'`);
  // Create the CardSet, get it's ID
  const cardsetResult = await dataDAO.runQuery(queries.insertCardSet,[_setname, _desc]);
  const cardsetId = cardsetResult.insertId;
  logger(`cardset result: ${JSON.stringify(cardsetResult)}`);
  // with that and the user_id, Create the CardSetUser get its ID
  // This table won't have an ID
  const csuserResult = await dataDAO.runQuery(queries.insertCardSetUser,[user_id,cardsetId]);
  logger(`cardsetUser result: ${JSON.stringify(csuserResult)}`);
  if(csuserResult.affectedRows !== 1 ){ fail(`/createSet: something went wrong with card set: ${cardsetId}\n inserting csu: ${user_id}`); }
  // For Every card create a CardSetCard with the set_id and card_id
  let cscardRes;
  for(let j = 0; j < cardsInSet.length; j++) {
     cscardRes = await dataDAO.runQuery(queries.insertCardSetCard,[cardsInSet[j],cardsetId]);
     if(cscardRes.affectedRows !== 1) {fail(`/createSet: someting went wrong with card set: ${cardsetId}\n inserting card: ${cardsInSet[j].card_id}`);}
  }
  // Send back setID name descirption and array of IDs
  res.status(200).type('application/json').send({'set_id':cardsetId, 'setname':setname, 'description':setDesc, 'cards':cardsInSet});
});

app.use('/', router);

export default app;