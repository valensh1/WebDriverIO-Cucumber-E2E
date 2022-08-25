import { Then } from '@wdio/cucumber-framework';
import chai from 'chai';

Then(/^Inventory page should list (.*)$/, async function (NumOfProducts) {
  if (!NumOfProducts)
    throw Error(`Invalid product count provided: ${NumOfProducts}`);
  const elementArray = await $$('.inventory_item_name');
  chai.expect(elementArray.length).to.equal(parseInt(NumOfProducts));
});

Then(/^Validate all products have valid price$/, async function () {
  // Get Price List
  const prices = await $$('.inventory_item_price'); // Get array of all inventory prices displayed on page
  const priceStringArray = []; // Create empty array to push prices to

  // Loop through prices array and get text from each element in array and then push to empty array
  for (let i = 0; i < prices.length; i++) {
    let pricesString = await prices[i].getText(); // Get text from each element in array
    priceStringArray.push(pricesString); // Push price to pricesStringArray (empty array set-up above)
  }
  console.log(`These are the PRICES >> ${priceStringArray}`);

  // Convert String to Number
  const priceNumberArray = priceStringArray.map((el) => +el.replace('$', '')); // Map through pricesStringArray and eliminate $ sign so we can convert to a number. Just need to put + sign in front which will convert string to a number
  console.log(`Price Number array = ${priceNumberArray}`);

  // Assert if ALL prices are valid. Check to see if any prices are less than or equal to 0 (<= 0)
  const invalidPriceArray = priceNumberArray.filter((el) => el <= 0); // Filter priceNumberArray to return an array for any values that are less than or equal to 0.
  chai.expect(invalidPriceArray.length).to.equal(0); // If everything is working correctly we should NOT have any length in the invalidPriceArray and if we do then it will show as a FAILED test
});

//? Tables.Feature
Then(/^Check number of rows and columns$/, async function () {
  const tableRowsCount = await $$(`table#table1 > tbody > tr`).length;
  console.log(`table rows count = ${tableRowsCount}`);
  chai.expect(tableRowsCount).to.equal(4);

  const columnCount = await $$(`table#table1 > thead > tr > th`).length;
  console.log(`column count = ${columnCount}`);
  chai.expect(columnCount).to.equal(6);

  // Get whole table data
  //*[@id="table1"]/tbody/tr[1]/td[4]
  const arr = [];
  for (let i = 1; i <= tableRowsCount; i++) {
    let obj = {};
    for (let j = 1; j <= columnCount; j++) {
      const cellValue = await $(
        `//table[@id="table1"]/tbody/tr[${i}]/td[${j}]`
      ).getText();
      if (j === 1) obj.lastName = cellValue;
      if (j === 2) obj.firstName = cellValue;
      if (j === 3) obj.email = cellValue;
      if (j === 4) obj.due = cellValue;
      if (j === 5) obj.website = cellValue;
    }
    arr.push(obj);
  }
  console.log(`The array is ${JSON.stringify(arr)}`);
});

// Get single row based on condition
Then(/^Get single row based on a condition$/, async function () {
  const tableRowsCount = await $$(`table#table1 > tbody > tr`).length; // Create variable to get # of rows in table
  const columnCount = (await $$(`table#table1 > thead > tr > th`).length) - 1; // Create variable to get # of columns in table less the Action column
  const arr = []; // Create an empty array to push to

  // Loop through rows under the First Name column which is column #2 and look for name of Jason
  for (let i = 1; i <= tableRowsCount; i++) {
    const firstNameCondition = 'Jason';
    const cellValue = await $(
      `//table[@id="table1"]/tbody/tr[${i}]/td[2]`
    ).getText();

    // If rows under First Name column being looped over equal Jason then create an empty object of which we will create key:value pairs for the entire row of the row having first name of Jason
    if (cellValue === firstNameCondition) {
      const obj = {}; // Create empty object to push key:value pairs to
      const rowValues = await $$(`//table[@id="table1"]/tbody/tr[${i}]/td`); // Create variable which will contain the entire row for which contains the firstName of Jason
      console.log(
        `ROW VALUES TO LOOP OVER ARE >>> ${JSON.stringify(rowValues)}`
      );

      // Loop over row containing First Name of Jason and depending on what column it is create the key:value pair to push to the object
      for (let j = 1; j < columnCount; j++) {
        const text = await rowValues[j].getText(); // Get the text from each column in the row containing the First Name of Jason
        console.log(`Row values are >>>>${text}`);
        if (j === 1) obj.firstName = text;
        if (j === 2) obj.lastName = text;
        if (j === 3) obj.email = text;
        if (j === 4) obj.due = text;
        if (j === 5) obj.website = text;
      }
      arr.push(obj); // Push object to empty array created above
    }
  }
  console.log(`This is the final row >> ${JSON.stringify(arr)}`); // console.log in Cucumber WDIO doesn't print out objects unless you stringify them
});

Then(/^Get single due amount column$/, async function () {
  const tableRowsCount = await $$(`table#table1 > tbody > tr`).length; // Create variable to get # of rows in table
  const arr = [];
  for (let i = 1; i <= tableRowsCount; i++) {
    const column = await $(
      `table#table1 tbody tr:nth-child(${i}) td:nth-child(4)`
    );
    const rowValue = await column.getText();
    const convertedStringToNumber = +parseInt(rowValue.replace('$', ''));
    arr.push(convertedStringToNumber);
  }
  console.log(`This is the due amounts >>> ${arr}`);
});

Then(/^Get first names of people who owe more than \$50$/, async function () {
  const tableRowsCount = await $$(`table#table1 > tbody > tr`).length; // Create variable to get # of rows in table
  const arr = [];
  for (let i = 1; i <= tableRowsCount; i++) {
    const column = await $(
      `table#table1 tbody tr:nth-child(${i}) td:nth-child(4)`
    ).getText();
    const convertTextToNumber = parseInt(column.replace('$', ''));
    if (convertTextToNumber > 50) {
      const firstName = await $(
        `table#table1 tbody tr:nth-child(${i}) td:nth-child(2)`
      ).getText();
      arr.push(firstName);
    }
  }
  console.log(`This is the final first name array of people who owe more than $50 >>> ${JSON.stringify(arr)}`); // Prints ["Frank", "Jason"]
  console.log(`This is the final first name array of people who owe more than $50 >>> ${arr}`); // Prints Frank, Jason
});
