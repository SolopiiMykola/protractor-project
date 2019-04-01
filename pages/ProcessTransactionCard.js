import Base from '../utils/Base';

const APPROVED_POPUP_TEXT = 'Approved';
const DECLINED_POPUP_TEXT = 'Declined!';
const ERROR_POPUP_TEXT = 'Error';

const dateObj = new Date();
const day = dateObj.getUTCDate();
const nextDay = day + 1;

const fillCardGeneralFields = Symbol('fill check tab general fields');
const fillCardBillingInfoFields = Symbol('fill check tab billing info fields');
const fillCardShippingInfoFields = Symbol('fill check tab shipping info fields');
const fillStateField = Symbol('fill state in billing info fields');
const fillShippingStateField = Symbol('fill state in shipping info fields');
const selectCustomer = Symbol('select customer');
const selectAction = Symbol('select action');
const selectCard = Symbol('select card');
const fillCardExpireMonthField = Symbol('fill card expire month field');
const fillCardExpireYearField = Symbol('fill card expire year field');
const checkCreateCustomer = Symbol('check create customer');
const checkCreateCustomerReceipt = Symbol('check create customer receipt');
const checkEditCustomer = Symbol('check edit customer');
const fillCardRecurringInfoFields = Symbol('fill check tab recurring info fields');

class ProcessTransactionCard extends Base {
  get url() { return `${this.baseUrl}/transaction?tab=card`; }
  get selector() { return $('div[name="cardForm"]'); }

  get autoCompleteItem() {
    return element(by
      .css('md-virtual-repeat-container:not(.ng-hide) [md-extra-name="$mdAutocompleteCtrl.itemName"]'));
  }

  get checkBillingBlock() { return element(by.model('cardBillingInfoShow')); }
  get checkRecurringBlock() { return element(by.css('form[name=creditCardForm] [ng-model=cardRecurringInfoShow]')); }

  get paymentTitle() { return element(by.model('cardForm.recurringInfo.name')); }

  get startingFromDate() { return element(by.css('form[name=creditCardForm] input[name=start_date]')); }
  getElementStartDate(date) {
    const selector = 'form[name=creditCardForm] .moment-picker-specific-views tr td';
    return element(by.cssContainingText(selector, date));
  }

  get everyPeriodInput() { return element(by.css('md-select[ng-model="cardForm.recurringInfo.schedule"]')); }
  everyPeriodSelect(period) {
    return element(by.cssContainingText('._md-active md-option ._md-text', period));
  }

  get repeatTimesRadio() { return element(by.css('form[name=creditCardForm] [value=remTransNumber]')); }
  get repeatTimesInput() { return element(by.css('form[name=creditCardForm] input[name=repeat_amount]')); }
  get repeatOngoingRadio() { return element(by.css('form[name=creditCardForm] [value=recurringOngoing]')); }

  get billFirstTransactionToday() { return element(by.model('cardForm.recurringInfo.billFirstToday')); }

  get selectShippingBlock() { return element(by.model('cardShippingInfoShow')); }

  get processButton() { return $('button[ng-click="processCard()"]'); }

  get approvePopup() { return element(by.cssContainingText('.transactions-dialog-header h1', APPROVED_POPUP_TEXT)); }
  get declinedPopup() { return element(by.cssContainingText('.transactions-dialog-header h1', DECLINED_POPUP_TEXT)); }
  get errorPopup() { return element(by.cssContainingText('.transaction-error-header h1', ERROR_POPUP_TEXT)); }

  get completeButton() { return element(by.buttonText('Complete')); }
  get tryAgainButton() { return element(by.buttonText('Try Again')); }
  get okButton() { return element(by.buttonText('Ok')); }
  get cancelButton() { return element(by.buttonText('Cancel')); }

  get checkShippingBlock() { return element(by.model('cardShippingInfoShow')); }

  get customerInput() { return element(by.css('form[name=creditCardForm] input[name=customersSearch]')); }

