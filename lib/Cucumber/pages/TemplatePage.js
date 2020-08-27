import webdriver,{By, until} from 'selenium-webdriver';
import { loginData } from '../loginData';
import logger from '../../logger';

export default class TemplatePage {
    pagename = 'TemplatePage';
    async validateField(field,value) {
        throw new Error(`validateField not defined on ${this.pagename}`);
    }
}