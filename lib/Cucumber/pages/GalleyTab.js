import {By, until} from 'selenium-webdriver';
import { loginData } from '../loginData';
import logger from '../../logger';
import TemplatePage from './TemplatePage';
import TestTab from './TestTab';

export default class GalleyTab extends TemplatePage {
    pageName = 'GalleyTab';

    constructor(seleniumWebDriver) {
        super();
        this.driver = seleniumWebDriver;
        logger(`New GalleyTab page`);
    }

    async validateField(field,value) {
        logger(`validate field on ${this.pageName} field: ${field} - value: ${value}`);
        value = value.trim();
        switch(field) {
            case `Card Set size indicator`: 
                const ind = await this.driver.wait(until.elementLocated(By.className('galley-set-in_progress')));
                const size = await ind.getAttribute('textContent');
                if(`${size}` == `${value}`) {
                    logger(`Card Set size indicator = ${size} matches value: ${value}`);
                    return true;
                } else {
                    logger(`Actual Card Set size indicator = ${size} does not match expected value: ${value}`);
                    return false;
                }
            case `Edit Card: Question`: 
                const ecq = await this.driver.wait(until.elementLocated(By.id('editcardquestion')));
                let actual = await ecq.getAttribute('textContent');
                actual = actual.trim();
                if(`${actual}` === `${value}`) {
                    logger(`Edit Card: Question = |${actual}| matches value: |${value}|`);
                    return true;
                } else {
                    logger(`Edit Card: Actual Question: |${actual}| does not match expected value: |${value}|`);
                    return false;
                }
            case `Edit Card: Answer`:
                const eca = await this.driver.wait(until.elementLocated(By.id('editcardanswer')));
                let actualAns = await eca.getAttribute('textContent');
                actualAns = actualAns.trim();
                if(`${actualAns}` === `${value}`) {
                    logger(`Edit Card: Answer = ${actualAns} matches value: ${value}`);
                    return true;
                } else {
                    logger(`Edit Card: Acutal Answer: ${actualAns} does not match expected value: ${value}`);
                    return false;
                }
            case `Edit Card: Category`:
                const ecc = await this.driver.wait(until.elementLocated(By.id('localCategory')));
                let actualCat = await ecc.getAttribute('value');
                actualCat = actualCat.trim();
                if(`${actualCat}` === `${value}`) {
                    logger(`Edit Card: Category = ${actualCat} matches value: ${value}`);
                    return true;
                } else {
                    logger(`Edit Card: Actual Category: ${actualCat} does not match expected value: ${value}`);
                    return false;
                }
            case `Edit Card: card_id indicator`: throw new Error(`field Edit Card: card_id indicator not defined on ${this.pagename}`);
            case `Page Numbers`: 
                const pagenumbs = await this.driver.wait(until.elementLocated(By.id('galleypagenumbers')));
                const actualPages = await pagenumbs.getAttribute('textContent');
                if(`${actualPages}` === `${value}`) {
                    logger(`Page Numbers = ${actualPages} matches value: ${value}`);
                    return true;
                } else {
                    logger(`Actual Page Numbers = ${actualPages} does not match expected value: ${value}`);
                    return false;
                }
            default: throw new Error(`field ${field} not defined on ${this.pagename}`);
        }
    }

