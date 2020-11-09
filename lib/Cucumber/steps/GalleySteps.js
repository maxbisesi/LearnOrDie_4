import {When, Then} from 'cucumber';
import logger from '../../logger';
import { loginData } from '../loginData';
import { queryData } from '../queryData';

When('The user selects the following question cards:',{ timeout: 40000 }, async function(rawtable) {
    logger('The user selects the following question cards:');
    let qs = rawtable['rawTable'];
    qs.shift();
    for(let i = 0; i < qs.length; i++) {
        await loginData.currentPage.clickQuestion(qs[i]);
    }
});

When('The user clicks a random question card',{ timeout: 40000 }, async function() {
    logger('The user clicks a random question card');
    await loginData.currentPage.clickRandomQuestion();
});

When('The user clicks the {string} Card Set',{ timeout: 40000 }, async function(cardset) {
    logger(`The user clicks the ${cardset} Card Set`);
    const result = await loginData.currentPage.clickCardSet(cardset,'click');
    if(result !== true) {
        throw new Error(`Fail couldn't find ${cardset}`);
    }
});

When('The user studies the {string} Card Set',{ timeout: 40000 }, async function(cardset) {
    logger(`The user clicks the ${cardset} Card Set`);
    const result = await loginData.currentPage.clickCardSet(cardset,'study');
    if(result !== true) {
        throw new Error(`Fail couldn't find ${cardset}`);
    }
});

When('The user deletes the {string} Card Set',{ timeout: 40000 }, async function(cardset) {
    logger(`The user clicks the ${cardset} Card Set`);
    const result = await loginData.currentPage.clickCardSet(cardset,'delete');
    if(result !== true) {
        throw new Error(`Fail couldn't find ${cardset}`);
    }
});

Then(`There are {string} Questions on Page number {string}`,{ timeout: 40000}, async function(count,pagenumber) {
    if(count === 'queryData:cardCount') { // query data lookup
        count = queryData.cardCount;
    }
    logger(`There are ${count} Questions on Page number ${pagenumber}`);
    switch(pagenumber) {
        case "1":
            const result = await loginData.currentPage.validateCardCount(count);
            if(result !== true) {
                throw new Error(`FAIL number of Cards on page ${pagenumber} not expected.`);
            }
            break;
        default: throw new Error(`FAIL Unknown pagenumber: ${pagenumber}`);
    }
    
});