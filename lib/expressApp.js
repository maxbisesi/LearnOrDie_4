import express from 'express';
import { config, queries } from './config';
import mime from 'mime';
//import cors from 'cors';
import morgan from 'morgan';
import { extname } from 'path';
import DAO from './DAO';
import { fail } from 'assert';
import logger from './Logger';
import chalk from 'chalk';
import { genSaltSync, hashSync, compareSync } from 'bcryptjs';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();
const app = express();
const router = express.Router();
const dataDAO = new DAO();
const authTokens = [];

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
router.use(express.static('public'));
// Console loggin Middleware
router.use( (req, res, next) => {
  console.log(chalk.blue(req.method, req.url, req.path));
  console.log(chalk.blue(`REQUEST BODY middleware-1: ${JSON.stringify( req.body )}`));
  return next();
});

// Authorization Middleware
router.use( (req, res, next) => {
  console.log(chalk.blue(req.method, req.url, req.path));
  console.log(chalk.blue(`REQUEST BODY middleware-2: ${JSON.stringify( req.body )}`));
  // Authenticate
  if(req.path === '/' ||
     req.path === '/login' ||
     req.path === '/favicon.ico' ||
     req.path === '/register' || 
     req.path === '/getCard') { 
    next(); 
    return;
  }
  let token = req.body.user.token;
  let user_id = req.body.user.user_id;
  if(token === undefined || user_id === undefined) { fail('undefined Id or token'); }
  let knownToken = authTokens.find( toke => toke.user_id === user_id);

  if(knownToken === undefined) {
    logger('Auth token undefined.');
    res.status(501).send('undefined auth token');
  } else if(knownToken.token === token) {
      logger(chalk.greenBright(`Tokens match.`));
      return next();
  } else {
      logger(chalk.redBright('ERROR! middleware-2 tokens dont match !!! ->'));
      logger(`known token: ${knownToken}\n`);
      logger(`submitted Token: ${token}`);
      res.status(403).send('Token does not match known token.');
  }
});

router.get('/', async (req, res) => {
  res.render('main');
});

// With authtenticate implemented all requests from these paths will
// have to also include the token and user id. 
router.post('/insertCard', async (req, res) => {
  const user = req.body.user;
  let user_id = user.user_id;
  const {card,answer,category,owner_id,collection,image} = req.body.card;
  console.log(`----------------------`);
  console.log(` -- > ${card}`);
  console.log(` -- > ${answer}`);
  console.log(` -- > ${category}`);
  console.log(` -- > ${image}`);
  console.log(`----------------------`);

  const newCard = await dataDAO.runQuery(queries.insertCardWithImage,[card,answer,category,user_id,collection,image]);

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
  const dbCard = {'card_id':newCard_Id, 'card':card, 'answer':answer, 'category':category, 'owner_id':user_id,'collection':collection,'image':image};
  if(newCardRows === 1 && linkRecordRows === 1) {
    res.status(200).send(dbCard);
  } else { fail(); }
});

router.post('/insertCardList', async (req, res) => { 
  const cardList = req.body.cards;
  const user = req.body.user;
  const owner_id = user.user_id;
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
      // Just let the db use default NULL instead of inserting your own
      if(c.image === undefined || c.image === 'none') {
        c.image = null;
      } 
      vals.push([c.card,c.answer,c.category,owner_id,c.collection,c.image]);
  });

  //const newIDs = [['New Card Id','Index in vals']];
  const newIDs = [];
  for(let j = 0; j<vals.length; j++) {
    const insResult = await dataDAO.runQuery(queries.insertCardWithImage,vals[j]);
    if(insResult.affectedRows === 1) {
      newIDs.push([insResult.insertId,j]);
    } else { fail(`A card was not inserted: ${JSON.stringify(vals)}`); }
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
      const collection = cardData[4];
      const image = cardData[5];
      const c = { 'card_id':id,'card':card,'answer':ans,'category':cat,'owner_id':ownerid,'collection':collection,'image':image };
      newCards.push(c);
    });
  }

  if(newCards.length === cardList.length) {
    // MAJOR FIX ! also make sure to create the FlashCardUsers linking list.
    for(let x = 0; x<newCards.length; x++) {
      // INSERT INTO FlashCardUsers VALUES(?,?,?,?)`
      // | card_id | user_id | correct | incorrect
      const c = newCards[x];
      const linkResult = await dataDAO.runQuery(queries.insertFlashCardUser,[c.card_id, c.owner_id, 0, 0]);
      if(linkResult.affectedRows === 1) {
        continue;
      }else {
        fail(`Linking record not created for : ${c.card_id} - ${c.user_id}`);
      }
    }

    res.type('application/json').status(200).send({'cards':newCards});
  } else { fail(`Number of inserted IDs: - ${newCards.length} - does not equal number of cards: - ${cardList.length} -`); }
});