  get generalInfo() {
    return {
      customerSelectInput: element(by.name('customersSearch')),
      customerAutocompleteItem: $('md-virtual-repeat-container:not(.ng-hide) [md-extra-name="$mdAutocompleteCtrl.itemName"]'),
      actions: {
        chargeButton: $('.layout-align-space-around-center .item-btn-charge'),
        authorizeButton: $('.layout-align-space-around-center .item-btn-authorize'),
        postauthorizeButton: $('.layout-align-space-around-center .item-btn-postauthorize'),
        refundButton: $('.layout-align-space-around-center .item-btn-refund'),
      },
      cardNameInput: element(by.name('cardName')),
      cardNumberInput: element(by.name('cardsSearch')),
      cardAutocompleteItem: $('md-virtual-repeat-container:not(.ng-hide) [md-extra-name="$mdAutocompleteCtrl.itemName"]'),
      cardCvvInput: element(by.name('CardCvc')),
      cardExpireMonth: {
        dropdown: element(by.name('expiry_month')),
        select: month => element(by.css(`md-option[value="${month}"]`)),
      },
      cardExpireYear: {
        dropdown: element(by.name('expiry_year')),
        select: year => element(by.css(`md-option[value="${year}"]`)),
      },
      authNumberInput: element(by.name('auth_number')),
      amountInput: element(by.model('cardForm.amount')),
      taxInput: $('input[aria-label="TaxCurrency"]'),
      surchargeInput: $('input[aria-label="SurchargeCurrency"]'),
      avsStreetInput: element(by.name('billing_street')),
      avsZipInput: element(by.name('billing_zip')),
      poNumberInput: element(by.name('po_number')),
      companyNameInput: element(by.name('company_name')),
      invoiceNumber: element(by.name('invoice_number')),
      descriptionInput: element(by.model('cardForm.generalInfo.description')),
      emailInput: element(by.name('email')),
      // appeares after 'companyNameInput' has some text
      createCustomerCheckbox: element(by.css('md-checkbox[aria-label="Create a new customer"]')),
      createCustomerReceiptCheckbox: element(by.css('md-checkbox[aria-label="Customer receipt"]')),
      // appeares after 'cardNumberInput' and 'avsStreetInput' has some text
      editCustomerCheckbox: element(by.css('md-checkbox[aria-label="Edit current customer"]')),
    };
  }

  get billingInfo() {
    return {
      firstName: element(by.name('first_name')),
      lastName: element(by.name('last_name')),
      street: element(by.name('street')),
      street2: element(by.name('street2')),
      city: element(by.name('city')),
      zipCode: element(by.name('zip_code')),
      country: element(by.name('country')),
      state: element(by.name('billingStatesSearch')),
      phone: element(by.name('billing_phone')),
    };
  }

  get shippingInfo() {
    return {
      sameBillingInput: element(by.model('cardShippingInfoShow')),
      sameBillingTrue: element(by.model('sameAsBilling')),
      firstName: element(by.css('form[name=creditCardForm] input[name=first_name2]')),
      lastName: element(by.css('form[name=creditCardForm] input[name=last_name2]')),
      street: element(by.css('form[name=creditCardForm] input[name=street3]')),
      street2: element(by.css('form[name=creditCardForm] input[name=street4]')),
      city: element(by.css('form[name=creditCardForm] input[name=city2]')),
      zipCode: element(by.css('form[name=creditCardForm] input[name=zip_code2]')),
      state: element(by.css('form[name=creditCardForm] input[name=shippingStatesSearch]')),
      phone: element(by.css('form[name=creditCardForm] input[name=card_shipping_phone]')),
    };
  }

  clickProcess() {
    this.processButton.click();
  }

  selectBillingBlock() {
    this.checkBillingBlock.click();
  }

  clickProcessBrowserExecute() {
    // Need to scroll to 'processButton', but than Protractor's '.click()' do not work here
    browser.executeScript('arguments[0].scrollIntoView()', this.processButton.getWebElement());
    browser.executeScript('arguments[0].click()', this.processButton.getWebElement());
  }

