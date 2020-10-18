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

When('The following Card Set Indicators are shown:',{ timeout: 40000 }, async function(rawtable) {
    logger('The user selects the following question cards:');
    let qs = rawtable['rawTable'];
    qs.shift();
    // qs[i][0] = Set Name
    // qs[i][1] = Set Size
    // qs[i][2] = Description
    for(let i = 0; i < qs.length; i++) {
        logger(qs[i]);
        const res = await loginData.currentPage.validateSetIndicator(qs[i][0],qs[i][1],qs[i][2]);
        if(res !== true) {
            throw new Error(`FAIL Card Set indicator did not match!`);
        }
    }
});