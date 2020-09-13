import {By, until} from 'selenium-webdriver';
import { loginData } from '../loginData';
import logger from '../../logger';
import TemplatePage from './TemplatePage';

export default class TestTab extends TemplatePage {
    pageName = 'TestTab';

    constructor(seleniumWebDriver) {
        super();
        this.driver = seleniumWebDriver;
        logger(`New TestTab page`);
    }

    /*
    | Rating: 29 / 1 | Card Number: 6535 | Questions To Review: 0|
     */
    async validateField(field,value) {
        let el;
        logger(`validate field on ${this.pageName} field: ${field} - value: ${value}`);
        switch(field) {
            case 'Card Set': 
                el = await this.driver.wait(until.elementLocated(By.id('testcardset')), 3000);
                const set = el.getAttribute('innerText');
                logger(`actual: ${set} expected: ${value} |`);
                if(set === value) {
                    return true;
                } else {
                    return false;
                }
            case 'Rating': 
                el = await this.driver.wait(until.elementLocated(By.id('testrating')), 3000);
                const rating = el.getAttribute('innerText');
                logger(`actual: ${rating} expected: ${value} |`);
                if(rating === value) {
                    return true;
                } else {
                    return false;
                }
            case 'Card Number': 
                el = await this.driver.wait(until.elementLocated(By.id('testcardid')), 3000);
                const cardnumber = el.getAttribute('innerText');
                logger(`actual: ${cardnumber} expected: ${value} |`);
                if(cardnumber === value) {
                    return true;
                } else {
                    return false;
                }
            case 'Questions To Review':
                el = await this.driver.wait(until.elementLocated(By.id('questionstoreview')), 3000);
                const qstoreview = el.getAttribute('innerText');
                logger(`actual: ${qstoreview} expected: ${value} |`);
                if(qstoreview === value) {
                    return true;
                } else {
                    return false;
                }
            case 'Points': 
                el = await this.driver.wait(until.elementLocated(By.id('testpoints'), 3000));
                const points = await el.getAttribute('textContent');
                logger(`actual: ${points} expected: ${value} |`);
                if(points === value) {
                    logger(`... points match`);
                    return true;
                }else {
                    logger(`... points don't match`);
                    return false;
                }
            default: throw new Error(`field ${field} not defined on ${this.pagename}`);
        }
    }

    /**
     * 
     *  id="show" 
        id="update"
        id="nailed"
        id="whiffed
        id="previou
        id="comebac
        id="review"
     */
    async clickButton(buttonname) {
        logger(`clicking ${buttonname} on ${this.pageName} ...`);
        switch(buttonname) {
            case 'Show': 
                await this.driver.wait(until.elementLocated(By.id('showbutton'), 3000)).click();
                return true;
            case 'Update': 
                await this.driver.wait(until.elementLocated(By.id('updatebutton'), 3000)).click();
                return true;
            case 'Nailed it': 
                await this.driver.wait(until.elementLocated(By.id('nailedbutton'), 3000)).click();
                return true;
            case 'Missed it': 
                await this.driver.wait(until.elementLocated(By.id('whiffedbutton'), 3000)).click();
                return true;
            case 'Previous':
                await this.driver.wait(until.elementLocated(By.id('previousbutton'), 3000)).click();
                return true;
            case 'Review': 
                await this.driver.wait(until.elementLocated(By.id('reviewbutton'), 3000)).click();
                return true;
            case `Come back to this one!`: 
                // comebackbutton
                await this.driver.wait(until.elementLocated(By.id('comebackbutton'), 3000)).click();
                return true;
            default: throw new Error(`clickButton: ${buttonname} not defined on ${this.pageName} ... `);
        } 
    }

    async fillField(field,value) {
        logger(`filling field: ${field} with value: ${value}`);
        switch(field) {
            case 'Question': break;
            case 'Answer': break;
            case 'Category': break;
            default: throw new Error(`${field} not defined in fillField() on ${this.pageName}`);
        }
	}

}