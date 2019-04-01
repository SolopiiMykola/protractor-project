import Base from '../utils/Base';

class Login extends Base {
  get url() { return `${this.baseUrl}/login`; }
  get selector() { return element(by.css('span.logo-text')); }

  get userInput() { return element(by.name('username')); }
  get passInput() { return element(by.name('password')); }
  get loginButton() { return element(by.buttonText('Log In')); }
  get logoutButton() { return element(by.buttonText('Log Out')); }
  get selectTransaction() { return element(by.linkText('Process Transaction')); }
  get selectDashboard() { return element(by.css('i.icon.icon-ic-menu-dashboard-normal')); }
  get errorMessage() { return element(by.css('div[ng-show="vm.wrongLoginData"]')); }
  get emptyMassage() { return element(by.css('.md-input-message-animation')); }
}

export default Login;
