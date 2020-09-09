import {When, Then, Before, After} from 'cucumber';
import dotenv from 'dotenv';
import webdriver,{By, until} from 'selenium-webdriver';
import assert from 'assert';
import logger from '../../logger';
import Utils from '../../Utils';
import LoginProfile from '../pages/LoginProfile';
import { loginData } from '../loginData';
import ChumTab from '../pages/ChumTab';
import GalleyTab from '../pages/GalleyTab';
import HomeTab from '../pages/HomeTab';
import TestTab from '../pages/TestTab';

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
    await this.driver.sleep(5000);
});

When('The Collection {string} has the following Categories: ', {timeout:4000}, async function(cats) {

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