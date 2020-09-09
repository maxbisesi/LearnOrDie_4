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
            case `Save to Set`: break;
            case `Edit Card`: break;
            case `Next Page`: break;
            default: throw new Error(`clickButton: ${buttonname} not defined on ${this.pageName} ... `);
        } 
    }

    async fillField(field,value) {
        logger(`filling field: ${field} with value: ${value}`);
        switch(field) {
            
            default: throw new Error(`${field} not defined in fillField() on ${this.pageName}`);
        }
	}

}