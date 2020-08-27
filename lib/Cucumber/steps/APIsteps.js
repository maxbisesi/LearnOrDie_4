import {When, Then, Before, After} from 'cucumber';
import axios from 'axios';
import assert from 'assert';
import DAO from '../../DAO';
import logger from '../../Logger';
import dotenv from 'dotenv';
import webdriver from 'selenium-webdriver';
/**
 *   
 * request.post('/user')
    .set('Content-Type', 'application/json')
    .send('{"name":"tj","pet":"tobi"}')
    .then(callback)
    .catch(errorCallback)
Since JSON is undoubtedly the most common, it's the default! The following example is equivalent to the previous.

  request.post('/user')
    .send({ name: 'tj', pet: 'tobi' })
    .then(callback, errorCallback)
    Or using multiple .send() calls:

  request.post('/user')
    .send({ name: 'tj' })
    .send({ pet: 'tobi' })
    .then(callback, errorCallback)
 */
dotenv.config();
const AXIOSCONFIG = {'baseURL':`http://${process.env.HOST}:${process.env.PORT}`, 'validateStatus': (status) => {return true;}};

Before({tags: '@AdminAPI'},function () {
  this.driver = new webdriver.Builder()
    .forBrowser("chrome")
    .build();
  return this.driver;
});

After({tags: '@AdminAPI'}, async function (scenario) {
  //logger(`After scenario:\n ${JSON.stringify(scenario)}`);
  /** 
   * 
   *  SHOW TABLE STATUS FROM `DatabaseName` WHERE `name` LIKE 'TableName' ;

      SELECT `AUTO_INCREMENT`
      FROM  INFORMATION_SCHEMA.TABLES
      WHERE TABLE_SCHEMA = 'DatabaseName'
      AND   TABLE_NAME   = 'TableName';
   * 
   */
  const db = new DAO().getDatabase();
    
  // Delete test session
  if(this.sessionId !== undefined) {
    const delTestSession = await db.query('DELETE FROM UserSessions WHERE session_id=?',[this.testSessionId]);
    assert.equal(delTestSession.affectedRows,1);
    logger(`Test usersession deleted:\n - ${this.testSessionId} - \n`);
  }

  // Delete test user
  if(this.testUserId !== undefined && this.testUserName !== undefined) {
    const delTestUser = await db.query('DELETE FROM FlashUsers WHERE user_id=?',[this.testUserId]);
    assert.equal(delTestUser.affectedRows,1);
    logger(`Test user deleted: - ${this.testUserId} - ${this.testUserName} -`);
  }

  // Delete Card Set
  if(this.testSetId !== undefined) {
    const deleteSetResult = await axios.post('/deleteCardSet',{'setid':this.testSetId,'user':this.loggedInUser},AXIOSCONFIG);
    assert.equal(deleteSetResult.status,200);
    logger(`Test Card Set deleted: - ${this.testSetId} - `);
  }

  // Delete test cards
  if( this.testCardId !== undefined ) {
   const deleteCardResult = await axios.post('/deleteCards',{'cardids':[this.testCardId],'user':this.loggedInUser},AXIOSCONFIG);
   assert.equal(deleteCardResult.status,200);
   logger(`Test Card (updated) deleted: - ${this.testCardId} - `);
  }

  // Delete card with renamed category
  if( this.renamedCategoryCard !== undefined ) {
    const renamedCategoryDelete = await axios.post('/deleteCards',{'cardids':[this.renamedCategoryCard],'user':this.loggedInUser},AXIOSCONFIG);
    assert.equal(renamedCategoryDelete.status,200);
    logger(`Test Card in renamed category deleted: - ${this.renamedCategoryCard} - `);
  }

  await db.close();
  this.driver.quit();
  logger('TEST DATA CLEANED UP');
});

When('The client logs in as the Admin', async function() {
    /**
        const body = {'loggedInUser':user,'cards':cardsResponse,'avatar':avatar,'sessions':sessions,'cardSets':cardSets};
        res.status(200).type('application/json').send(body);
    */
    console.log(process.env.MAXSVAR);
    const resp = await axios.post('/login',{'user':'maxbisesi','pass':'Basketball12'},AXIOSCONFIG);
    console.log(`Admin login resp: ${JSON.stringify(resp.data.loggedInUser)}`);
    this.loggedInUser = resp.data.loggedInUser;
});

