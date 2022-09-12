import Page from './page';
import chai from 'chai';
import reporter from '../helper/reporter';

class HomePage extends Page {
  constructor() {
    super();
  }

  // Page Objects
  get userNameInputBox() {
    return $('#user-name');
  }

  get passwordInputBox() {
    return $('#password');
  }

  get loginBtn() {
    return $('#login-button');
  }

  // Page Actions
  async enterUserName(testid: string, userName: string) {
    if (!userName) throw Error(`Given username: ${userName} is not valid`);
    try {
      userName = userName.trim();
      await this.typeInto(await this.userNameInputBox, userName);
      reporter.addStep(
        testid,
        'info',
        `UserName: ${userName} entered successfully `
      );
    } catch (err) {
      err.message = `Error entering username: ${userName}, ${err.message}`;
      throw err;
    }
  }

  async enterPassword(testid: string, password: string) {
    if (!password) throw Error(`Given username is not valid`);
    try {
      password = password.trim();
      await this.typeInto(await this.passwordInputBox, password);
      reporter.addStep(testid, 'info', `password entered successfully `);
    } catch (err) {
      err.message = `Error entering password, ${err.message}`;
      throw err;
    }
  }

  async clickLoginBtn(testid: string) {
    try {
      await this.click(await this.loginBtn);
      reporter.addStep(testid, 'info', `Login button clicked `);
    } catch (err) {
      err.message = `Error clicking login button, ${err.message}`;
      throw err;
    }
  }

  async loginToSauseApp(testid: string, userName: string, password: string) {
    try {
      await this.enterUserName(testid, userName);
      await this.enterPassword(testid, password);
      await this.clickLoginBtn(testid);
    } catch (err) {
      throw err;
    }
  }
}
export default new HomePage();
