import {When, Then, Before, After} from 'cucumber';
import dotenv from 'dotenv';
import webdriver,{By, until} from 'selenium-webdriver';
import assert from 'assert';
import logger from '../../logger';
import { processDatatable } from '../../Utils';
import LoginProfile from '../pages/LoginProfile';
import { loginData } from '../loginData';
import ChumTab from '../pages/ChumTab';
import GalleyTab from '../pages/GalleyTab';
import HomeTab from '../pages/HomeTab';
import TestTab from '../pages/TestTab';

Then('The following Categories are shown:', {timeout: 4000 }, async function(datatable) {
    logger(`-------------------------`);
    const tableVals = processDatatable(datatable);
    const testResult = await loginData.currentPage.validateForm(tableVals);
    if (testResult !== true) { throw new Error(`The Form did not match the expected values`); }
    await this.driver.sleep(this.waitTime);
    logger(`-------------------------`);
});

Then('The following Collections are shown:', {timeout: 4000 }, async function(datatable) {
    logger(`-------------------------`);
    const tableVals = processDatatable(datatable);
    const testResult = await loginData.currentPage.validateForm(tableVals);
    if (testResult !== true) { throw new Error(`The Form did not match the expected values`); }
    await this.driver.sleep(this.waitTime);
    logger(`-------------------------`);
});