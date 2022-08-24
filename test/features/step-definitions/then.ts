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
Then(/^Check number of tables and rows$/, async function () {
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
