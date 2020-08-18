import {When, Then} from 'cucumber';
import axios from 'axios';
import assert from 'assert';
import DAO from '../../DAO';

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

const AXIOSCONFIG = {'baseURL':'http://localhost:4242'};

When('The client logs in as Admin', async function() {
    /**
        const body = {'loggedInUser':user,'cards':cardsResponse,'avatar':avatar,'sessions':sessions,'cardSets':cardSets};
        res.status(200).type('application/json').send(body);
    */

    const resp = await axios.post('/login',{'user':'maxbisesi','pass':'Basketball12'},AXIOSCONFIG);
    console.log(`Admin login resp: ${JSON.stringify(resp.data.loggedInUser)}`);
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
  data.cards.forEach( (c) => { assert.ok(c.card_id); } );
});

When('saves a Session', async function() {
  console.log(`Save a session, can see test card id: ${this.testCardId}`);
  const user = this.loggedInUser;
  const session =  { 'correct': 5,
                      'incorrect': 5 ,
                      'cards_added': 5,
                      'points_added': 5,
                      'card_sets_added': 5,
                      'user_id': 1};
  const { data,status } = await axios.post('/saveSession',{'session':session,'user':user},AXIOSCONFIG);
  assert.equal(status,200);
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

});

When('deletes a Card', async function() {

});

When('renames a Category', async function() {

});

When('adds a Category to a Collection', async function() {

});

When('removes a Category from a Collection', async function() {

});
