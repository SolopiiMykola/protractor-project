import Base from '../utils/Base';

const WALLET_TAB_TEXT = 'WALLET';
const CHECK_TAB_TEXT = 'check';
const CARD_TAB_TEXT = 'card';

const fillCreateCustomerFields = Symbol('fill create customer fields');
const fillBillingInfoFields = Symbol('fill check tab billing info fields');
const fillCountryField = Symbol('fill country in billing info fields');
const fillStateField = Symbol('fill state in billing info fields');
const fillShippingInfoFields = Symbol('fill check tab shipping info fields');
const fillAddPaymentMethodCardFields = Symbol('fill add payment method card fields');
const fillAddPaymentMethodCheckFields = Symbol('fill add payment method check fields');
const fillCardExpireMonthField = Symbol('fill card expire month field');
const fillCardExpireYearField = Symbol('fill card expire year field');
const fillCheckTransactionTypeInput = Symbol('fill transaction type select');
const fillCheckAccountTypeInput = Symbol('fill account type select');

class Customers extends Base {
  get url() { return `${this.baseUrl}/customer/list`; }

  // get selector() { return $('.customers-list'); }

  get selector() { return element(by.id('contentWrapper')); }

  get autoCompleteItem() {
    return element(by
      .css('md-virtual-repeat-container:not(.ng-hide) ' +
        '[md-extra-name="$mdAutocompleteCtrl.itemName"]'));
  }

  get toastPopup() {
    return element(by.css('md-toast .md-toast-wrapper .md-toast-body .md-toast-text.w-350.ml-15'));
  }
  get selectBillingBlock() { return element(by.model('billingInfoShow')); }
  get selectShippingBlock() { return element(by.model('shippingInfoShow')); }

  get hideFiltersButton() { return $('a[aria-label="Hide filters"]'); }
  get createNewButton() { return $('a[aria-label="Create new"]'); }
  get exportButton() { return $('a[aria-label="Export"]'); }

  get accountTypeInput() { return element(by.name('account_type')); }
  accountTypeSelect(type) { return element(by.css(`md-option[value="${type}"]`)); }

  get transactionTypeInput() { return element(by.name('transaction_type')); }
  transactionTypeSelect(type) { return element(by.css(`md-option[value="${type}"]`)); }

  get createCustomer() {
    return {
      popup: $('form[name="customerForm"]'),
      companyNameInput: $('input[aria-label="Company Name"]'),
      emailInput: $('input[aria-label="Email"]'),
      cancelButton: $('button[aria-label="Cancel"]'),
      completeButton: $('button[aria-label="Complete"]'),
    };
  }

  get addBillingInfo() {
    return {
      firstName: element(by.name('first_name2')),
      lastName: element(by.name('last_name2')),
      street: element(by.name('street')),
      street2: element(by.name('street2')),
      city: element(by.name('city')),
      zipCode: element(by.name('zip_code')),
      country: {
        dropdown: element(by.name('country2')),
        select: country => element(by.cssContainingText('md-content._md.md-default-theme',
          country)),
      },
      state: element(by.name('billingStatesSearch')),
      phone: element(by.name('billing_phone1')),
    };
  }

  get addShippingInfo() {
    return {
      firstName: element(by.name('first_name3')),
      lastName: element(by.name('last_name3')),
      street: element(by.name('street3')),
      street2: element(by.name('street4')),
      city: element(by.name('city')),
      zipCode: element(by.name('zip_code2')),
      country: element(by.name('country')),
      phone: element(by.name('billing_phone2')),
    };
  }

  get addPaymentMethod() {
    return {
      popup: $('div.create-customer-header'),
      cardTab: element(by.cssContainingText('md-tab-item span', CARD_TAB_TEXT)),
      checkTab: element(by.cssContainingText('md-tab-item span', CHECK_TAB_TEXT)),
      addCardButton: $('button[ng-click="sendCardForm()"]'),
      addCheckButton: $('button[ng-click="sendCheckForm()"]'),
      cancelButton: $('button[ng-click="c()"]'),
    };
  }

  get addPaymentMethodCard() {
    return {
      cardNameInput: element(by.name('card_name')),
      cardNumberInput: element(by.name('card_number')),
      cardExpireMonth: {
        dropdown: element(by.name('expiry_month')),
        select: month => element(by.css(`md-option[ng-value="${month}"]`)),
      },
      cardExpireYear: {
        dropdown: element(by.name('expiry_year')),
        select: year => element(by.css(`md-option[ng-value="${year}"]`)),
      },
      avsStreetInput: element(by.name('card_address')),
      avsZipInput: element(by.name('cardZip')),
    };
  }

  get addPaymentMethodCheck() {
    return {
      checkNameInput: element(by.css('form[name=customerAddCheckForm] input[name=check_name]')),
      accountTypeInput: element(by.css('form[name=customerAddCheckForm] input[name=first_name]')),
      transactionTypeInput: element(by.css('form[name=customerAddCheckForm] input[name=first_name]')),
      routingNumberInput: element(by.css('form[name=customerAddCheckForm] input[name=routingNumber]')),
      accountNumberInput: element(by.css('form[name=customerAddCheckForm] input[name=accountNumber]')),
      avsStreetInput: element(by.css('form[name=customerAddCheckForm] input[name=address]')),
      avsZipInput: element(by.css('form[name=customerAddCheckForm] input[name=zip]')),
    };
  }

