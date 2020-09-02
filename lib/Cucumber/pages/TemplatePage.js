import webdriver,{By, until} from 'selenium-webdriver';
import { loginData } from '../loginData';
import logger from '../../logger';

export default class TemplatePage {
	pageName = 'TemplatePage';
	constructor(){
		// logger('Template Page Constructor ..');
	}

    async validateField(field,value) {
        throw new Error(`validateField not defined on ${this.pageName}`);
    }

    async clickButton(button) {
        throw new Error(`clickButton not defined on ${this.pageName}`);
	}
	
	async fillField(field,value) {
		throw new Error(`fillField not defined on ${this.pageName}`);
	}

	async selectCheckBox(name) {
		throw new Error(`selectCheckBox not defined on ${this.pageName}`);
	}
	
	async validateForm(formData=new Map()) {
		logger(`Validating Form on Page: ${this.pageName} ...`);
		for (const [key, val] of formData) {
			//logger(`validateForm() { this.validateField(${rowkey}, ${formData[rowkey]})`);
			if (await this.validateField(key, val) === false) {
				return false;
			}
		}
		return true;
	}

	async fillForm(formData=new Map()) {
		logger(`Filling Form on Page: ${this.pageName} ...`);
		for (const [key, val] of formData) {
			if (await this.fillField(key, val) !== true) {
				throw new Error(`Error filling in field ${key} on ${this.pageName}`);
			}
			
		}
		logger(`Filled Form.\n`);
		return true;
	}
}