router.post('/saveSession', async (req, res) => {
    logger(`/saveSession: session:\n ${JSON.stringify(req.body.session)} \n`);
    const { correct, incorrect, cards_added, points_added, card_sets_added, user_id } = req.body.session;
    if(process.env.NODE_ENV === 'development') {
      logger('NOT SAVING SESSION IN DEVELOPMENT');
      res.sendStatus(200);
    } else {
      const sessionResult = await dataDAO.runQuery(queries.insertSession,[correct, incorrect, cards_added, points_added, card_sets_added, user_id]);
      logger(`/saveSession: SESSION SAVED - ${JSON.stringify(sessionResult)} -`);
      if( sessionResult.affectedRows === 1) {
        res.status(200).type('application/json').send({'sessionId':sessionResult.insertId});
      }else { fail('Server: /saveSession session didnt save.'); }
    }
});

router.post('/updateCard', async (req,res) => {
  // TODO What's the fallback here if one data source throws an exception is the rest of that data going to be lost ? ? 
  const { card_id, card, answer, category } = req.body.card;
  logger(` /updateCard: \n- ${card_id} -\n- ${JSON.stringify(card)} -\n- ${answer} -\n- ${category} -`);
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
  /**
   *   const testUser = {'username':'tester',
                   'password':'testpass',
                   'email':'tester@gmail.com'};
   */
  const {username, password, email} = req.body;

  let usernameExists = await dataDAO.runQuery(queries.getUser,[username]);

  if( usernameExists.length === 0 ){
    // UserName not found, proceed.
    // Hash and Salt their password, save them.
    let salt = genSaltSync(10);
    logger(`regtister: ${password}`);
    let hashPass = hashSync(password,salt);
    
    //Insert User, get their ID
    let registeredUser = await dataDAO.runQuery(queries.createUser,[username,hashPass,email,'Recruit']);
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
                  'username': username,
                  'email': email,
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
    let token = uuidv4();
    authTokens.push({'user_id':user.user_id,'token':token});
    user.token = token;
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

  if(un === undefined || un === null || pw === undefined || pw===undefined) {
    // user does not exist
    logger('User name or pw null or undefined...');
    res.sendStatus(403);
  }
  console.log(chalk.cyanBright(process.env.MAXSVAR));
  logger(`/login: username: ${un}`);
  // REMEBER This returns an array. 
  const userQueryResponse = await dataDAO.runQuery(queries.getUser,[un]);
  //dataDAO.runQuery(`SELECT * FROM FlashUsers WHERE username='maxbisesi'`,[un]);
  logger(`/login: response: ${JSON.stringify(userQueryResponse)}`);
  if(userQueryResponse.length === 1) {
    // user returned, check password:
    const user = userQueryResponse[0];
    if(compareSync(pw,user.password)){
      logger(`/login: Passwords match`);
      // Password ok
      // Get their Cards and everything else
      // What do you do if they have no cards ? 
      const cardsResponse = await dataDAO.runQuery(queries.getUsersCards,[user.user_id]);
      const categories = [];
      logger(`CATEGORIES:`);
      logger(`-=-=-=-=-=-=-=-=-=-=-`);
      cardsResponse.forEach( (card) => { 
        if(Object.values(card).includes(undefined)) {
          fail(`undefined value for: ${JSON.stringify(card)}`); 
        }
        // display categories and collections:
        if(categories.includes(card.category)) {
          // check that all cards in category that's in collection
          // have the same category
        } else {
          categories.push(card.category);
          logger(`- ${card.category} - ${card.collection}`);
        }
      });
      logger(`-=-=-=-=-=-=-=-=-=-=-`);
      const avatar = await dataDAO.runQuery(queries.getAvatars,[user.user_id]);
      // these are cardsets with set id, card id.
      // Use existing list of cards for organize sets.
      const setsQueryResult = await dataDAO.runQuery(queries.getCardSetCards,[user.user_id]);
      //logger(`/login: cards: ${cardsResponse.length}, avatar: ${avatar.length}, sets: ${setsQueryResult.length}`);
      // transform the Query Results into something more usefull:
      // the card set response: [{set_id:1,card_id:1}, {set_id:2,card_id:2}, {set_id:3,card_id:3}]
      // CARDSETS = set_id | setname | description
      let cardSetCards = {};
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
        cardSetData[setid] = {'set_id':setid, 'setname':setData[0].setname, 'description':setData[0].description };
      }
      if(Object.keys(cardSetData).length !== Object.keys(cardSetCards).length) { fail(`Card Set data not matching CardSetCard data`); }
      
      const sessions = await dataDAO.runQuery(queries.getUserSessions,[user.user_id]);
      logger(`/login: sessions: ${sessions.length}`);

      // make token
      let token = uuidv4();
      authTokens.push({'user_id':user.user_id,'token':token});
      user.token = token;
      const body = {'loggedInUser':user,'cards':cardsResponse,'avatar':avatar,'sessions':sessions,'cardSetCards':cardSetCards,'cardSetData':cardSetData};
      res.status(200).type('application/json').send(body);
    } else {
      // Send wrong pw messege
      logger('Wrong password...');
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
  // {'setname':'TESTSET', 'cards':testCards, 'description':'THIS WAS CREATED FOR A TEST RUN','user':this.loggedInUser}
  logger('Creating a card set...');
  const user = req.body.user;
  const user_id = user.user_id;
  const cardsInSet = req.body.cardIds;
  const setname = req.body.setname;
  const setDesc = req.body.description;
  const _desc = setDesc.replace(`'`,`\\'`);
  const _setname = setname.replace(`'`,`\\'`);
  if( user === null || user === undefined || cardsInSet === null || cardsInSet === undefined || setname === null || setname === undefined) {
    res.sendStatus(204);
  }
  if(cardsInSet.length === 0 ) { res.sendStatus(204); }
  // Create the CardSet, get it's ID
  //insertCardSet: `INSERT INTO CardSets(setname, description) VALUES(?,?)`,
  const cardsetResult = await dataDAO.runQuery(queries.insertCardSet,[_setname, _desc]);
  if( cardsetResult.affectedRows !== 1) { fail(`Card set not inserted.`); }
  const cardsetId = cardsetResult.insertId;
  logger(`cardset result: ${JSON.stringify(cardsetResult)}`);
  // with that and the user_id, Create the CardSetUser get its ID
  // This table won't have an ID
  //insertCardSetUser: `INSERT INTO CardSetUsers(user_id, set_id) VALUES(?,?)`,
  const csuserResult = await dataDAO.runQuery(queries.insertCardSetUser,[user_id,cardsetId]);
  logger(`cardsetUser result: ${JSON.stringify(csuserResult)}`);
  if(csuserResult.affectedRows !== 1 ){ fail(`/createSet: something went wrong with card set: ${cardsetId}\n inserting csu: ${user_id}`); }
  
  // For Every card create a CardSetCard with the set_id and card_id
  let cscardRes;
  //  insertCardSetCard: `INSERT INTO CardSetCards(card_id, set_id) VALUES(?, ?)`,
  for(let j = 0; j < cardsInSet.length; j++) {
     cscardRes = await dataDAO.runQuery(queries.insertCardSetCard,[cardsInSet[j],cardsetId]);
     if(cscardRes.affectedRows !== 1) {fail(`/createSet: someting went wrong with card set: ${cardsetId}\n inserting card: ${cardsInSet[j].card_id}`);}
  }
  // Send back setID name descirption and array of IDs
  res.status(200).type('application/json').send({'set_id':cardsetId, 'setname':setname, 'description':setDesc, 'cards':cardsInSet});
});

router.post('/deleteCardSet', async(req,res) => {
    const deleteSetId = req.body.setid;
    logger(`delete card set server call setid:${deleteSetId}`);
    if(deleteSetId === null || deleteSetId === undefined) { res.sendStatus(204); }
    const delSetResult = await dataDAO.runQuery(queries.deleteCardSet,[deleteSetId]);
    logger(`delete card set server call setid:${delSetResult}`);
    if(delSetResult.affectedRows === 1) {
      /*const linkingSetCardsTable = await dataDAO.runQuery(queries.getCardSetCardsbySetId,[deleteSetId]);
      const linkingSetUserTable = await dataDAO.runQuery(queries.getCardSetUsersbySetId,[deleteSetId]);
      if(linkingSetCardsTable.affectedRows > 0 || linkingSetUserTable.affectedRows > 0) {
        logger(` ... Card set link tables not modified correctly: set id ${deleteSetId}`);
        res.sendStatus(304);
      } else {
        res.sendStatus(200);
      }*/
      res.sendStatus(200);
    } else {
      logger(` ... CardSet wasn't deleted: set id ${deleteSetId}`);
      res.sendStatus(304);
    }
});

router.post('/deleteCards', async (req,res) => {
  const ids = req.body.cardids;
  logger(`...      Deleting cards: ${ids}`);
  let delTestCard;
  let deletedIDs = [];
  for(let i = 0; i < ids.length; i++) {
    delTestCard = await dataDAO.runQuery(`DELETE FROM FlashCards WHERE card_id = ? LIMIT 1`,[ids[i]]);
    /* logger(chalk.bold.underline(JSON.stringify(delTestCard)));
      {"fieldCount":0,"affectedRows":1,"insertId":0,"serverStatus":2,
      "warningCount":0,"message":"","protocol41":true,"changedRows":0} */
    if(delTestCard.affectedRows === 1) {
      logger(`  ... deleted card_id: ${ids[i]}`);
      deletedIDs.push(ids[i]);
    }
  }
  if( deletedIDs.length === ids.length ) {
    logger(`  ... all submitted card ids were deleted.`);
  } else {
    logger(`  ... only some of the ids were deleted.`);
  }
  res.status(200).send({'deletedIDs':deletedIDs}); 
});

router.post('/renameCategory', async (req,res) => {
  const newCat = req.body.newCat;
  const oldCat = req.body.oldCat;
  const user = req.body.user;
  const oldCategoryCount = await dataDAO.runQuery(queries.getCardsByCategory,[oldCat,user.user_id]);
  logger(`...       Renaming ${oldCat}, with ${oldCategoryCount.affectedRows} cards, to ${newCat}`);
  const renameResult = await dataDAO.runQuery(queries.renameCategory,[newCat,oldCat]);
  const newCategoryCount = await dataDAO.runQuery(queries.getCardsByCategory,[newCat,user.user_id]);
  logger(`...       ${newCategoryCount.affectedRows} card categories renamed.`);
  if( newCategoryCount.affectedRows === oldCategoryCount.affectedRows) {
    logger(`rename result successfull`);
    res.sendStatus(200);
  } else {
    res.sendStatus(500);
  }
});

router.post('/addCategoryToCollection', async (req,res) => {
    const collection = req.body.collection;
    const category = req.body.category;
    const user = req.body.user;
    // These are the cards we want to update
    const cardCategoryCount = await dataDAO.runQuery(queries.getCardsByCategory,[category,user.user_id]);
    if( cardCategoryCount.length === 0 ) {
      logger(`No cards of this category to update`);
      res.send(200);
    }
    logger(`...     adding ${category} to ${collection}`);
    // Update FlashCards Set collection="?" Where category="?"
    const addResult = await dataDAO.runQuery(queries.addCategoryToCollection,[collection,category,user.user_id]);
    logger(` cards of that category query result: ${JSON.stringify(cardCategoryCount)}`);
    logger(` add category to Collection result: ${JSON.stringify(addResult)}`);
    if(cardCategoryCount.length === addResult.affectedRows) { 
      res.status(200).send({'cardsUpdated':addResult.affectedRows});
    } else {
      logger(`Adding category to collection was not updated as expected: old category count:${cardCategoryCount.length} cards added to collection: ${addResult.affectedRows}`);
      res.sendStatus(204);
    }
});

router.post('/removeCategoryFromCollection', async (req,res) => {
  const collection = req.body.collection;
  const category = req.body.category;
  logger(`...     removing ${category} from ${collection}`);
  // Update FlashCards Set collection = DEFAULT Where category="?"
  const result = await dataDAO.runQuery(queries.removeCategoryFromCollection,[category]);
  logger(` remove category from Collection result: ${JSON.stringify(result)}`);
  if(result.affectedRows > 0) { 
    res.sendStatus(200);
  } else {
    res.sendStatus(204);
  }
});

/**
  GET /something?color1=red&color2=blue
  Then in express, the handler:

  app.get('/something', (req, res) => {
      req.query.color1 === 'red'  // true
      req.query.color2 === 'blue' // true
  })
* 
*/

router.post('/getCard', async (req,res) => {
  const params = req.body.cardParams;
  const pw = req.body.password;
  if(pw !== 'monkeymeat') {
    logger(`WRONG PASSWORD: ${pw}`);
    res.sendStatus(401);
  }
  const vals = [];
  const queryParams = [];
  let queryString1 = `SELECT c.card_id, c.card, c.answer, c.category, c.owner_id, c.collection, c.image, fcu.correct, fcu.incorrect
                        FROM FlashCardUsers AS fcu INNER JOIN FlashCards AS c ON c.card_id = fcu.card_id
                        WHERE `;
            
  for(let i =0; i < params.length; i++) {
    logger(`/getCard params -> ${params[i][`Field`]} ${params[i][`Value`]}`);
    switch(params[i][`Field`]) {
      case `card_id`: 
        queryParams.push(`c.card_id ${params[i][`Operator`]} ?`);
        vals.push(params[i][`Value`]);
        break;
      case `card`:         
        queryParams.push(`c.card ${params[i][`Operator`]} ?`);
        vals.push(params[i][`Value`]);
        break;
      case `answer`: 
        queryParams.push(`c.answer ${params[i][`Operator`]} ?`);
        vals.push(params[i][`Value`]);
        break;
      case `category`: 
        queryParams.push(`c.category ${params[i][`Operator`]} ?`);
        vals.push(params[i][`Value`]);
        break;
      case `owner_id`: 
        queryParams.push(`c.owner_id ${params[i][`Operator`]} ?`);
        vals.push(params[i][`Value`]);
        break;
      case `collection`: 
        queryParams.push(`c.collection ${params[i][`Operator`]} ?`);
        vals.push(params[i][`Value`]);
        break;
      case `image`: 
        queryParams.push(`c.image ${params[i][`Operator`]} ?`);
        vals.push(params[i][`Value`]);
        break;
      default: res.status(500).send(`Unknown param: ${params[i][`Field`]} ${params[i][`Operator`]} ${params[i][`Value`]}`);
    }
  }
  queryString1 += queryParams.join(`\nAND `);
  queryString1 += `\nLIMIT 1`;
  logger(`getCard queryString: ${queryString1}`);
  let results = await dataDAO.runQuery(queryString1,[...vals]);
  logger(chalk.bold.underline(JSON.stringify(results)));
  if( results.length > 0) {
    res.status(200).send({'queriedCard':results[0]});
  } else {
    res.sendStatus(204);
  }
  
});

app.use('/', router);

export default app;