When('The client logs in as a test User', async function() {
  /**
      const body = {'loggedInUser':user,'cards':cardsResponse,'avatar':avatar,'sessions':sessions,'cardSets':cardSets};
      res.status(200).type('application/json').send(body);
  */
 console.log(process.env.MAXSVAR);
  const resp = await axios.post('/login',{'user':'QATester01','pass':'LOD0821!'},AXIOSCONFIG);
  console.log(`test User login resp: ${JSON.stringify(resp.data.loggedInUser)}`);
  this.loggedInUser = resp.data.loggedInUser;
});

When('creates a Card', async function() {
     // Insert a card.
    // Then query for that users cards and ensure they were stored properly
    const user = this.loggedInUser;
    //console.log(JSON.stringify(user));
    const c = {'card':'TESTCARD','answer':'TESTANSWER','category':'TESTCATEGORY'};
    // const dbCard = {'card_id':newCard_id, 'card':card, 'answer':answer, 'category':category, 'owner_id':user_id};
    // Use superagent for HTTP:
    const {status,data} = await axios.post('/insertCard',{'user':user,'card':c},AXIOSCONFIG);
    assert.equal(status,200);
    assert.ok(data.card_id);
    assert.equal(data.card,'TESTCARD');
    assert.equal(data.answer,'TESTANSWER');
    assert.equal(data.owner_id,this.loggedInUser.user_id);
    this.testCardId = data.card_id;
});

When('creates a Card List', async function() {
  // Insert a card.
  // Then query for that users cards and ensure they were stored properly
  const user = this.loggedInUser;
  const noIdCards = [];
  for(let i =0; i<100; i++) {
      noIdCards.push({'card':`CARDLIST-TESTCARD-${i}`,'answer':`CARDLIST-TESTANSWER-${i}`,'category':`TESTCAT-${i}`});
  }
  //Responds with list of ids for the cards, indexs line up with the list passed in.
  const { status,data } = await axios.post('/insertCardList',{'cards':noIdCards,'user':user},AXIOSCONFIG);
  assert.equal(status,200);
  assert.equal(data.cards.length,noIdCards.length);
  const cardListIds = [];
  data.cards.forEach( (c) => { 
    assert.ok(c.card_id); 
    cardListIds.push(c.card_id);
  } );
  this.testCardListIds = cardListIds;
});

When('The client trys to register a user that already exists', async function() {
    const { status } = await axios.post('/register',{'user':'maxbisesi'},AXIOSCONFIG);
    assert.equal(status,400);
    logger('Register new user: 400 status returned for existing username');
});

When('The client registers a new user', async function() {                  
    // Make username unique
    const timestamp = Date.now();
    const uniqueUN = 'tester'+timestamp;

   const { status, data } = await axios.post('/register',{'username':uniqueUN,'password':'testpass','email':'tester@gmail.com'},AXIOSCONFIG);
   //console.log(`${status} \n ${JSON.stringify(data)}`);

    assert.equal(status,200);
    assert.ok(data.user.user_id);
    assert.equal(data.user.username,uniqueUN);
    assert.equal(data.user.email,'tester@gmail.com');
    assert.equal(data.user.points,0);
    assert.equal(data.user.userrank,'Recruit');
    assert.ok(data.user.token);
    logger(`test register a new user: ${data.user.user_id}`);

    // Run it again to ensure you get a 400
    const secondAttempt = await axios.post('/register',{'username':uniqueUN,'password':'testpass','email':'tester@gmail.com'},AXIOSCONFIG);
    assert.equal(secondAttempt.status,400);
    this.testUserId = data.user.user_id;
    this.testUserName = data.user.username;
});

When('saves a Session', async function() {
  const user = this.loggedInUser;
  const session =  { 'correct': 5,
                      'incorrect': 5 ,
                      'cards_added': 5,
                      'points_added': 5,
                      'card_sets_added': 5,
                      'user_id': 1};
  const { status, data } = await axios.post('/saveSession',{'session':session,'user':user},AXIOSCONFIG);
  assert.equal(status,200);
  if(data.sessionId !== undefined) {
    this.sessionId = data.sessionId;
  }
});

When('updates a Card', async function() {
  const user = this.loggedInUser;
  const testCardId = this.testCardId;
  if(testCardId === undefined) {
    throw new Error('No test card to test upating with !');
  }
  const db = new DAO().getDatabase(); // getDatabase
  const testresult = await db.query('SELECT * FROM FlashCards WHERE card_id = ?',[testCardId]);
  assert.equal(testresult.length,1);
  assert.equal(testresult[0].card,'TESTCARD');

  const {data,status} = await axios.post('/updateCard',{'card':{'card_id':testCardId,'card':'UPDATEDTESTCARD','answer':'UPDATETESTANSWER','category':'UPDATETESTCATEGORY'},'user':user},AXIOSCONFIG);
       
  assert.equal(data.card,'UPDATEDTESTCARD');
  assert.equal(data.answer,'UPDATETESTANSWER');
  assert.equal(data.category,'UPDATETESTCATEGORY');
  assert.equal(status,200);
  await db.close();
});

