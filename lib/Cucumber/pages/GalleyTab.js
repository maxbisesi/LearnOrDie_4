import {By, until} from 'selenium-webdriver';
import { loginData } from '../loginData';
import logger from '../../logger';
import TemplatePage from './TemplatePage';

export default class GalleyTab extends TemplatePage {
    pageName = 'GalleyTab';

    constructor(seleniumWebDriver) {
        super();
        this.driver = seleniumWebDriver;
        logger(`New GalleyTab page`);
    }

    async validateField(field,value) {
        logger(`validate field on ${this.pageName} field: ${field} - value: ${value}`);
        switch(field) {
            case `Add some cards to a collection`: return await this.driver.wait(until.elementLocated(By.id('addsomecardstocollection')), 10000);
            default: throw new Error(`field ${field} not defined on ${this.pagename}`);
        }
    }

    async clickButton(buttonname) {
        logger(`clicking ${buttonname} on ${this.pageName} ...`);
        switch(buttonname) {
            case `Previous Page`: break;
            case `Delete Card`: break;
            case `Save to Set`: 
                await this.driver.wait(until.elementLocated(By.id('savetoset'))).click();
                return true;
            case `Edit Card`: break;
            case `Next Page`: break;
            case `Save`: 
                await this.driver.wait(until.elementLocated(By.id('cardsetmodalsavebutton'))).click();
                return true;
            default: throw new Error(`clickButton: ${buttonname} not defined on ${this.pageName} ... `);
        } 
    }

    async clickQuestion(question) {
        logger(`clicking ${question} on ${this.pageName} ...`);
        const q = await this.driver.wait(until.elementLocated(By.xpath(`//li[contains(.,"${question}")]`)), 10000);
        await q.click();
    }

    async fillField(field,value) {
        logger(`filling field: ${field} with value: ${value}`);
        switch(field) {
            case `Card Set Name`: 
                const csi = await this.driver.wait(until.elementLocated(By.id('cardsetnameinput')));
                await csi.sendKeys(value);
                return true;
            case `Description`: 
                const desc = await this.driver.wait(until.elementLocated(By.id('cardsetdescriptiontextarea')));
                await desc.sendKeys(value);
                return true;
            default: throw new Error(`${field} not defined in fillField() on ${this.pageName}`);
        }
	}

}