  clickComplete() {
    this.completeButton.click();
  }

  clickTryAgainButton() {
    this.tryAgainButton.click();
  }

  clickOkButton() {
    this.okButton.click();
  }

  clickCancelButton() {
    this.cancelButton.click();
  }

  clickOnAutoCompleteItem() {
    this.waitUntilElementDisplayed(this.autoCompleteItem);
    this.autoCompleteItem.click();
  }

  clickSwitchShippingInfo() {
    this.selectShippingBlock.click();
  }

  clickSameAsBilling() {
    this.shippingInfo.sameBillingTrue.click();
  }

  setRepeatTimes(time) {
    this.repeatTimesRadio.click();
    this.repeatTimesInput.sendKeys(time);
  }

  setStartBillingDate() {
    browser.executeScript('arguments[0].scrollIntoView()', this.startingFromDate.getWebElement());
    browser.executeScript('arguments[0].click()', this.startingFromDate.getWebElement());
    browser.executeScript('arguments[0].scrollIntoView()', this.startingFromDate.getWebElement());
    const selectedTD = this.getElementStartDate(nextDay);
    browser.executeScript('arguments[0].scrollIntoView()', selectedTD.getWebElement());
    browser.executeScript('arguments[0].click()', selectedTD.getWebElement());
  }

  setFirstBillingToday() {
    browser.executeScript('arguments[0].scrollIntoView()', this.billFirstTransactionToday.getWebElement());
    browser.executeScript('arguments[0].click()', this.billFirstTransactionToday.getWebElement());
  }

  setOngoing() {
    browser.executeScript('arguments[0].scrollIntoView()', this.repeatOngoingRadio.getWebElement());
    this.repeatOngoingRadio.click();
  }

  fillStateAutoComplete(state) {
    this.billingInfo.state.sendKeys(state);
    this.clickOnAutoCompleteItem();
  }

  fillSippingStateAutoComplete(state) {
    this.shippingInfo.state.sendKeys(state);
    this.clickOnAutoCompleteItem();
  }

  fillCustomerAutoComplete(companyName) {
    this.customerInput.sendKeys(companyName);
    this.clickOnAutoCompleteItem();
  }


  fillFields(fields) {
    if (fields.generalInfo) this[fillCardGeneralFields](fields.generalInfo);
    if (fields.billingInfo) this[fillCardBillingInfoFields](fields.billingInfo);
    if (fields.shippingInfo) this[fillCardShippingInfoFields](fields.shippingInfo);
    if (fields.recurringInfo) this[fillCardRecurringInfoFields](fields.recurringInfo);
  }

  [fillCardGeneralFields](generalInfo) {
    Object.keys(generalInfo).forEach((key) => {
      if (key === 'customerSelectInput') {
        this[selectCustomer](generalInfo.customerSelectInput);
        return;
      }

      if (key === 'actionSelect') {
        this[selectAction](generalInfo.actionSelect);
        return;
      }

      if (key === 'cardNumberInput' && generalInfo.cardNumberInput === 'autocomplete') {
        this[selectCard]();
        return;
      }

      if (key === 'cardExpireMonth') {
        this[fillCardExpireMonthField](generalInfo.cardExpireMonth);
        return;
      }

      if (key === 'cardExpireYear') {
        this[fillCardExpireYearField](generalInfo.cardExpireYear);
        return;
      }

      if (key === 'createCustomerReceiptCheckbox') {
        this[checkCreateCustomerReceipt]();
        return;
      }

      if (key === 'createCustomerCheckbox') {
        this[checkCreateCustomer]();
        return;
      }

      if (key === 'editCustomerCheckbox') {
        this[checkEditCustomer]();
        return;
      }

      this.inputField.apply(this, [generalInfo, 'generalInfo'])(key);
    });
  }

