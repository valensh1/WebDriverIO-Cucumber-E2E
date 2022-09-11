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

}
export default new HomePage();
