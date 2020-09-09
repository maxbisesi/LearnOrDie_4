import {When, Then, Before, After} from 'cucumber';
import dotenv from 'dotenv';
import webdriver,{By, until} from 'selenium-webdriver';
import assert from 'assert';
import logger from '../../logger';
import Utils from '../../Utils';
import { loginData } from '../loginData';


When('The user creates a new Collection named: {string}',{timeout: 6000}, async function(name) {
    logger(`-------------------------`);
    logger(`The user creates a new Collection named: ${name}`);
    logger(`==========================`);
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

When('The user drags the {string} Category into the {string} Collection', {timeout:6000}, async function(cat,col) {
    logger(`-------------------------`);
    logger(`And The user drags the ${cat} Category into the ${col} Collection`);
    logger(`==========================`);
    let category = await this.driver.wait(until.elementLocated(By.id(Utils.createCategoryId(cat))));
    let collection = await this.driver.wait(until.elementLocated(By.id(Utils.createCategoryId(col))));
    const actions = this.driver.actions();
    
    await actions
        .move({duration:3000,origin:category,x:0,y:0})
        .press()
        .move({duration:3000,origin:collection,x:0,y:0})
        .release()
        .perform();
        
    await this.driver.sleep(4000);
});

When(`The user removes the {string} Category from the {string} Collection`, {timeout:4000}, async function(cat,col) {

});

Then('The {string} Collection has the following Categories:', {timeout:4000}, async function(collection, cattable) {
    logger(`-------------------------`);
    logger(`The ${collection} Collection has the following Categories:`);
    logger(`==========================`);

});

Then('The following Categories are shown:', {timeout: 4000 }, async function(datatable) {
    logger(`-------------------------`);
    logger(`The following Categories are shown`);
    logger(`==========================`);
    const tableVals = Utils.processDatatable(datatable);
    await loginData.currentPage.getCategories();
    const testResult = await loginData.currentPage.validateCategories(tableVals);
    if (testResult !== true) { throw new Error(`The Category table did not match the expected values.`); }
    await this.driver.sleep(this.waitTime);
});

Then('The following Collections are shown:', {timeout: 4000 }, async function(datatable) {
    logger(`-------------------------`);
    logger(`The following Collections are shown`);
    logger(`==========================`);
    const tableVals = Utils.processDatatable(datatable);
    await loginData.currentPage.getCollections();
    // const testResult = await loginData.currentPage.validateForm(tableVals);
    // if (testResult !== true) { throw new Error(`The Form did not match the expected values`); }
    await this.driver.sleep(this.waitTime);
});