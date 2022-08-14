//? Installing WebDriverIO
/*
In Terminal type in the following inside your project:
1. npm init
2. npm install --save-dev @wdio/cli
3. npx wdio config
4. npx wdio run

5. Then must create a jsconfig.json file
{
    "compilerOptions": {
        "types": [
            "node",
            "webdriverio/async",
            "wdio/cucumber-framework"          <--- Change cucumber-framework to mocha-framework if want to use mocha
        ]
    },
    "exclude": ["node_modules"]
}

6. npm i chai

7. Then type in the following to Terminal to ensure everything is working correctly:
npx wdio run wdio.conf.js

*/

//? Alternative Way to Install WDIO
/*

In the terminal type in the following:
npm init wdio .

*/

//? RUNNING TESTS
/*
In Terminal window under project repository type in the following:
//! ---> npx wdio
//! ---> npx wdio wdio.conf.ts
This will run all files listed under specs in wdio.conf.js file
*/

// To run a specific test file straight from CLI without having to change the wdio.conf.js file type in the following straight in the Terminal:
//! npx wdio --spec test/specs/home.js  <-- Change out home.js with whatever file name you want to run. Also may need to change out test/specs if that's not how you named your folders.

// To run all spec files from CLI but EXCLUDE certain files type in the following in Terminal:
//! npx wdio --exclude test/specs/home.js <-- Excludes home.js file
//! npx wdio --exclude test/specs/home.js --exclude test/specs/contact.js <-- Excludes home.js file AND contacts.js file


//? DEBUGGING
await browser.pause(5000); // Use this inside your code near where you think bug is to make sure there is no timeout issue. 5000 represents milliseconds and is equivalent to 5 seconds.
await browser.debug(); // Increase the Mocha timeout in the config file when debugging. This will stop execution of code at a certain point.


//? HOOKS
/*
Help with set-up and teardown of tests
Reduce test dependencies
 The following hooks are available to use:
    -> Before hook
    -> After hook
    -> BeforeEach hook
    -> AfterEach hook
    -> GLOBAL HOOKS
*/

//? ------------------------------ XPATH ---------------------------------- 
// Basic XPATH - (//input[@type="submit"]) 
// Contains XPATH - (//*[contains(@href, 'index'])
// Or & And XPATH - (//*[@href=index.html and @role='menuitem'])
// Starts With XPATH - (//a[starts-with(@href, 'index'])
// Text XPATH - (//a[text()='About'])


//? To Run Allure Reports
/*
1. In wdio.conf.js file go to reporter section and paste in the following (code should look like this):
    reporters: ['spec', ['allure', {
        outputDir: 'allure-results',
        disableWebdriverStepsReporting: false,
        disableWebdriverScreenshotsReporting: false,
    }]],

2. In Terminal must install allure package into your project by going to Terminal and typing in the following:
        npm i allure-commandline

3. Then also in Terminal paste the following:
        npx allure generate allure-results && npx allure open  // allure-results is the name of your folder that you named in 1 above under OutputDir key

4. To auto generate report go into wdio.conf.js file and replace onComplete commented code with this code:
     onComplete: function() {
        const reportError = new Error('Could not generate Allure report')
        const generation = allure(['generate', 'allure-results', '--clean'])
        return new Promise((resolve, reject) => {
            const generationTimeout = setTimeout(
                () => reject(reportError),
                5000)

            generation.on('exit', function(exitCode) {
                clearTimeout(generationTimeout)

                if (exitCode !== 0) {
                    return reject(reportError)
                }

                console.log('Allure report successfully generated')
                resolve()
            })
        })
    }

5. Run your tests and then after tests are complete type in the following into the Terminal to see report:
            npx allure open
    */


 //? wdio.conf.js File
 // specs: [./features/*.feature] // Will run anything with a .feature at the end of the file name.

 //? IMPORTING CHAI INTO PROJECT
 /*
//! 3 steps

1. In Terminal type in the following to download Chai from NPM
    npm i --save-dev chai

2. In Terminal type in the following to download another thing Chai needs:
    npm i --save-dev @types/chai

3. In tsconfig.json file put in the following:
{
    "compilerOptions": {
        "esModuleInterop": true, //! Need to add this for Chai
        "moduleResolution": "node",
        "types": [
            "node",
            "webdriverio/async",
            "@wdio/cucumber-framework",
            "expect-webdriverio"
        ],
        "target": "es2019",
        "module": "CommonJS"
    }
}
 */

