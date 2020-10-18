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
import { testData } from '../testData';

When('The user selects the following question cards:',{ timeout: 40000 }, async function(rawtable) {
    logger('The user selects the following question cards:');
    let qs = rawtable['rawTable'];
    qs.shift();
    for(let i = 0; i < qs.length; i++) {
        await loginData.currentPage.clickQuestion(qs[i]);
    }
});

When('The user clicks the {string} Card Set',{ timeout: 40000 }, async function(cardset) {
    logger(`The user clicks the ${cardset} Card Set`);
    const result = await loginData.currentPage.clickCardSet(cardset);
    if(result !== true) {
        throw new Error(`Fail couldn't find ${cardset}`);
    }
});