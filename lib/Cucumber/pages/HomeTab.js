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
        this.collections = new Map();
        logger(`New HomeTab page`);
    }

    async expandCollection(collection) {
        const colid = Utils.createCategoryId(collection);
        logger(`find collection by id: ${colid}`);
        const row = await this.driver.wait(until.elementLocated(By.id(colid), 2000));
        // Expand category
        const arrow = await row.findElement(By.className('home-collection-expand'));
        if (await arrow.getAttribute('innerText') === '>') {
            await arrow.click();
            return true;
        } else {
            // do nothing
            return true;
        }
    }

    async removeCategory(collection,category) {
        const colid = Utils.createCategoryId(collection);
        const catid = Utils.createCategoryId(category);
        const rowid = `${colid}-${catid}`;
        logger(`Removing Category with rowid: ${rowid}`);
        const table = await this.driver.wait(until.elementLocated(By.className('home-categories-table'), 2000));
        let row = await table.findElement(By.css(`tr[id=${rowid}][class="home-collection-category"]`));
        await row.findElement(By.className(`home-collection-removecategory`)).click();
        return true;
    }

    async validateField(field,value) {
        logger(`validate field on ${this.pageName} field: ${field} - value: ${value}`);
        switch(field) {
            case `Collections`: 
                await this.getCollections();
                if(this.collections.has(value)) {
                    return true;
                } else {
                    return false;
                }
            default: throw new Error(`field ${field} not defined on ${this.pagename}`);
        }
    }

    async selectCheckBox(checkboxName) { 
        // Get the category table
        const checkbox = await this.driver.wait(until.elementLocated(By.xpath(`//input[@name="${checkboxName}"]`), 2000));
        logger(` found checkbox for ${checkboxName}`);
        await checkbox.click();
        return true;
    }

    async activateModule(mod) {
        switch(mod) {
            case 'Math': return await this.selectCheckBox('Math Module');
            case 'Chat': return await this.selectCheckBox('Chat Module');
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
            case `Remove Filter`: 
                await this.driver.wait(until.elementLocated(By.id('removefilterbutton'), 3000)).click();
                return true;
            default: throw new Error(`clickButton: ${buttonname} not defined on ${this.pageName} ... `);
        } 
    }

    async validateCategories(categoryTable) {
        for (const [category, count] of categoryTable) {
            logger(` Validate category: ${category} with count: ${count}`);
            if(!this.categories.has(category)) {
                if( count == 0 ) {
                    logger(`    Pass: ${category} not found in Category table.`);
                    return true;
                }
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

    async selectRandomCategoryCheckbox() {
        const table = await this.driver.wait(until.elementLocated(By.className('home-categories-table'), 2000));
        // Get the categories therein
        const categories = await table.findElements(By.className('home-category'));
        const tableLength = categories.length;
        logger(`Selecting random category out of ${tableLength} categories.`);
        const randcat = Math.floor(Math.random()*tableLength);
        const row = await categories[randcat].findElement(By.className('home-category-boxName'));
        const randcatname = await row.getAttribute('textContent');
        Utils.randomData.randomCategory = randcatname;
        const checkBox = await categories[randcat].findElement(By.css('input'));
        logger(`    ... clicking ${randcatname} checkbox.`);
        await checkBox.click();
        return true;
    }

    async validateCategoriesInCollection(col,cats) {
        const colid = Utils.createCategoryId(col);
        logger(`find collection by id: ${colid}`);
        const row = await this.driver.wait(until.elementLocated(By.id(colid), 2000));
        // Expand category
        await row.findElement(By.className('home-collection-expand')).click();
        // Get categories in collection
        const table = await this.driver.wait(until.elementLocated(By.className('home-categories-table'), 2000));
        let rows = await table.findElements(By.css(`tr[id*=${colid}][class="home-collection-category"]`));
        let collectionCats = [];

        logger(`Actual rows in ${col}`);
        if (rows.length >= 1) { 
            for(let r = 0; r<rows.length; r++) {
                let catname = await rows[r].findElement(By.className('home-collection-category-name')).getAttribute('textContent');
                collectionCats.push(`${catname.trim()}`);
                logger(`    found ${catname.trim()} in ${col}`);
            }
        } else { 
            logger(`    NO ROWS IN COLLECTION: ${col}`);
            return false;
        }

        let pass = false;
        for(let i = 0; i < cats.length; i++) {
            pass = false;
            logger(`'${cats[i]}' in '${col}' ?`);
            for( let cc = 0; cc < collectionCats.length; cc++){
                // logger(`    '${cats[i]}' ?= '${collectionCats[cc]}'`);
                if(collectionCats[cc] === `${cats[i]}`) {
                    logger(`    found '${cats[i]}' in '${collectionCats[cc]}'`);
                    pass = true;
                    break;
                } 
            }
            if(pass === false) {
                logger(`    '${cats[i]}' not found in '${col}'.`);
                return false;
            }
        }
        return true;
    }
    
    async getCategories() {
        logger(`Get Categories...`);
        if(this.categories.size > 0) {
            this.categories.clear();
        }
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
            logger(`    ...${catname} - ${count}`);
        }
    }

    async getCollections() {
        logger(`Get Collections...`);
        const table = await this.driver.wait(until.elementLocated(By.className('home-categories-table'), 2000));
        const collections = await table.findElements(By.className('home-collection'));

        let arrow;
        let colName;
        let checkbox;   
        let collectionid;

        // Get Collections
        for( let x = 0; x < collections.length; x++) {
            arrow = await collections[x].findElement(By.className('home-collection-expand')); 
            colName = await collections[x].findElement(By.className('home-collection-name')).getAttribute('innerText');
            checkbox = await collections[x].findElement(By.css('input'));
            collectionid = await collections[x].getAttribute('id');
            this.collections.set(colName,{'id':collectionid,'arrow':arrow,'checkbox':checkbox,'categories':[]});
            logger(`${colName}`);
        }

        // Get Categories in these Collections
        for(let [coll,vals] of this.collections) { 
            logger(`Getting Categories in ${coll}`);
            await vals['arrow'].click();
            let rows = await table.findElements(By.css(`tr[id*=${vals.id}][class="home-collection-category"]`));
            rows.forEach( (tr) => { vals['categories'].push( tr.findElement( By.css('td') )  ); });
            await vals['arrow'].click();
        }

        for(let [coll,vals] of this.collections) {
            logger(`Categories in ${coll}:`);
            logger(JSON.stringify(vals.categories));
        }
    }

}