import logger from '../Logger';
import Utils from '../Utils';
import { queryData } from './queryData';
import axios from 'axios';
import dotenv from 'dotenv';

class apiManager {

    async loginAsAdmin() {

    }
    
    /**
        >	Greater than operator
        >=	Greater than or equal operator
        <	Less than operator
        <>, !=	Not equal operator
        <=	Less than or equal operator
        <=>	NULL-safe equal to operator
        =	Equal operator
        BETWEEN ... AND ...	Whether a value is within a range of values
        COALESCE()	Return the first non-NULL argument
        GREATEST()	Return the largest argument
        IN()	Whether a value is within a set of values
        INTERVAL()	Return the index of the argument that is less than the first argument
        IS	Test a value against a boolean
        IS NOT	Test a value against a boolean
        IS NOT NULL	NOT NULL value test
        IS NULL	NULL value test
        ISNULL()	Test whether the argument is NULL
        LEAST()	Return the smallest argument
        LIKE	Simple pattern matching
        NOT BETWEEN ... AND ...	Whether a value is not within a range of values
        NOT IN()	Whether a value is not within a set of values
        NOT LIKE	Negation of simple pattern matching
        STRCMP()	Compare two strings
     */

    async queryForFlashCard(queryList) {
        logger(`Querying for FlashCard...`);
        dotenv.config();
        const AXIOSCONFIG = {'baseURL':`http://${process.env.HOST}:${process.env.PORT}`, 'validateStatus': (status) => {return true;}};
		let response;
		let card;
		try {
            response = await axios.post('/getCard',{"cardParams":queryList,"password":'monkeymeat'},AXIOSCONFIG);
            card = response.data.queriedCard;
		} catch (e) {
			logger(`    ${e}`);
			logger(`    Query failed`);
			return false;
		}
		if (response.status === 204 && card === undefined) {
			logger(`    Query yielded no results`);
            return true;
		}
        //console.log(`apiManager card -> ${JSON.stringify(card)}`);
        queryData.flashCard.card_id = card.card_id;
        queryData.flashCard.card = card.card;
        queryData.flashCard.answer= card.answer;
        queryData.flashCard.category= card.category;
        queryData.flashCard.owner_id= card.owner_id;
        queryData.flashCard.collection = card.collection;
        queryData.flashCard.image = card.image;
		logger(`Found FlashCard with card_id: ${card.card_id} and category: ${card.category}\n`);
		return true;
    }

    async queryForCardCount(user_id) {
        logger(`Querying for Card Count...`);
        dotenv.config();
        const AXIOSCONFIG = {'baseURL':`http://${process.env.HOST}:${process.env.PORT}`, 'validateStatus': (status) => {return true;}};
		let response;
        let count;
		try {
            response = await axios.post('/getCardCount',{"user_id":user_id, "password":'monkeymeat'},AXIOSCONFIG);
            count = response.data.cardCount;
		} catch (e) {
			logger(`    ${e}`);
			logger(`    Query failed`);
			return false;
        }
		if (response.status === 204 && count === undefined) {
			logger(`    Query yielded no results`);
            return true;
		}
        queryData.cardCount = count;
		logger(`User with id: ${user_id} has a card count of: ${count}`);
		return true;
    }
}
export default new apiManager();