    async clickButton(buttonname) {
        logger(`clicking ${buttonname} on ${this.pageName} ...`);
        switch(buttonname) {
            case `Search`: // galleysearch
                await this.driver.wait(until.elementLocated(By.id('galleysearch'))).click();
                return true;
            case `Previous Page`:
                await this.driver.wait(until.elementLocated(By.id('previouspage'))).click();
                return true;
            case `Delete Card`: 
                await this.driver.wait(until.elementLocated(By.id('deletecard'))).click();
                return true;
            case `Save to Set`: 
                await this.driver.wait(until.elementLocated(By.id('savetoset'))).click();
                return true;
            case `Edit Card`:                 
                await this.driver.wait(until.elementLocated(By.id('editcard'))).click();
                return true;
            case `Next Page`:
                await this.driver.wait(until.elementLocated(By.id('nextpage'))).click();
                return true;
            case `Save`: 
                await this.driver.wait(until.elementLocated(By.id('cardsetmodalsavebutton'))).click();
                return true;
            case `Edit Card: Save`:
                await this.driver.wait(until.elementLocated(By.id('editcardsave'))).click();
                return true;
            case `Edit Card: Next`:
                await this.driver.wait(until.elementLocated(By.id('editcardnext'))).click();
                return true;
            case `Edit Card: Previous`:
                await this.driver.wait(until.elementLocated(By.id('editcardprevious'))).click();
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
                await csi.clear();
                await csi.sendKeys(value);
                return true;
            case `Description`: 
                const desc = await this.driver.wait(until.elementLocated(By.id('cardsetdescriptiontextarea')));
                await desc.clear();
                await desc.sendKeys(value);
                return true;
            case `Edit Card: Question`: 
                const ecq = await this.driver.wait(until.elementLocated(By.id('editcardquestion')));
                await ecq.clear();
                await ecq.sendKeys(value);
                return true;
            case `Edit Card: Answer`:
                const eca = await this.driver.wait(until.elementLocated(By.id('editcardanswer')));
                await eca.clear();
                await eca.sendKeys(value);
                return true; //localCategory
            case `Edit Card: Category`:
                const ecc = await this.driver.wait(until.elementLocated(By.id('localCategory')));
                await ecc.clear();
                await ecc.sendKeys(value);
                return true; //localCategory
            case `Search Bar`: //galleysearchbar
                const sb = await this.driver.wait(until.elementLocated(By.id('galleysearchbar')));
                await sb.clear();
                await sb.sendKeys(value);
                return true;
            default: throw new Error(`${field} not defined in fillField() on ${this.pageName}`);
        }
    }
    
    async clickCardSet(set,action) {
        const setlist = await this.driver.wait(until.elementsLocated(By.className('cardset-set')));
        logger(`    Found ${setlist.length} Card Sets`);
        for(let i = 0; i < setlist.length; i++) {
            const currentSetName = await setlist[i].findElement(By.id('cardsetname')).getAttribute('textContent');
            if(currentSetName == set) {
                logger(`    Found! clicking ${set} Set`);
                await setlist[i].click();
                switch(action) {
                    case 'click': return true;
                    case 'study': 
                        await setlist[i].findElement(By.id('studysetbutton')).click();
                        await this.driver.wait(until.alertIsPresent(), 1000);
                        // Store the alert in a variable
                        let alert = await this.driver.switchTo().alert();
                        //Store the alert text in a variable
                        let alertText = await alert.getText();
                        if(alertText === 'Cards loaded ! Redirect to Testing ?') {
                            await alert.accept();
                            await this.driver.wait(until.elementLocated(By.id('testpoints'), 3000));
                            loginData.currentPage = new TestTab(this.driver);
                            return true;
                        } else {
                            return false;
                        }
                    case 'delete':
                        await setlist[i].findElement(By.id('deletesetbutton')).click();
                        await this.driver.wait(until.alertIsPresent(), 1000);
                        // Store the alert in a variable
                        const delalert = await this.driver.switchTo().alert();
                        await delalert.accept();
                        return true;
                    case 'share': throw new Error(`${this.pageName} share Card Set not yet implemented.`);
                    case 'edit': throw new Error(`${this.pageName} edit Card Set not yet implemented.`);
                }
            } else {
                continue;
            }
        }
        logger(`FAIL! couldnt't find ${set}`);
        return false;
    }

    async clickRandomQuestion() {
        const questions = await this.driver.wait(until.elementsLocated(By.className('galley-question')));
        logger(`    Found ${questions.length} Galley Quesitons.`);
        let randindex = Math.floor(Math.random()*questions.length);
        logger(`    clickRandomQuestion() randindex: ${randindex}`);
        const qtoclick = questions[randindex];
        const questionText = await qtoclick.getAttribute('innerText');
        logger(`    random question: ${questionText}`);
        await this.clickQuestion(questionText);
    }

    async validateCardCount(count) {
        const questions = await this.driver.wait(until.elementsLocated(By.className('galley-question')));
        logger(`    Found ${questions.length} Galley Quesitons.`);
        if(count == questions.length) {
            logger(`Found expected number of Cards: ${count}`);
            return true;
        } else {
            logger(`Did not find expected number of Cards: ${count} actual: ${questions.length}`);
            return false;
        }
    }

}