When('creates a Set', async function() {
  const dataDAO = new DAO();
  const testCardIds = [];
  let results = await dataDAO.runQuery('SELECT * FROM FlashCards WHERE owner_id = 1 LIMIT 10');
  for(let i =0; i < 10; i++) {
      testCardIds.push(results[i].card_id);
  }
  const { status, data } = await axios.post('/createSet',{'setname':'TESTSET', 'cardIds':testCardIds, 'description':'THIS WAS CREATED FOR A TEST RUN','user':this.loggedInUser},AXIOSCONFIG);
  assert.equal(status,200);
  assert.ok(data.set_id);
  assert.equal(data.description,'THIS WAS CREATED FOR A TEST RUN');
  assert.equal(data.cards.length,10);
  assert.equal(data.setname,'TESTSET');
  logger(` test Create Card Set: ${data.set_id} `);
  this.testSetId = data.set_id;
});

When('delete Cards', async function() {
  if( this.testCardListIds.length > 0 ) {
    const { status} = await axios.post('/deleteCards',{'cardids':this.testCardListIds,'user':this.loggedInUser},AXIOSCONFIG);
    assert.equal(status,200);
    this.testCardListDeleted = true;
  } else {
    throw new Error('No test CardList Ids to delete.');
  }
});

When('renames a Category', async function() {
  //const newCat = req.body.newCat;
  //const oldCat = req.body.oldCat;
  const user = this.loggedInUser;
  //console.log(JSON.stringify(user));
  const c = {'card':'RENAMETESTCARD','answer':'RENAMETESTANSWER','category':'RENAMETESTCATEGORY'};
  // const dbCard = {'card_id':newCard_id, 'card':card, 'answer':answer, 'category':category, 'owner_id':user_id};
  // Use superagent for HTTP:
  const {status,data} = await axios.post('/insertCard',{'user':user,'card':c},AXIOSCONFIG);
  assert.equal(status,200);
  assert.ok(data.card_id);
  const renameResult = await axios.post('/renameCategory',{'user':user,'newCat':'Birchums war stories','oldCat':'RENAMETESTCATEGORY'},AXIOSCONFIG);
  assert.equal(renameResult.status,200);
  this.renamedCategoryCard = data.card_id;
});

When('adds a Category to a Collection', async function() {
  const user = this.loggedInUser;
  const noIdCards = [];
  for(let i =0; i<10; i++) {
      noIdCards.push({'card':`CATEGORYtoCOLLECTION-TESTCARD-${i}`,'answer':`CATEGORYtoCOLLECTION-TESTANSWER-${i}`,'category':`CATEGORYtoCOLLECTION-TESTCATEGORY`});
  }
  //Responds with list of ids for the cards, indexs line up with the list passed in.
  const insertCardListResult = await axios.post('/insertCardList',{'cards':noIdCards,'user':user},AXIOSCONFIG);
  assert.equal(insertCardListResult.status,200);
  assert.equal(insertCardListResult.data.cards.length,noIdCards.length);
  // Test Data Ready now give to collection
  const addCatToCollResult = await axios.post('/addCategoryToCollection',{'category':'CATEGORYtoCOLLECTION-TESTCATEGORY','collection':'TESTCollection0818','user':user},AXIOSCONFIG);
  assert.equal(addCatToCollResult.status,200);
  assert.equal(addCatToCollResult.data.cardsUpdated,10);
  const cardIdsToDelete = [];
  insertCardListResult.data.cards.forEach( (c) => { cardIdsToDelete.push(c.card_id); });
  const deleteStatus = await axios.post('/deleteCards',{'cardids':cardIdsToDelete, 'user':user},AXIOSCONFIG);
  assert.equal(200,deleteStatus.status);
});

When('removes a Category from a Collection', async function() {

});

When('The Client tries to something strange', async function() {
  throw new Error('DONT DO THAT!');
});

When('I try to login as a user that does not exist', async function(){
    const errorResponse = await axios.post('/login',{'user':'NotFoundo','pass':'nah-nah'},AXIOSCONFIG);
    assert.equal(errorResponse.status,403);
});

When('I try to login as an Admin but use the wrong password', async function() {
    const { status } = await axios.post('/login',{'user':'maxbisesi','pass':'WrongPW23'},AXIOSCONFIG);
    assert.equal(status,401);
});
