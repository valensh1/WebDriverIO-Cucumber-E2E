import { Given, When, Then } from '@wdio/cucumber-framework';
import chai from 'chai';

Given(/^Login to inventory web app$/, async function () {
  // Navigate to inventory app
  await browser.url('https://www.saucedemo.com');
  await browser.setTimeout({ implicit: 15000, pageLoad: 10000 });

  // Login to inventory app
  await $('#user-name').setValue('standard_user');
  await $('#password').setValue('secret_sauce');
  await $('#login-button').click();
});

Given(/^Navigate to tables webpage$/, async function () {
  await browser.url('https://the-internet.herokuapp.com/tables');
});