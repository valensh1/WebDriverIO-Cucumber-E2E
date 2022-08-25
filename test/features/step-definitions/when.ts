import { Given, When, Then } from '@wdio/cucumber-framework';

When(/^scroll down$/, async function () {
  await browser.execute(() => {
    window.scrollBy(0, window.innerHeight);
  });

  await browser.pause(3000);

  await browser.execute(() => {
    window.scrollBy(0, -window.innerHeight);
  });

  await browser.pause(3000);

  await browser.execute(() => {
    window.scrollTo(0, document.body.scrollHeight);
  });

  await browser.pause(3000);

  await browser.execute(() => {
    window.scrollTo(0, document.body.scrollTop);
  });

  await browser.pause(3000);
});