  [fillCardBillingInfoFields](billingInfo) {
    Object.keys(billingInfo).forEach((key) => {
      if (key === 'checkBillingBlock') {
        this.selectBillingBlock(billingInfo.checkBillingBlock);
        return;
      }
      if (key === 'state') {
        this[fillStateField](billingInfo.state);
        return;
      }
      this.inputField.apply(this, [billingInfo, 'billingInfo'])(key);
    });
  }

  [fillCardShippingInfoFields](shippingInfo) {
    Object.keys(shippingInfo).forEach((key) => {
      if (key === 'checkShippingBlock') {
        this.clickSwitchShippingInfo(shippingInfo.selectShippingBlock);
        return;
      }
      if (key === 'sameBillingInput') {
        this.clickSameAsBilling(shippingInfo.sameBillingInput);
        return;
      }
      if (key === 'state') {
        this[fillShippingStateField](shippingInfo.state);
        return;
      }
      this.inputField.apply(this, [shippingInfo, 'shippingInfo'])(key);
    });
  }

  [fillCardRecurringInfoFields](recurringInfo) {
    browser.executeScript('arguments[0].scrollIntoView()', this.checkRecurringBlock.getWebElement());
    browser.executeScript('arguments[0].click()', this.checkRecurringBlock.getWebElement());

    browser.executeScript('arguments[0].scrollIntoView()', this.paymentTitle.getWebElement());
    this.paymentTitle.sendKeys(recurringInfo.paymentTitle);
    this.setStartBillingDate(recurringInfo.startingFromDate);
    browser.executeScript('arguments[0].click()', this.everyPeriodInput.getWebElement());
    this.everyPeriodSelect(recurringInfo.everyPeriodValue).click();

    if (recurringInfo.repeatTimes) this.setRepeatTimes(recurringInfo.repeatTimes);
    if (recurringInfo.ongoing) this.setOngoing();

    if (recurringInfo.billFirstTransaction) this.setFirstBillingToday();
  }

  [selectCustomer](customerName) {
    this.generalInfo.customerSelectInput.sendKeys(customerName);
    this.waitUntilElementDisplayed(this.generalInfo.customerAutocompleteItem);
    browser.executeScript('arguments[0].scrollIntoView()', this.generalInfo.customerAutocompleteItem);
    browser.executeScript('arguments[0].click()', this.generalInfo.customerAutocompleteItem.getWebElement());
  }

  [selectAction](action) {
    switch (action) {
      case 'charge':
        this.generalInfo.actions.chargeButton.click();
        break;
      case 'authorize':
        this.generalInfo.actions.authorizeButton.click();
        break;
      case 'postauthorize':
        this.generalInfo.actions.postauthorizeButton.click();
        break;
      case 'refund':
        this.generalInfo.actions.refundButton.click();
        break;
      default:
        this.generalInfo.actions.chargeButton.click();
    }
  }

  [selectCard]() {
    this.generalInfo.cardNumberInput.click();
    this.waitUntilElementDisplayed(this.generalInfo.cardAutocompleteItem);
    this.generalInfo.cardAutocompleteItem.click();
  }

  [fillCardExpireMonthField](month) {
    this.generalInfo.cardExpireMonth.dropdown.click();
    this.generalInfo.cardExpireMonth.select(month).click();
  }

  [fillCardExpireYearField](year) {
    this.generalInfo.cardExpireYear.dropdown.click();
    this.generalInfo.cardExpireYear.select(year).click();
  }

  [checkCreateCustomerReceipt]() {
    this.generalInfo.createCustomerReceiptCheckbox.click();
  }

  [checkCreateCustomer]() {
    this.generalInfo.createCustomerCheckbox.click();
  }

  [checkEditCustomer]() {
    this.generalInfo.editCustomerCheckbox.click();
  }

  [fillStateField](state) {
    this.fillStateAutoComplete(state);
  }

  [fillShippingStateField](state) {
    this.fillSippingStateAutoComplete(state);
  }
}

export default ProcessTransactionCard;
