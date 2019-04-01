import config from '../configs/app';
import { autoLogin } from '../dataMock';

const EC = protractor.ExpectedConditions;

class Base {
  get baseUrl() { return config.baseUrl; }

  /**
   * This class property enables use of specific functions 'isDisplayed' and 'waitUntilDisplayed'
   * @type {ElementFinder}
   */
  get selector() { return undefined; }
  get waitUntilDisplayedTimeout() { return 1000; }
  get waitUntilElementDisplayedTimeout() { return 1000; }

  autoLogin() {
    browser.get(this.baseUrl);

    browser.executeScript((...args) => {
      const autoLoginInner = args[0];

      localStorage.setItem('lscache-user', JSON.stringify(autoLoginInner.user));
      localStorage.setItem('lscache-timeout', autoLoginInner.timeout);
      localStorage.setItem('lscache-userSettings', JSON.stringify(autoLoginInner.userSettings));
    }, autoLogin);
  }

  get() {
    browser.get(this.url);
    return this.waitUntilDisplayed();
  }

  checkSelectorExist() {
    if (this.selector === undefined) {
      throw new TypeError(
        `Class '${this.constructor.name}' ` +
        "extends 'Base' Object Class and have to implement abstract property 'selector' " +
        "when 'isDisplayed' or 'waitUntilDisplayed' are used",
      );
    }
  }

  inputField(dataMock, inputs) {
    return (key) => {
      browser.executeScript(this.scroll, this[inputs][key].getWebElement());
      this.waitUntilElementDisplayed(this[inputs][key]);
      this[inputs][key].sendKeys(dataMock[key]);
    };
  }

  scroll(elem) {
    elem.scrollIntoView();
  }

  /**
   * @returns Function which resolves to boolean
   */
  isDisplayed() {
    this.checkSelectorExist();

    return EC.visibilityOf(this.selector)();
  }

  /**
   * @returns Function which resolves to boolean
   */
  isNotDisplayed() {
    this.checkSelectorExist();

    return EC.invisibilityOf(this.selector)();
  }

  /**
   * Wait until this page is displayed.
   */
  waitUntilDisplayed() {
    this.checkSelectorExist();

    return browser.wait(
      () => this.isDisplayed(),
      this.waitUntilDisplayedTimeout,
      `Failed while waiting for "${this.selector.locator()}" of Page Object Class '${this.constructor.name}' to display.`,
    );
  }

  isElementDisplayed(el) {
    return EC.visibilityOf(el)();
  }

  isElementNotDisplayed(el) {
    return EC.invisibilityOf(el)();
  }

  waitUntilElementDisplayed(el) {
    return browser.wait(
      () => this.isElementDisplayed(el),
      this.waitUntilElementDisplayedTimeout,
      `Failed while waiting for "${el.locator()}" of Page Object Class '${this.constructor.name}' to display.`,
    );
  }

  inDom(el) {
    return EC.presenceOf(el);
  }

  notInDom(el) {
    return EC.stalenessOf(el);
  }

  isClickable(el) {
    return EC.elToBeClickable(el);
  }

  hasText(el, text) {
    return EC.textToBePresentInElement(el, text);
  }

  and(arrayOfFunctions) {
    return EC.and(arrayOfFunctions);
  }

  titleIs(title) {
    return EC.titleIs(title);
  }

  /**
   * wrap this.timeout. (ms) in t-shirt sizes
   */
  get timeout() {
    return {
      xs: 420,
      s: 1000,
      m: 2000,
      l: 5000,
      xl: 9000,
      xxl: 15000,
    };
  }
}

export default Base;
