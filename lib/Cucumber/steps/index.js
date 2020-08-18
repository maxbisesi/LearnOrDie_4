import {When, Then} from 'cucumber';
import axios from 'axios';
import assert from 'assert';
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
When('The client logs in as Admin', async function() {
    /**
        const body = {'loggedInUser':user,'cards':cardsResponse,'avatar':avatar,'sessions':sessions,'cardSets':cardSets};
        res.status(200).type('application/json').send(body);
    */

    const resp = await axios.post('/login',{'user':'maxbisesi','pass':'Basketball12'},{'baseURL':'http://localhost:4242'});
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
    const {status,data} = await axios.post('/insertCard',{'user':user,'card':c},{'baseURL':'http://localhost:4242'});
    assert.equal(status,200);
    assert.ok(data.card_id);
    assert.equal(data.card,'TESTCARD');
    assert.equal(data.answer,'TESTANSWER');
    assert.equal(data.owner_id,this.loggedInUser.user_id);
    this.testCardId = data.card_id;
});

When('creates a Card List', async function() {

});

When('saves a Session', async function() {

});

When('updates a Card', async function() {

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
