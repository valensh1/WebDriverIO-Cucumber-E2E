import { Given, When, Then } from '@wdio/cucumber-framework';
import chai from 'chai';

Given(/^Google page is opened$/, async function () {
  await browser.url('https://www.google.com');
  await browser.pause(1000);
});

When(/^Search with (.*)$/, async function (searchItem) {
  console.log(`searchItem: ${searchItem}`);
  let ele = await $(`[name=q]`);
  await ele.setValue(searchItem);
  await browser.keys('Enter'); // Simulates hitting ENTER on keyboard
});

Then(/^Click on the first search result$/, async function () {
  let ele = await $(`<h3>`); // When multiple h3 tags on page it will get first one
  ele.click();
});

Then(/^URL should match (.*)$/, async function (expectedURL) {
  console.log(`expectedURL: ${expectedURL}`);
  let url = await browser.getUrl();
  chai.expect(url).to.equal(expectedURL);
});

// Web Interactions
Given(/^A web page is opened$/, async function () {
  await browser.url('/inputs'); // If you just have quotes inside the method it reads the baseURL from our configuration file called wdio.conf.ts file. If you want to go to a specific route on the base URL you just need to put /route. WebdriverIO will automatically pick up the base URL
  await browser.setTimeout({ implicit: 15000, pageLoad: 10000 }); // Waits 15 seconds before WebDriverIO says I can't find the element; Will wait 10 seconds before it times out and says I couldn't load the page
  await browser.maximizeWindow();
});

When(/^Perform web interactions$/, async function () {
  /*
1. Input Box
Actions:
1. Type into input box
2. Clear the field and type or just addvalue
3. Click and type
4. Slow typing
  */
  const num = 12345;
  const numString = `${num}`; // Convert num variable which is a number into a string
  let element = await $(`input[type=number]`); // Finds the input element with the attribute name type with a value of number
  await element.click(); // Finds element and then clicks on it
  // await element.setValue('12345'); // Clears values in input field first and then enters values

  // Mimics a person typing in the numbers 12345 in an input field with a 1 second pause between each keystroke
  for (let i = 0; i < numString.length; i++) {
    let charStr = numString[i]; // Gets the letter at the specified index position
    await browser.pause(1000); // Pauses for 1 second
    await browser.keys(charStr); // Types in the key which is the the number at the specified index position according to i
  }
  await browser.pause(5000); // Keeps the browser opened/paused for 5 secs
});

Given(/^A web page is opened drop-down$/, async function () {
  await browser.url('/dropdown'); // If you just have quotes inside the method it reads the baseURL from our configuration file called wdio.conf.ts file. If you want to go to a specific route on the base URL you just need to put /route. WebdriverIO will automatically pick up the base URL
  await browser.setTimeout({ implicit: 15000, pageLoad: 10000 }); // Waits 15 seconds before WebDriverIO says I can't find the element; Will wait 10 seconds before it times out and says I couldn't load the page
  await browser.maximizeWindow();
});

When(/^Perform web interactions drop-down$/, async function () {
  //? Drop-down Menus
  // 1. Assert default option is selected
  let element = await $('//select/option[@selected="selected"]');
  let value = await element.getText(); // Gets the text from the DOM element
  chai.expect(value).to.equal('Please select an option'); // Don't need to await Chai code
  // await browser.debug();

  // 2. Select by attribute, text, index
  let dropDownElement = $('#dropdown');
  // await dropDownElement.selectByVisibleText('Option 2');
  // await dropDownElement.selectByAttribute('value', '1');
  await dropDownElement.selectByIndex(2);
  // await browser.debug();

  // 3. Get a list of options
  let elementArray = await $$('select > option'); // Using double dollar sign $$ to get an array of elements
  let arr = [];
  for (let i = 0; i < elementArray.length; i++) {
    let element = elementArray[i];
    let value = await element.getText();
    arr.push(value);
    console.log(value);
  }
  console.log(`>> Options Array: ${arr}`);
});

Given(/^A web page is opened checkboxes$/, async function () {
  await browser.url('/checkboxes'); // If you just have quotes inside the method it reads the baseURL from our configuration file called wdio.conf.ts file. If you want to go to a specific route on the base URL you just need to put /route. WebdriverIO will automatically pick up the base URL
  await browser.setTimeout({ implicit: 15000, pageLoad: 10000 }); // Waits 15 seconds before WebDriverIO says I can't find the element; Will wait 10 seconds before it times out and says I couldn't load the page
  await browser.maximizeWindow();
});

When(/^Perform web interactions checkboxes$/, async function () {
  //? Checkboxes
  //! Assert checkbox at index position 1 is NOT checked
  let checkboxElement = await $('//form[@id="checkboxes"]/input[1]');
  // await checkboxElement.click();
  // if(!await checkboxElement.isSelected()) {
  //   await checkboxElement.click();
  // }
  let isChecked = await checkboxElement.isSelected();
  chai.expect(isChecked).to.be.false;
  // await browser.debug();

  //! If ALL checkboxes are unselected then check them
  let checkboxElements = await $$('//form[@id="checkboxes"]/input'); // Creates an array of the checkbox elements

  for (let i = 0; i < checkboxElements.length; i++) {
    let isCheckedElement = checkboxElements[i]; // Gets checkbox at selected index
    if (!(await isCheckedElement.isSelected())) {
      // If checkbox is NOT selected then click checkbox
      isCheckedElement.click();
    }
  }
  await browser.debug();
});
