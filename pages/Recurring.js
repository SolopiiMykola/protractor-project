import Base from '../utils/Base';

const DEACTIVE_CONFIRM_TEXT = 'Are you sure you want to deactivate recurring set?';

class Recurring extends Base {
  get url() {
    return `${this.baseUrl}/recurring`;
  }

  get selector() {
    return element(by.id('batchesTableContainer'));
  }

  get navigationTooggle() {
    return element(by.id('navigation-toggle'));
  }

  get recurringTab() {
    return element(by.css('.icon.icon-ic-refund-circle-actions'));
  }

  get viewButton() {
    return element.all(by.css('a[title="view"]'));
  }

  get recurringInfo() {
    return {
      paymentTitle: element(by.name('recurringName')),
    };
  }

  get paymentTitle() {
    return element(by.name('recurringName'));
  }

  get cardViewButton() {
    return element.all(by.css('.icon-eye'));
  }

  get toastNotification() {
    return element(by.css('md-toast .md-toast-wrapper .md-toast-body .md-toast-text'));
  }

  get turnOffButton() {
    return element.all(by.linkText('Turn Off'));
  }

  clickViewRecurringButton() {
    this.viewButton.get(0).click();
  }

  get okButton() { return element(by.buttonText('Ok')); }

  get inactiveTextPopup() {
    return element(by.cssContainingText('.confirm-dialog-content', DEACTIVE_CONFIRM_TEXT));
  }

  repeaterData(repeater) {
    return element.all(by.repeater(repeater));
  }

  clickCardViewButton() {
    browser.executeScript('arguments[0].scrollIntoView()', this.cardViewButton.get(1).getWebElement());
    browser.executeScript('arguments[0].click()', this.cardViewButton.get(1).getWebElement());
  }

  clickTurnOffButton() {
    this.turnOffButton.get(0).click();
  }

  clickOkButton() {
    this.okButton.click();
  }

  get expandedContent() {
    return element(by.css('.ab-expanded-content')).all(by.css('tr'));
  }
}

export default Recurring;
