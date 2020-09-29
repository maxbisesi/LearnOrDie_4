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
        logger(`validate field on ${this.pageName} field: ${field}  value: ${value}`);
        switch(field) {
            case 'Card Set': 
                el = await this.driver.wait(until.elementLocated(By.id('testcardset')), 3000);
                const set = await el.getAttribute('innerText');
                logger(`actual: ${set} expected: ${value} `);
                if(`${set}` == value) {
                    logger(`... Card Sets match`);
                    return true;
                } else {
                    logger(`... Card Sets match`);
                    return false;
                }
            case 'Rating': 
                el = await this.driver.wait(until.elementLocated(By.id('testrating')), 3000);
                const rating = await el.getAttribute('innerText');
                logger(`actual: ${rating} expected: ${value} `);
                if(`${rating}` == value) {
                    logger(`... Ratings match`);
                    return true;
                } else {
                    logger(`... Ratings match`);
                    return false;
                }
            case 'Card Number': 
                el = await this.driver.wait(until.elementLocated(By.id('testcardid')), 3000);
                const cardnumber = await el.getAttribute('innerText');
                logger(`actual: ${cardnumber} expected: ${value} `);
                if(`${cardnumber}` == value) {
                    logger(`... Card Numbers match`);
                    return true;
                } else {
                    logger(`... Card Numbers match`);
                    return false;
                }
            case 'Questions To Review':
                el = await this.driver.wait(until.elementLocated(By.id('questionstoreview')), 3000);
                const qstoreview = await el.getAttribute('innerText');
                logger(`actual: ${qstoreview} expected: ${value} `);
                if(`${qstoreview}` == value) {
                    logger(`... questions to review match`);
                    return true;
                } else {
                    logger(`... questions to review match`);
                    return false;
                }
            case 'Points': 
                el = await this.driver.wait(until.elementLocated(By.id('testpoints'), 3000));
                const points = await el.getAttribute('textContent');
                logger(`actual: ${points} expected: ${value} `);
                if(`${points}` == value) {
                    logger(`... points match`);
                    return true;
                }else {
                    logger(`... points don't match`);
                    return false;
                }
            case 'Question':                 
                el = await this.driver.wait(until.elementLocated(By.id('localCard'), 3000));
                const q = await el.getAttribute('textContent');
                logger(`actual: ${q} expected: ${value} `);
                if(`${q}` == value) {
                    logger(`... Question match`);
                    return true;
                }else {
                    logger(`... Question don't match`);
                    return false;
                }
            case 'Answer': 
                el = await this.driver.wait(until.elementLocated(By.id('localAnswer'), 3000));
                const a = await el.getAttribute('textContent');
                logger(`actual: ${a} expected: ${value} `);
                if(`${a}` == value) {
                    logger(`... Answers match`);
                    return true;
                }else {
                    logger(`... Answers don't match`);
                    return false;
                }
            case 'Category': 
                el = await this.driver.wait(until.elementLocated(By.id('localCategory'), 3000));
                const cat = await el.getAttribute('defaultValue');
                logger(`actual: ${cat} expected: ${value} `);
                if(`${cat}` == value) {
                    logger(`... Categories match`);
                    return true;
                }else {
                    logger(`... Categories don't match`);
                    return false;
                }
            default: throw new Error(`field ${field} not defined on ${this.pagename}`);
        }
    }

    async clickButton(buttonname) {
        let el;
        let cardnumber_After;
        let cardnumber_Before;
        logger(`clicking ${buttonname} on ${this.pageName} ...`);
        switch(buttonname) {
            case 'Show': 
                await this.driver.wait(until.elementLocated(By.id('showbutton'), 3000)).click();
                return true;
            case 'Update': 
                await this.driver.wait(until.elementLocated(By.id('updatebutton'), 3000)).click();
                return true;
            case 'Nailed it': 
                el = await this.driver.wait(until.elementLocated(By.id('testcardid')), 3000);
                cardnumber_Before = await el.getAttribute('innerText');
                logger(`Card Number before Clicking ${buttonname} = ${cardnumber_Before}`);
                await this.driver.wait(until.elementLocated(By.id('nailedbutton'), 3000)).click();
                el = await this.driver.wait(until.elementLocated(By.id('testcardid')), 3000);
                cardnumber_After = await el.getAttribute('innerText');
                logger(`Card Number after Clicking ${buttonname} = ${cardnumber_After}`);
                if(`${cardnumber_Before}` !== `${cardnumber_After}`) {
                    logger('Card number changed, continue');
                    return true;
                } else {
                    logger('Card number did not change, fail');
                    return false;
                }
            case 'Missed it': 
                el = await this.driver.wait(until.elementLocated(By.id('testcardid')), 3000);
                cardnumber_Before = await el.getAttribute('innerText');
                logger(`Card Number before Clicking ${buttonname} = ${cardnumber_Before}`);
                await this.driver.wait(until.elementLocated(By.id('whiffedbutton'), 3000)).click();
                el = await this.driver.wait(until.elementLocated(By.id('testcardid')), 3000);
                cardnumber_After = await el.getAttribute('innerText');
                logger(`Card Number after Clicking ${buttonname} = ${cardnumber_After}`);
                if(`${cardnumber_Before}` !== `${cardnumber_After}`) {
                    logger('Card number changed, continue');
                    return true;
                } else {
                    logger('Card number did not change, fail');
                    return false;
                }
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
            case 'Question': 
                let q = await this.driver.wait(until.elementLocated(By.id('localCard'), 3000));
                await q.sendKeys(value);
                return true;
            case 'Answer': 
                let ans = await this.driver.wait(until.elementLocated(By.id('localAnswer'), 3000));
                await ans.sendKeys(value);
                return true;
            case 'Category': break;
            default: throw new Error(`${field} not defined in fillField() on ${this.pageName}`);
        }
	}

}