import {By, until} from 'selenium-webdriver';
import { loginData } from '../loginData';
import logger from '../../logger';
import TemplatePage from './TemplatePage';
import { createCategoryId } from '../../Utils';

export default class HomeTab extends TemplatePage {
    pageName = 'HomeTab';

    constructor(seleniumWebDriver) {
        super();
        this.driver = seleniumWebDriver;
    }

    async validateField(field,value) {
        logger(`validate field on ${this.pageName} field: ${field} - value: ${value}`);
        switch(field) {
            
            default: throw new Error(`field ${field} not defined on ${this.pagename}`);
        }
    }

    async selectCheckBox(checkboxName) { 
        switch(checkboxName) {
            case ``: break;
            default: throw new Error(`checkbox ${checkboxName} not defined on ${this.pagename}`);
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

    async clickButton(buttonname) {
        logger(`clicking ${buttonname} on ${this.pageName} ...`);
        switch(buttonname) {
            case `Delete`: 
                await this.driver.wait(until.elementLocated(By.id('loginbutton'), 3000)).click();
                return true;
            case `Filter`: 
                await this.driver.wait(until.elementLocated(By.id('loginbutton'), 3000)).click();
                return true;
            case `Logout`:
                await this.driver.wait(until.elementLocated(By.id('loginbutton'), 3000)).click();
                return true;
            case `New Collection`: 
                await this.driver.wait(until.elementLocated(By.id('loginbutton'), 3000)).click();
                return true;
            case `Remove Filter`: 
                await this.driver.wait(until.elementLocated(By.id('loginbutton'), 3000)).click();
                return true;
            default: throw new Error(`clickButton: ${buttonname} not defined on ${this.pageName} ... `);
        } 
    }

    async validateCategories(names) {
        // Get the category table
        const table = await this.driver.wait(until.elementLocated(By.className('home-categories-table'), 2000));
        // Get the categories therein
        const categories = await table.findElements(By.className('home-category-boxName'));
        // take cateogry names from webelement then put them in an array for easier comparison.
        const actualCategories = [];
        logger(`Categories shown:`);
        logger(JSON.stringify(categories[0].getAttribute('innerText')));
        // for (let i =0; i < categories.length; i++) {
        //     logger(`    ${categories[i].getAttribute('innerText')}`);
        //     actualCategories.push(categories[i].getAttribute('innerText'));
        // }
        names.forEach( (catname) => {
            if(!actualCategories.includes(catname)) {
                logger(`${catname} not found in categories.`);
                return false;
            }
        });
        return false;
	}

}