//? SELECTING ELEMENTS
// $ - Selects a single DOM element
// $$ - Selects multiple DOM elements

//? CSS SELECTORS
$(`#firstName`) // Targets element with id of firstName
$(`.loginBtn`)  // Targets element with the class of loginBtn
$(`<h1>`) // Targets the element with an h1 tag
$(`input[value=lakers]`) // Targets the element with the input tag and the attribute name of value and the value of lakers
$(`input[value*=lake]`) // Targets the element with the input tag and the attribute name of value and the value that CONTAINS lake
$(`input[value^=lake]`) // Targets the element with the input tag and the attribute name of value and the value that STARTS WITH lake
$(`input[value$=lake]`) // Targets the element with the input tag and the attribute name of value and the value that ENDS WITH lake
$('div=Sign in') // Targets the element with a div tag and has text inside the div tag of 'Sign in'
$('div*=Sign in') // Targets the element with a div tag and has partial text inside the div tag of 'Sign in xxxxxx'
(`//div[@name='name']`) // Targets the element with a div tag and name attribute that equals name
(`//div[contains(.,"text"])`) // Targets the element with a div tag with partial text that contains "text and some other words"
$(`=webdriverio`) // Targets link that equals webdriverIO; Supported only by WebdriverIO
$(`*=webdriverio`) // Targets link that contains partial text webdriverIO; Supported only by WebdriverIO

//? XPATH
/*
EXAMPLE HTML
<form id="checkboxes">
    <input type="checkbox"> checkbox 1<br>
    <input type="checkbox" checked=""> checkbox 2
  </form>
*/

// XPATH to select first checkbox
//form[@id='checkboxes']/input[1] // will get the checkbox 1 above

//? WebdriverIO METHODS
await variableName.setValue(12345) // Clears any input field before typing/setting the value of the input field
await variableName.addValue(12345) // DOES NOT CLEAR input field before typing/setting the value of the input field
await variableName.click(); // Clicks on an element (element is saved into a variableName)
await variableName.moveTo(); // Moves to an element (element is saved into a variableName)
await variableName.scrollIntoView(); // Scrolls an element into view (element is saved into a variableName)
await variableName.keys(enterValueOrTextHere); // Types into input box like a regular human typing one by one
await variableName.debug(); // Stops the test so you can inspect the browser
await variableName.getText(); // Gets the text from a DOM element
await variableName.selectByVisibleText('insert visible text here'); // Selects an element by visible text on screen; Usually used with a drop-down element
await variableName.selectByAttribute('value', '1'); // Selects the element with the attribute name of value and has a value equal to 1; Usually used for drop-down menus
await variableName.selectByIndex(2); // Selects an element at the 2nd index position; Usually used with drop-down menus
await variableName.isSelected(); // Generally use with an IF statement for if element is selected then do this...


//? MIMICK A HUMAN TYPING INTO AN INPUT FIELD
const num = 12345;
const numString = `${num}`; // Convert num variable which is a number into a string
let element = await $(`input[type=number]`); // Finds the input element with the attribute name type with a value of number
await element.click(); // Finds element and then clicks on it

for (let i = 0; i < numString.length; i++) {
  let charStr = numString[i]; // Gets the letter at the specified index position for numString and sets that equal to a variable called charStr
  await browser.pause(1000);  // Pauses for 1 second
  await browser.keys(charStr);  // Types in the key which is the the number at the specified index position according to i
}
await browser.pause(5000); // Keeps the browser opened/paused for 5 secs


//? LOOPING IN WebdriverIO
// forEach method does not support async function so must use for of loop or standard for loop instead

  //! Loop through all checkboxes and If checkboxes are unselected then check them
  let checkboxElements = await $$('//form[@id="checkboxes"]/input'); // Creates an array of the checkbox elements

  for (let i = 0; i < checkboxElements.length; i++) {
    let isCheckedElement = checkboxElements[i]; // Gets checkbox at selected index
    if (!(await isCheckedElement.isSelected())) { // If checkbox is NOT selected then click checkbox
      isCheckedElement.click();
    }
  }
 


//? CHAI ASSERTIONS
chai.expect(isChecked).to.be.false; // Checks to see if isChecked which is a variable that stores a boolean value is equal to false
