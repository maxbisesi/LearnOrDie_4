import {When, Then, Before, After} from 'cucumber';
import axios from 'axios';
import assert from 'assert';
import DAO from '../../DAO';
import logger from '../../Logger';

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

const AXIOSCONFIG = {'baseURL':'http://localhost:4242', 'validateStatus': (status) => {return true;}};

Before({tags: '@AdminAPI'},function () {
  logger('Before scenario');
});

After({tags: '@AdminAPI'}, async function (scenario) {
  logger(`After scenario:\n ${JSON.stringify(scenario)}`);

  const db = new DAO().getDatabase();
    
  // Delete test session
  if(this.sessionId !== undefined) {
    const delTestSession = await db.query('DELETE FROM UserSessions WHERE session_id=?',[this.testSessionId]);
    assert.equal(delTestSession.affectedRows,1);
    logger(`Test user deleted:\n - ${JSON.stringify(delTestSession)} - \n`);

    // RESET Session AUTO IDs after tests
    const getSessionrMaxID = await db.query('SELECT MAX(session_id) as maxid FROM UserSessions');
    logger(`max session_id after deletes: ${getSessionrMaxID[0].maxid}`);
    const nextSessionID = getSessionrMaxID[0].maxid;
    const resetSessionAuto = await db.query(`ALTER TABLE FlashCards AUTO_INCREMENT = ?`,[nextSessionID]);
    logger(resetSessionAuto);
  }

  // Delete test user
  if(this.testUserId !== undefined && this.testUserName !== undefined) {
    const delTestUser = await db.query('DELETE FROM FlashUsers WHERE user_id=?',[this.testUserId]);
    assert.equal(delTestUser.affectedRows,1);
    logger(`Test user deleted: - ${this.testUserId} - `);

    // RESET User AUTO IDs after tests
    const getUserMaxID = await db.query('SELECT MAX(user_id) as maxid FROM FlashUsers');
    logger(`max user_id after deletes: ${getUserMaxID[0].maxid}`);
    const nextUserID = getUserMaxID[0].maxid;
    const resetUserAuto = await db.query(`ALTER TABLE FlashUsers AUTO_INCREMENT = ?`,[nextUserID]);
    logger(`reset user ids result: ${resetUserAuto}`);
  }

  // Delete Card Set
  if(this.testSetId !== undefined) {
    /*const { status } = await axios.post('/deleteCardSet',{'setid':this.testSetId},AXIOSCONFIG);
    assert.equal(status,200);

    // RESET CardSet Ids
    const getCardSetMaxId = await db.query('SELECT MAX(set_id) as maxsetid FROM CardSets');
    logger(`max set_id after deletes: ${getCardSetMaxId[0].maxsetid}`);
    const nextCardSetId = getCardSetMaxId[0].maxid;
    const resetCardSetAuto = await db.query(`ALTER TABLE CardSets AUTO_INCREMENT = ?`,[nextCardSetId]);
    logger(resetCardSetAuto);*/
  }

  if(this.testCardId !== undefined && this.testCardListIds !== undefined && this.testCardListIds.length > 0) {
      // RESET Card AUTO IDs after tests
      const getCardMaxID = await db.query('SELECT MAX(card_id) as maxid FROM FlashCards');
      logger(`max card_id after deletes: ${getCardMaxID[0].maxid}`);
      const nextAutoID = getCardMaxID[0].maxid;
      const resetCardAuto = await db.query(`ALTER TABLE FlashCards AUTO_INCREMENT = ?`,[nextAutoID]);
      logger(`reset Card ids result: ${resetCardAuto.affectedRows}`);
      // SELECT AUTO_INCREMENT FROM information_schema.TABLES WHERE TABLE_SCHEMA = 'FlashCardShark' AND TABLE_NAME='FlashCards';
  }

  await db.close();
  logger('TEST DATA CLEANED UP');
});

When('The client logs in as the Admin', async function() {
    /**
        const body = {'loggedInUser':user,'cards':cardsResponse,'avatar':avatar,'sessions':sessions,'cardSets':cardSets};
        res.status(200).type('application/json').send(body);
    */
    const resp = await axios.post('/login',{'user':'maxbisesi','pass':'Basketball12'},AXIOSCONFIG);
    // console.log(`Admin login resp: ${JSON.stringify(resp.data.loggedInUser)}`);
    this.loggedInUser = resp.data.loggedInUser;
});

When('The client logs in as a test User', async function() {
  /**
      const body = {'loggedInUser':user,'cards':cardsResponse,'avatar':avatar,'sessions':sessions,'cardSets':cardSets};
      res.status(200).type('application/json').send(body);
  */
  const resp = await axios.post('/login',{'user':'maxbisesi','pass':'Basketball12'},AXIOSCONFIG);

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
  const testUser = {'password':'testpass',
                   'email':'tester@gmail.com'};
                  
    // Make username unique
    const timestamp = Date.now();
    const uniqueUN = 'tester'+timestamp;
    testUser.username = uniqueUN;

   const { status, data } = await axios.post('/register',{'user':testUser},AXIOSCONFIG);
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
    const secondAttempt = await axios.post('/register',{'user':testUser},AXIOSCONFIG);
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
  //logger(` ==> ${JSON.stringify(results)} -- `);
  for(let i =0; i < 10; i++) {
      testCardIds.push(results[i].card_id);
  }
  // {'set_id':cardsetId, 'setname':setname, 'description':setDesc, 'cards':cardsInSet}
  /**  
       const user = req.body.user;
      const user_id = user.user_id;
      const cardsInSet = req.body.cards;
      const setname = req.body.setname;
      const setDesc = req.body.description;
   * 
   */
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
