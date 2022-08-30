import { Given, When, Then } from '@wdio/cucumber-framework';
import chai from 'chai';

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

Given(/^I navigate to website to demo refreshing of screen$/, async function () {
  await browser.url(`https://www.saucedemo.com`);
})

Given(/^I navigate to CNBC$/, async function () {
  await browser.url('https://www.cnbc.com');
  await browser.pause(3000);
})

Given(/^I navigate to ESPN$/, async function () {
  await browser.url('https://www.espn.com');
})
