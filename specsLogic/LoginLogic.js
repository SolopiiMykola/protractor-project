import SpecBaseLogic from '../utils/SpecLogicBase';
// import autoLogin from '../dataMock/autoLogin'

import { Login } from '../pages';

import { merchantUser } from '../dataMock';

const { username, password } = merchantUser;

class LoginLogic extends SpecBaseLogic {
  constructor() {
    super();
    this.page = new Login();
  }

  loginInvalidUser() {
    this.page.userInput.sendKeys('invalid_user');
    this.page.passInput.sendKeys('invalid_password');
    this.page.loginButton.click();
    expect(this.page.errorMessage.isDisplayed()).toBe(true);
  }

  loginEmptyUser() {
    this.page.userInput.sendKeys('');
    this.page.passInput.sendKeys('123456');
    expect(this.page.emptyMassage.isDisplayed()).toBe(true);
  }

  loginValidUser() {
    this.page.userInput.sendKeys(username);
    this.page.passInput.sendKeys(password);
    this.page.loginButton.click();
    this.page.waitUntilElementDisplayed(this.page.logoutButton);
    expect(this.page.isElementDisplayed(this.page.logoutButton)).toBe(true);
  }
}

export default LoginLogic;
