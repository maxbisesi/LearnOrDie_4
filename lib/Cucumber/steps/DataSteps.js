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
import apiManager from '../apiManager';
import { queryData } from '../queryData';

When('The user queries for a FlashCard with the following properties:',{ timeout: 60000 }, async function(rawtable) {
    logger('The user queries for a FlashCard with the following properties:');
    const table = rawtable[`rawTable`];
    logger(table);
    table.shift();
    let queryList = [];
    for( let i = 0; i < table.length; i++) {
        queryList.push({ 'Field':`${table[i][0]}`, 
                         'Operator':`${table[i][1]}`,
                         'Value': `${table[i][2]}`});
    }
    let result = await apiManager.queryForFlashCard(queryList);
    if(result !== true) { throw new Error(`Couldn't query for FlashCard with the following props: ${table}`); }
});

Then('No {string} records were found',{ timeout: 5000 }, async function(object) {
    switch(object) {
        case 'FlashCard': 
            if(queryData.flashCardId === '') {
                return true;
            } else {
                throw new Error(`A FlashCard record was found...`);
            }
        default: throw new Error(`No ${object} definition for this step..`);
    }
});