  get customersList() {
    return {
      createdCustomerItem: companyName => element(by.cssContainingText('.customer-item',
        companyName)),
      walletTab: {
        tab: element(by.cssContainingText('md-tab-item span', WALLET_TAB_TEXT)),
        addButton: $('button[aria-label="Add"]'),
      },
    };
  }

  fillFields({ createCustomer, addPaymentMethodCard, addPaymentMethodCheck, addBillingInfo,
    addShippingInfo }) {
    if (createCustomer) this[fillCreateCustomerFields](createCustomer);
    if (addBillingInfo) this[fillBillingInfoFields](addBillingInfo);
    if (addShippingInfo) this[fillShippingInfoFields](addShippingInfo);
    if (addPaymentMethodCard) this[fillAddPaymentMethodCardFields](addPaymentMethodCard);
    if (addPaymentMethodCheck) this[fillAddPaymentMethodCheckFields](addPaymentMethodCheck);
  }

  [fillCreateCustomerFields](createCustomer) {
    Object.keys(createCustomer).forEach(
      this.inputField.apply(this, [createCustomer, 'createCustomer']),
    );
  }

  [fillBillingInfoFields](addBillingInfo) {
    Object.keys(addBillingInfo).forEach((key) => {
      if (key === 'checkBillingBlock') {
        this.clickSwitchBillingInfo(addBillingInfo.selectBillingBlock);
        return;
      }
      if (key === 'country') {
        this[fillCountryField](addBillingInfo.country);
        return;
      }
      if (key === 'state') {
        this[fillStateField](addBillingInfo.state);
        return;
      }
      this.inputField.apply(this, [addBillingInfo, 'addBillingInfo'])(key);
    });
  }

  [fillShippingInfoFields](addShippingInfo) {
    Object.keys(addShippingInfo).forEach((key) => {
      if (key === 'checkShippingBlock') {
        this.clickSwitchShippingInfo(addShippingInfo.selectShippingBlock);
        return;
      }
      this.inputField.apply(this, [addShippingInfo, 'addShippingInfo'])(key);
    });
  }

  [fillAddPaymentMethodCardFields](addPaymentMethodCard) {
    Object.keys(addPaymentMethodCard).forEach((key) => {
      if (key === 'cardExpireMonth') {
        this[fillCardExpireMonthField](addPaymentMethodCard.cardExpireMonth);
        return;
      }

      if (key === 'cardExpireYear') {
        this[fillCardExpireYearField](addPaymentMethodCard.cardExpireYear);
        return;
      }

      this.inputField.apply(this, [addPaymentMethodCard, 'addPaymentMethodCard'])(key);
    });
  }

  [fillAddPaymentMethodCheckFields](addPaymentMethodCheck) {
    Object.keys(addPaymentMethodCheck).forEach((key) => {
      if (key === 'accountTypeInput') {
        this[fillCheckAccountTypeInput](addPaymentMethodCheck[key]);
        return;
      }

      if (key === 'transactionTypeInput') {
        this[fillCheckTransactionTypeInput](addPaymentMethodCheck[key]);
        return;
      }

      this.inputField.apply(this, [addPaymentMethodCheck, 'addPaymentMethodCheck'])(key);
    });
  }

  [fillCardExpireMonthField](month) {
    this.addPaymentMethodCard.cardExpireMonth.dropdown.click();
    this.addPaymentMethodCard.cardExpireMonth.select(month).click();
  }

  [fillCardExpireYearField](year) {
    this.addPaymentMethodCard.cardExpireYear.dropdown.click();
    this.addPaymentMethodCard.cardExpireYear.select(year).click();
  }

  [fillCheckTransactionTypeInput](type) {
    this.transactionTypeInput.click();
    this.transactionTypeSelect(type).click();
  }

  [fillCheckAccountTypeInput](type) {
    this.accountTypeInput.click();
    this.accountTypeSelect(type).click();
  }

  [fillCountryField](country) {
    this.clickOnAutoCompleteItem();
    this.addBillingInfo.country.dropdown.click();
    this.addBillingInfo.country.select(country).click();
  }

  [fillStateField](state) {
    this.fillStateAutoComplete(state);
  }

  clickCreateCustomer() {
    this.createNewButton.click();
  }

  fillCompanyName(companyName) {
    this.createCustomer.companyNameInput.sendKeys(companyName);
  }

  clickSwitchBillingInfo() {
    this.selectBillingBlock.click();
  }

  clickSwitchShippingInfo() {
    this.selectShippingBlock.click();
  }

  clickOnAutoCompleteItem() {
    this.waitUntilElementDisplayed(this.autoCompleteItem);
    this.autoCompleteItem.click();
  }

  fillStateAutoComplete(state) {
    this.addBillingInfo.state.sendKeys(state);
    this.clickOnAutoCompleteItem();
  }

  clickCompleteCreateCustomer() {
    this.createCustomer.completeButton.click();
  }

  selectCreatedCustomer(companyName) {
    this.customersList.createdCustomerItem(companyName).click();
  }

  selectWalletTab() {
    this.customersList.walletTab.tab.click();
  }

  clickAddPaymentMethod() {
    this.customersList.walletTab.addButton.click();
  }

  selectCardTab() {
    this.addPaymentMethod.cardTab.click();
  }

  selectCheckTab() {
    this.addPaymentMethod.checkTab.click();
  }

  clickAddCard() {
    this.addPaymentMethod.addCardButton.click();
  }

  clickAddCheck() {
    this.addPaymentMethod.addCheckButton.click();
  }
}

export default Customers;
