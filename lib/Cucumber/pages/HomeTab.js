import {By, until} from 'selenium-webdriver';
import { loginData } from '../loginData';
import logger from '../../logger';
import TemplatePage from './TemplatePage';
import Utils from '../../Utils';
import LoginProfile from './LoginProfile';

export default class HomeTab extends TemplatePage {
    pageName = 'HomeTab';

    constructor(seleniumWebDriver) {
        super();
        this.driver = seleniumWebDriver;
        this.categories = new Map();
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
                await this.driver.wait(until.elementLocated(By.id('deletebutton'), 3000)).click();
                return true;
            case `Filter`: 
                await this.driver.wait(until.elementLocated(By.id('filterbutton'), 3000)).click();
                return true;
            case `Logout`:
                await this.driver.wait(until.elementLocated(By.id('logoutbutton'), 3000)).click();
                loginData.currentPage = new LoginProfile(this.driver);
                return true;
            case `New Collection`: 
                await this.driver.wait(until.elementLocated(By.id('newcollectionbutton'), 3000)).click();
                // Wait for the alert to be displayed
                await this.driver.wait(until.alertIsPresent());
                // Store the alert in a variable
                let alert = await this.driver.switchTo().alert();
                //Type your message
                let str = `${Date.now()}`;
                str = str.substring(6, 9);   
                await alert.sendKeys(`SeleniumCollection${str}`);
                //Press the OK button
                await alert.accept();
                return true;
            case `Remove Filter`: 
                await this.driver.wait(until.elementLocated(By.id('removefilterbutton'), 3000)).click();
                return true;
            default: throw new Error(`clickButton: ${buttonname} not defined on ${this.pageName} ... `);
        } 
    }

    async validateCategories(categoryTable) {
        for (const [category, count] of categoryTable) {
            if(!this.categories.has(category)) {
                logger(`    Fail: ${category} not found.`);
                return false;
            }
            logger(`    Found ${category} - ${this.categories.get(category).count}`);
            if(this.categories.get(category).count === count) {
                logger(`    Pass: Actual ${this.categories.get(category).count} =  Expected ${count}`);
                return true;
            } else {
                logger(`    Failed: Actual ${this.categories.get(category).count} !=  Expected ${count}`);
                return false;
            }
        }
        logger(`    Table empty: ${JSON.stringify(categoryTable)}`);
        return false;
    }
    
    async getCategories() {
        logger(`    Get Categories...`);
        // Get the category table
        const table = await this.driver.wait(until.elementLocated(By.className('home-categories-table'), 2000));
        // Get the categories therein
        const categories = await table.findElements(By.className('home-category'));
        
        let childs;
        let catname;
        let count;
        let checkBox;
        
        for(let c = 0; c < categories.length; c++) {
            childs = await categories[c].findElements(By.css('td'));
            catname = await childs[0].getAttribute('textContent');
            count = await childs[1].getAttribute('textContent');
            checkBox = await childs[2].findElement(By.css('input'));
            this.categories.set(catname,{'count':count,'checkBox':checkBox});
            logger(`${catname} - ${count}`);
        }
    }

}