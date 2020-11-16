import {By, until} from 'selenium-webdriver';
import { loginData } from '../loginData';
import logger from '../../logger';
import TemplatePage from './TemplatePage';
import Validate from '../Validate';

export default class ChumTab extends TemplatePage {
    pageName = 'ChumTab';

    constructor(seleniumWebDriver) {
        super();
        this.driver = seleniumWebDriver;
        logger(`New ChumTab page`);
    }

    async validateField(field,value) {
        logger(`validatField on: ${this.pageName}. field: ${field}  value: ${value}`);
        switch(field) {
            case `Card`: 
                const valcard = await this.driver.wait(until.elementLocated(By.id('chumcard'), 3000));
                return await Validate(valcard,value);
            case `Answer`: 
                const valanswer = await this.driver.wait(until.elementLocated(By.id('chumanswer'), 3000));
                return await Validate(valanswer,value);
            case `Category`:
                const valcat = await this.driver.wait(until.elementLocated(By.id('chumcategory'), 3000));
                return await Validate(valcat,value,'value');
            case `Math Module`: 
                const mathmod = await this.driver.wait(until.elementLocated(By.id('mathmodule'), 3000));
                return true;
            default: throw new Error(`${field} not defined in fillField() on ${this.pageName}`);
        }
    }

    async clickButton(buttonname) {
        logger(`clicking ${buttonname} on ${this.pageName} ...`);
        switch(buttonname) {
            case `Submit`:                 
                const chumsubmit = await this.driver.wait(until.elementLocated(By.id('chumsubmit'), 3000));
                await chumsubmit.click();
                return true;
            default: throw new Error(`clickButton: ${buttonname} not defined on ${this.pageName} ... `);
        } 
    }

    async fillField(field,value) {
        logger(`filling field: ${field} with value: ${value}`);
        switch(field) {
            case `Card`: 
                const card = await this.driver.wait(until.elementLocated(By.id('chumcard'), 3000));
                await card.sendKeys(value);
                return true;
            case `Answer`: 
                const answer = await this.driver.wait(until.elementLocated(By.id('chumanswer'), 3000));
                await answer.sendKeys(value);
                return true;
            case `Category`:
                const cat = await this.driver.wait(until.elementLocated(By.id('chumcategory'), 3000));
                await cat.sendKeys(value);
                return true;
            default: throw new Error(`${field} not defined in fillField() on ${this.pageName}`);
        }
	}

}