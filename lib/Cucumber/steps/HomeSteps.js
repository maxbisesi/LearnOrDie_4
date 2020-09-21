import {When, Then, Before, After} from 'cucumber';
import dotenv from 'dotenv';
import webdriver,{By, until, WebElement} from 'selenium-webdriver';
import assert from 'assert';
import logger from '../../logger';
import Utils from '../../Utils';
import { loginData } from '../loginData';


When('The user creates a new Collection named: {string}',{timeout: 6000}, async function(name) {
    logger(`The user creates a new Collection named: ${name}`);
    await this.driver.wait(until.elementLocated(By.id('newcollectionbutton'), 3000)).click();
    // Wait for the alert to be displayed
    await this.driver.wait(until.alertIsPresent());
    // Store the alert in a variable
    let alert = await this.driver.switchTo().alert();
    //Type your message
    if(name === 'random') {
        let str = `${Date.now()}`;
        str = str.substring(6, 9);   
        name = `SeleniumCollection${str}`;
    }
    await alert.sendKeys(name);
    await alert.accept();
    await this.driver.sleep(2000);
});

When('The user drags the {string} Category into the {string} Collection', {timeout:40000}, async function(cat,col) {
    logger(`And The user drags the ${cat} Category into the ${col} Collection`);
    await this.driver.manage().window().maximize();
    if(cat === 'randomcategory') {
        cat = Utils.randomData.randomCategory;
        logger(`random cat: ${cat}`);
    }
    let catid = Utils.createCategoryId(cat);
    let colid = Utils.createCategoryId(col);

    logger(`Drag ${catid} to ${colid}`);

    let category = await this.driver.wait(until.elementLocated(By.id(Utils.createCategoryId(cat))));
    let collection = await this.driver.wait(until.elementLocated(By.id(Utils.createCategoryId(col))));
    
    if(category instanceof WebElement) {
        logger(`category WebElement found.`);
    }
    if(collection instanceof WebElement) {
        logger(`collection WebElement found.`);
    }

    logger(`WebElemnets found:`);
    logger(`    category: text:   ${await category.getText()}`);
    logger(`   collection: text:   ${await collection.getText()}`);


    const actions = this.driver.actions({async: true});
    await actions
            .move({duration: 1000, origin: category})
            .press()
            .move({duration: 2000, origin: collection})
            .release();
        actions.perform();

    logger(`...    drag and drop done.`);
    await this.driver.sleep(20000);
});

When(`The user selects the following Categories' checkboxes:`,{timeout:10000}, async function(rawtable) {
    logger(`The user selects the following Categories' checkboxes`);
    let cats = rawtable['rawTable'];
    let result;
    cats.forEach( (c) => { logger(`  -${c}`); });
    cats.shift();
    for(let i = 0; i < cats.length; i++) {
        logger(`    checking = ${cats[i]}`);
        result = await loginData.currentPage.selectCheckBox(cats[i]);
        if(result !== true) { throw new Error(`Couldn't select checkbox for: ${cats[i]}`); }
    }
});

When(`The user selects the following Collections' checkboxes:`,{timeout:10000}, async function(rawtable) {
    logger(`The user selects the following Collections' checkboxes:`);
    let cols = rawtable['rawTable'];
    let result;
    cols.forEach( (c) => { logger(`  -${c}`); });
    cols.shift();
    for(let i = 0; i < cols.length; i++) {
        logger(`    checking = ${cols[i]}`);
        result = await loginData.currentPage.selectCheckBox(cols[i]);
        if(result !== true) { throw new Error(`Couldn't select checkbox for: ${cols[i]}`); }
    }
});

When(`The user removes the {string} Category from the {string} Collection`, {timeout:7000}, async function(cat,col) {
    logger(`The user removes the ${cat} Category from the ${col} Collection`);
    await loginData.currentPage.expandCollection(col);
    await loginData.currentPage.removeCategory(col,cat);
});

Then('The {string} Collection has the following Categories:', {timeout:30000}, async function(collection, rawtable) {
    logger(`The ${collection} Collection has the following Categories:`);
    let cats = rawtable['rawTable'];
    cats.forEach( (c) => { logger(`  -${c}`); });
    cats.shift();
    let result = await loginData.currentPage.validateCategoriesInCollection(collection,cats);
    if (result !== true) { throw new Error(`The Categories in ${collection} did not match: ${cats}`); }
});

Then('The following Categories are shown:', {timeout: 4000 }, async function(datatable) {
    logger(`The following Categories are shown`);
    const tableVals = Utils.processDatatable(datatable);
    await loginData.currentPage.getCategories();
    const testResult = await loginData.currentPage.validateCategories(tableVals);
    if (testResult !== true) { throw new Error(`The Category table did not match the expected values.`); }
    await this.driver.sleep(this.waitTime);
});

Then('The following Collections are shown:', {timeout: 4000 }, async function(rawtable) {
    logger(`The following Collections are shown`);
    let cols = rawtable['rawTable'];
    cols.forEach( (c) => { logger(`  -${c}`); });
    cols.shift();
    const testResult = await loginData.currentPage.validateForm(cols);
    if (testResult !== true) { throw new Error(`The Form did not match the expected values`); }
    await this.driver.sleep(this.waitTime);
});