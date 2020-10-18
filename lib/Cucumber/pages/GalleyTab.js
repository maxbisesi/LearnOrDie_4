import {By, until} from 'selenium-webdriver';
import { loginData } from '../loginData';
import logger from '../../logger';
import TemplatePage from './TemplatePage';

export default class GalleyTab extends TemplatePage {
    pageName = 'GalleyTab';

    constructor(seleniumWebDriver) {
        super();
        this.driver = seleniumWebDriver;
        logger(`New GalleyTab page`);
    }

    async validateField(field,value) {
        logger(`validate field on ${this.pageName} field: ${field} - value: ${value}`);
        switch(field) {
            case `Card Set size indicator`: 
                const ind = await this.driver.wait(until.elementLocated(By.className('galley-set-in_progress')));
                const size = await ind.getAttribute('textContent');
                if(size == value) {
                    logger(`Card Set size indicator = ${size} matches value: ${value}`);
                    return true;
                } else {
                    logger(`Card Set size indicator = ${size} does not match value: ${value}`);
                    return false;
                }
            default: throw new Error(`field ${field} not defined on ${this.pagename}`);
        }
    }

    async clickButton(buttonname) {
        logger(`clicking ${buttonname} on ${this.pageName} ...`);
        switch(buttonname) {
            case `Previous Page`: break;
            case `Delete Card`: break;
            case `Save to Set`: 
                await this.driver.wait(until.elementLocated(By.id('savetoset'))).click();
                return true;
            case `Edit Card`: break;
            case `Next Page`: break;
            case `Save`: 
                await this.driver.wait(until.elementLocated(By.id('cardsetmodalsavebutton'))).click();
                return true;
            default: throw new Error(`clickButton: ${buttonname} not defined on ${this.pageName} ... `);
        } 
    }

    async clickQuestion(question) {
        logger(`clicking ${question} on ${this.pageName} ...`);
        const q = await this.driver.wait(until.elementLocated(By.xpath(`//li[contains(.,"${question}")]`)), 10000);
        await q.click();
    }

    async fillField(field,value) {
        logger(`filling field: ${field} with value: ${value}`);
        switch(field) {
            case `Card Set Name`: 
                const csi = await this.driver.wait(until.elementLocated(By.id('cardsetnameinput')));
                await csi.sendKeys(value);
                return true;
            case `Description`: 
                const desc = await this.driver.wait(until.elementLocated(By.id('cardsetdescriptiontextarea')));
                await desc.sendKeys(value);
                return true;
            default: throw new Error(`${field} not defined in fillField() on ${this.pageName}`);
        }
    }
    
    async clickCardSet(set) {
        const setlist = await this.driver.wait(until.elementsLocated(By.className('cardset-set')));
        logger(`    Found ${setlist.length} Card Sets`);
        for(let i = 0; i < setlist.length; i++) {
            const currentSetName = await setlist[i].findElement(By.id('cardsetname')).getAttribute('textContent');
            if(currentSetName == set) {
                logger(`    Found! clicking ${set} Set`);
                await setlist[i].click();
                return true;
            } else {
                continue;
            }
        }
        logger(`FAIL! couldnt't find ${set}`);
        return false;
    }

}