const { Given, When, Then } = require('@cucumber/cucumber');
const utils = require('../../lib/utils');
const expect = require('chai').expect;
const loginPage = require('../../support/pages/loginPage');

Given('I am on the Sauce Demo Login Page', async function () {
	await this.page.goto('https://www.saucedemo.com/');
});

When('I fill the account information for account StandardUser into the Username field and the Password field', async function(){
	await utils.clickAndTypeText(this.page, loginPage.textFields.username, 'standard_user');
	await utils.clickAndTypeText(this.page, loginPage.textFields.password, 'secret_sauce');

});

When('I fill the account information for account LockedOutUser into the Username field and the Password field', async function(){
	await utils.clickAndTypeText(this.page, loginPage.textFields.username, 'locked_out_user');
	await utils.clickAndTypeText(this.page, loginPage.textFields.password, 'secret_sauce');
});

When('I click the Login Button', async function () {
	await utils.click(this.page, loginPage.buttons.login);
	}
);

Then('I am redirected to the Sauce Demo Main Page', async function(){
	let mainUrl = await this.page.url();
	expect(mainUrl).to.contain("/inventory.html")
	console.log(mainUrl);
})

Then('I verify the App Logo exists', async function(){
	await this.page.waitForSelector(loginPage.appLogo, {
		visible: true,
	  })
})

When('I verify the Error Message contains the text {string}', async function(errorMessage){	
	let message = await utils.getText(this.page, loginPage.errorMsg);
    expect(message).to.contain(errorMessage);
})
