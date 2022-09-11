import { Given, When, Then, DataTable } from '@wdio/cucumber-framework';
import chai from 'chai';
import logger from '../../helper/logger';
import reporter from '../../helper/reporter';

Given(/^Login to inventory web app$/, async function () {
  // Navigate to inventory app
  // await browser.url('https://www.saucedemo.com'); // Can use this hardcoded one also
  // @ts-ignore
  await browser.url(browser.config.sauceDemoURL);
  console.log(`browser config values --> ${JSON.stringify(browser.config)}`);
  await browser.setTimeout({ implicit: 15000, pageLoad: 10000 });

  // Login to inventory app
  await $('#user-name').setValue('standard_user');
  await $('#password').setValue('secret_sauce');
  await $('#login-button').click();
});

Given(/^Navigate to tables webpage$/, async function () {
  await browser.url('https://the-internet.herokuapp.com/tables');
});

Given(/^I navigate to webpage to demo scrolling$/, async function () {
  await browser.url('https://www.ten-x.com');
});

Given(
  /^I navigate to website to demo refreshing of screen$/,
  async function () {
    await browser.url(`https://www.saucedemo.com`);
  }
);

Given(/^I navigate to CNBC$/, async function () {
  await browser.url('https://www.cnbc.com');
  await browser.pause(3000);
});

Given(/^I navigate to ESPN$/, async function () {
  await browser.url('https://www.espn.com');
});

//? Regular Expression Example
Given(
  /^As (a|an) (.*) I login to inventory web app$/,
  async function (prefix, userType, data) {
    // userType is <User> from feature file
   let dt = data.hashes();
   console.log(`Data table --> ${JSON.stringify(dt)}`);
    await browser.url('https://www.saucedemo.com');
    console.log(`We are running Regular Expression Tests!!!`);
    const userName = await $(`#user-name`);
    await userName.setValue(dt[0].Player);
    await browser.pause(1500);
  }
);

Given(/^I (.*)\s? navigate to ESPN page$/, async function (prefix) {
  await browser.url(`https:www.espn.com`);
  throw new Error("This is a error given on purpose to show example of a screenshot");
});

//? WORLD CONSTRUCTOR VARIABLE TO PASS TO OTHER STEP-DEFINITIONS IN SCENARIO
Given(/^I log into CNBC page$/, async function () {
  reporter.addStep(this.testNo, 'info', 'Login to CNBC');
  logger.info('Logging into CNBC...'); // Using logger
  await browser.url('https://www.cnbc.com');
  await browser.maximizeWindow();
  this.appid = 'appIDTEST to pass to other step-definitions';
  this.testNo = 23;
  reporter.addStep(this.testNo, 'debug', 'Login to CNBC was SUCCESSFUL!!!!');
})