import webdriver,{By, until} from 'selenium-webdriver';
import { loginData } from '../loginData';
import logger from '../../logger';

export default class TemplatePage {
	pageName = 'TemplatePage';
	constructor(){
		logger('Template Page Constructor ..');
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

	async validateForm(formData={}) {
		logger(`Validating Form on Page: ${this.pageName} ...`);
		let testResult = 'Pass';
		for (const rowkey in Object.keys(formData)) {
			if (formData.hasOwnProperty(rowkey)) {
				if (await this.validateField(formData[rowkey], formData[rowkey]) === false) {
					testResult = 'Fail';
				}
			}
		}
		logger(`Validated Form. Result: ${testResult}\n`);
		return testResult;
	}

	async fillForm(formData={}) {
		logger(`Filling Form on Page: ${this.pageName} ...`);
		for (const rowkey in formData) {
			if (formData.hasOwnProperty(rowkey)) {
				if (await this.fillField(rowkey, formData[rowkey]) !== true) {
					throw new Error(`Error filling in field ${rowkey} on ${this.pageName}`);
				}
			}
		}
		logger(`Filled Form.\n`);
		return true;
	}
}