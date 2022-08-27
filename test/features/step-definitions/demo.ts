import { Given, When, Then } from '@wdio/cucumber-framework';
import chai from 'chai';

Given(/^Google page is opened$/, async function () {
  await browser.url('https://www.google.com');
  await browser.pause(1000);
  console.log(`This is the browser object >>> ${JSON.stringify(browser)}`);
});

When(/^Search with (.*)$/, async function (searchItem) {
  console.log(`searchItem: ${searchItem}`);
  let ele = await $(`[name=q]`);
  await ele.setValue(searchItem);
  await browser.keys('Enter'); // Simulates hitting ENTER on keyboard
  console.log(`This is the element object >>> ${JSON.stringify(ele)}`);

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

//? Mimicking A Person Typing In An Input Box
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

//? Drop-down Menus
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

//? Checkboxes
Given(/^A web page is opened checkboxes$/, async function () {
  await browser.url('/checkboxes'); // If you just have quotes inside the method it reads the baseURL from our configuration file called wdio.conf.ts file. If you want to go to a specific route on the base URL you just need to put /route. WebdriverIO will automatically pick up the base URL
  await browser.setTimeout({ implicit: 15000, pageLoad: 10000 }); // Waits 15 seconds before WebDriverIO says I can't find the element; Will wait 10 seconds before it times out and says I couldn't load the page
  await browser.maximizeWindow();
});

When(/^Perform web interactions checkboxes$/, async function () {
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
  // await browser.debug();
});

//? Windows
Given(/^A web page is opened windows$/, async function () {
  // 1. Launch the browser
  await browser.url('/windows');
});

When(/^Perform web interactions windows$/, async function () {
  // 2. Open new windows
  await $(`=Click Here`).click(); // Gets link with the text "Click Here" and clicks on that link
  await $(`=Elemental Selenium`).click(); // Gets link with the text "Elemental Selenium" and clicks on that link
  let currentWindowTitle = await browser.getTitle(); // Gets title of current window which is the parent window. WebdriverIO doesn't automatically switch to new window opened
  let parentWindowHandle = await browser.getWindowHandle(); // Gets window string ID which WebdriverIO uses to identify open windows. This is always the window ID of the parent window
  console.log(`>> currentWindowTitle: ${currentWindowTitle}`);

  // 3. Switch to specific window
  let windowHandles = await browser.getWindowHandles(); // Gets window string ID's for which WebdriverIO uses to identify open windows and puts them in array
  for (let i = 0; i < windowHandles.length; i++) {
    // Loop through windowHandles
    console.log(`>>Window Handle : ${windowHandles[i]}`);
    await browser.switchToWindow(windowHandles[i]); // For each windowHandle ID switch to that window
    let currentWindowTitle = await browser.getTitle(); // Get title of the current window
    if (
      currentWindowTitle ===
      'Elemental Selenium: Receive a Free, Weekly Tip on Using Selenium like a Pro'
    ) {
      await browser.switchToWindow(windowHandles[i]); // If the current window title equals "Elemental Selenium: Receive a Free, Weekly Tip on Using Selenium like a Pro" then switch to that window
      let headerTextEleSel = await $('<h1>').getText(); // Get the text of the h1 tag element in window
      console.log(`>> headerTextEleSel:${headerTextEleSel}`);

      break;
    }
  }
  // 4. Switch back to parent window
  await browser.switchToWindow(parentWindowHandle);
  let parentWindowText = await $('<h3>').getText();
  console.log(`>> parentWindowText:${parentWindowText}`);

  // await browser.debug()
});

//? Alerts
Given(/^A web page is opened alerts$/, async function () {
  // await browser.url('/javascript_alerts');
  await browser.url(
    'https://admin:admin@the-internet.herokuapp.com/basic_auth'
  ); // This handles basic authentication; admin is username and admin again is password
});

When(/^Perform web interactions alerts$/, async function () {
  //! Alert with only an OK button to click
  // await $('button=Click for JS Alert').click(); // Click on button that displays the alert
  // if (await browser.isAlertOpen()) {
  //   await browser.acceptAlert();  // Clicks OK button on alert
  // }
  // await browser.debug();

  //! Alert with an OK button and a Cancel button to click
  // await $('button=Click for JS Confirm').click(); // Click on button that displays the alert
  // if (await browser.isAlertOpen()) {
  //   await browser.dismissAlert(); // Clicks Cancel button on alert
  // }
  // await browser.debug();

  //! Alert with and input box and an OK and Cancel buttons to click
  // await $('button=Click for JS Prompt').click(); // Click on button that displays the alert
  // if (await browser.isAlertOpen()) {
  //   const alertText = await browser.getAlertText(); // Gets the text of an alert
  //   console.log(`alert text is = ${alertText}`);
  //   await browser.sendAlertText('Hello World this is Shaun Valentine')  // Enters text into alert input box
  //   await browser.acceptAlert(); // Clicks OK button on alert
  //   await browser.pause(2000);
  // }
  // await browser.debug();

  //! Basic authentication
  await browser.debug();
});

//? File Upload
Given(/^A web page is opened file upload$/, async function () {
  await browser.url('/upload');
});

When(/^Perform web interactions file upload$/, async function () {
  console.log(`WORKING DIRECTORY = ${process.cwd()}`);
  // await $('#file-upload').addValue('../../../data/fileUpload/dummy.txt'); CANNOT use relative file paths like this. Must use absolute file paths
  await $('#file-upload').addValue(
    `${process.cwd()}/data/fileUpload/dummy.txt`
  );
  await $('#file-submit').click();
  await browser.debug();
});

//? Frames
Given(/^A web page is opened frames$/, async function () {
  await browser.url('/frames');
});

When(/^Perform web interactions frames$/, async function () {
  await $('=iFrame').click(); // Click link to go to iframe page
  const element = await $('#mce_0_ifr'); // Must target the iframe first; This is the id for the iframe
  await browser.switchToFrame(element); //  Then tell WebdriverIO to go into the iframe
  // Interact with Frames
  await $('#tinymce').setValue('Typing into a frame...'); // Once in the iframe now we can start typing inside the input field
  await browser.switchToParentFrame(); // Switches back to parent frame
  await browser.debug();
});

//? Keys
Given(/^A web page is opened keys$/, async function () {
  await browser.url('/frames');
});

When(/^Perform web interactions keys$/, async function () {
  await $('=iFrame').click(); // Click link to go to iframe page
  const element = await $('#mce_0_ifr'); // Must target the iframe first; This is the id for the iframe
  await browser.switchToFrame(element); //  Then tell WebdriverIO to go into the iframe
  await $('#tinymce').click();
  await browser.keys(['Meta', 'A']); // Keys typed on keyboard. Meta is like the CNTRL key; CNTRL + A clears all the content in the iframe input box
  await browser.pause(2000);
  await $('#tinymce').setValue('Typing into a frame...'); // Once in the iframe now we can start typing inside the input field
  await browser.switchToParentFrame(); // Switches back to parent frame
  await browser.debug();
});

//? Scrolling
Given(/^A web page is opened scrolling$/, async function () {
  await browser.url('https://www.cnbc.com/');
});

When(/^Perform web interactions scrolling$/, async function () {
  await $('h3=Most Active').scrollIntoView();
  await browser.debug();
});
