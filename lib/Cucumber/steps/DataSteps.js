import {When, Then} from 'cucumber';
import logger from '../../logger';
import Utils from '../../Utils';
import apiManager from '../apiManager';
import { queryData } from '../queryData';
import { loginData } from '../loginData';

When('The user queries for a FlashCard with the following properties:',{ timeout: 60000 }, async function(rawtable) {
    logger('The user queries for a FlashCard with the following properties:');
    const table = rawtable[`rawTable`];
    table.shift();
    let queryList = [];
    for( let i = 0; i < table.length; i++) {
        let field = `${table[i][0]}`;
        let operator = `${table[i][1]}`;
        let val = `${Utils.insertSystemVal(table[i][2])}`;
        queryList.push({ 'Field':field, 'Operator':operator,'Value': val});
    }
    let result = await apiManager.queryForFlashCard(queryList);
    if(result !== true) { throw new Error(`Couldn't query for FlashCard with the following props: ${table}`); }
});

Then('No {string} records were found',{ timeout: 5000 }, async function(object) {
    logger(`No ${object} records were found`);
    switch(object) {
        case 'FlashCard': 
            if(queryData.flashCardId === '') {
                return true;
            } else {
                throw new Error(`A FlashCard record was found...`);
            }
        default: throw new Error(`No ${object} definition for this step..`);
    }
});

Then('The queried for {string} has the following values:',{ timeout: 5000 }, async function(object,rawtable) {
    logger(`The queried for ${object} has the following values:`);
    let vals = Utils.processDatatable(rawtable);
    switch(object) {
        case 'FlashCard': 
            vals.forEach( (value, key) => {
                logger(`datatable[${key}] = ${value} ?`);
                if(`${queryData.flashCard[key]}` === `${value}`) {
                    logger(`Match! queried FlashCard field ${key} = ${value}`);
                } else {    
                    logger(`FAILURE! Queried FlashCard field: ${key} != ${value}`);
                    logger(`queryData.flashCard[${key}]: ${queryData.flashCard[key]}`);
                    throw new Error(`Queried FlashCard field doesn't match provided values.`);
                }
            });
            break;
        default: throw new Error(`No ${object} definition for this step..`);
    }
});

When('The user queries for their Card Count',{ timeout: 40000 }, async function() {
    logger(`The user queries for their Card Count`);
    await apiManager.queryForCardCount(loginData.loginStatus.user_id);
    if(queryData.cardCount === -1) { throw new Error(`Could not query for Card Count, something went wrong.`); }
});

