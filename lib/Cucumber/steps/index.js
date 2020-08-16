import {When, Then} from 'cucumber';
import superagent from 'superagent';

When('The client sends a POST request to /login, without a payload.', async function() {
    /**
        const body = {'loggedInUser':user,'cards':cardsResponse,'avatar':avatar,'sessions':sessions,'cardSets':cardSets};
        res.status(200).type('application/json').send(body);
    */
    this.response= await superagent.post('http://localhost:4242/login');
});

Then('Our API should respond with a 400 HTTP status code', function(callback) {
    if(this.response.statusCode !== 400) {
        throw new Error('Status code not 400');
    }
});