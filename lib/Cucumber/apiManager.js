import logger from '../Logger';
import Utils from '../Utils';
import queryData from './queryData';
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
		let results;
		try {
            response = await axios.post('/getCard',{"cardParams":queryList,"password":'monkeymeat'},AXIOSCONFIG);
            results = response.data;
		} catch (e) {
			logger(`    ${e}`);
			logger(`    Query failed`);
			return false;
		}
		if (results[0].card_id === undefined) {
			logger(`    Query yielded no results`);
			return false;
		}
		console.log(results[0]);
		logger(`Found FlashCard with card_id: ${results[0].card_id} and category: ${results[0].category}\n`);
		return true;
    }
}
export default new apiManager();