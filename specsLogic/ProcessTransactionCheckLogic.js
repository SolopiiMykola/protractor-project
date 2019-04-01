import SpecBaseLogic from '../utils/SpecLogicBase';
import { ProcessTransactionsCheck, Customers } from '../pages';
import { processTransactionCheckDataMock } from '../dataMock';

const createNewCustomer = Symbol('create new customer');
const createNewCheck = Symbol('create new card');
const createNewCustomerWithCheck = Symbol('create new customer with check');

class ProcessTransactionCheckLogic extends SpecBaseLogic {
  constructor() {
    super();
    this.page = new ProcessTransactionsCheck();
    this.customersPage = new Customers();
  }

  shouldBeVisible() {
    expect(this.page.isDisplayed()).toBe(true);
  }

  sendSavingWithTEL() {
    this.page.setChargeAction();
    this.page.fillFields(processTransactionCheckDataMock.successSavingWithTEL);
    this.page.clickProcessTransaction();
    this.page.waitUntilElementDisplayed(this.page.approvePopup);

    expect(this.page.isElementDisplayed(this.page.approvePopup)).toBe(true);
  }

  sendCheckingWithPPD() {
    this.page.setChargeAction();
    this.page.fillFields(processTransactionCheckDataMock.successCheckingWithPPD);
    this.page.setNewCustomer();
    this.page.clickProcessTransaction();
    this.page.waitUntilElementDisplayed(this.page.approvePopup);

    expect(this.page.isElementDisplayed(this.page.approvePopup)).toBe(true);
  }

  async sendDuplicateSavingWithCCD() {
    this.page.setChargeAction();
    this.page.fillFields(processTransactionCheckDataMock.successDuplicateSavingWithCCD);
    this.page.clickProcessTransaction();
    await this.page.waitUntilElementDisplayed(this.page.approvePopup);

    this.page.closePopup();
    this.page.setChargeAction();
    this.page.fillFields(processTransactionCheckDataMock.successDuplicateSavingWithCCD);
    this.page.clickProcessTransaction();
    this.page.waitUntilElementDisplayed(this.page.duplicatePopup);

    expect(this.page.isElementDisplayed(this.page.duplicatePopup)).toBe(true);
  }

  sendBillingCheckingWithPPD() {
    this.page.setRefundAction();
    this.page.fillFields(processTransactionCheckDataMock.successCheckingWithPPDAndBilling);
    this.page.setSameAsBillingInput();
    this.page.clickProcessTransaction();
    this.page.waitUntilElementDisplayed(this.page.approvePopup);

    expect(this.page.isElementDisplayed(this.page.approvePopup)).toBe(true);
  }

  sendRefundSavingWithCCD() {
    this.page.setRefundAction();
    this.page.fillFields(processTransactionCheckDataMock.successRefundSavingWithCCD);
    this.page.setNewCustomer();
    this.page.clickProcessTransaction();
    this.page.waitUntilElementDisplayed(this.page.approvePopup);

    expect(this.page.isElementDisplayed(this.page.approvePopup)).toBe(true);
  }

  sendRefundWithExistingCustomer() {
    const customersDataMock =
      processTransactionCheckDataMock.successRefundWithExistingCustomer.customersPage;
    const checkDataMock =
      processTransactionCheckDataMock.successRefundWithExistingCustomer.processTransactionCheck;

    this[createNewCustomerWithCheck](customersDataMock);

    browser.waitForAngular()
      .then(() => {
        this.page.get();
        this.page.setRefundAction();
        this.page.fillCustomerAutoComplete(customersDataMock.createCustomer.companyNameInput);
        this.page.fillAccountNumberAutoComplete();
        this.page.fillFields(checkDataMock);
        this.page.clickProcessTransaction();
        this.page.waitUntilElementDisplayed(this.page.approvePopup);

        expect(this.page.isElementDisplayed(this.page.approvePopup)).toBe(true);
      });
  }

  sendChargeWithExistingCustomer() {
    const customersDataMock =
      processTransactionCheckDataMock.successChargeWithExistingCustomer.customersPage;
    const checkDataMock =
      processTransactionCheckDataMock.successChargeWithExistingCustomer.processTransactionCheck;

    this[createNewCustomerWithCheck](customersDataMock);

    this.page.get();
    this.page.setChargeAction();
    this.page.fillCustomerAutoComplete(customersDataMock.createCustomer.companyNameInput);
    this.page.fillAccountNumberAutoComplete();
    this.page.fillFields(checkDataMock);
    this.page.setEditCustomer();
    this.page.clickProcessTransaction();
    this.page.waitUntilElementDisplayed(this.page.approvePopup);

    expect(this.page.isElementDisplayed(this.page.approvePopup)).toBe(true);
  }

  sendRecurringChargeWithExistingCustomer() {
    const customersDataMock =
      processTransactionCheckDataMock.successChargeRecurringWithExistingCustomer.customersPage;
    const checkDataMock =
      processTransactionCheckDataMock.successChargeRecurringWithExistingCustomer
      .processTransactionCheck;

    this[createNewCustomerWithCheck](customersDataMock);
    this.page.get();
    this.page.setChargeAction();
    this.page.fillCustomerAutoComplete(customersDataMock.createCustomer.companyNameInput);
    this.page.fillAccountNumberAutoComplete();
    this.page.fillFields(checkDataMock);
    this.page.clickProcessTransaction();
    this.page.waitUntilElementDisplayed(this.page.approvePopup);

    expect(this.page.isElementDisplayed(this.page.approvePopup)).toBe(true);
  }

  async sendErrorRecurringDuplicateWithExistingCustomer() {
    const customersDataMock =
      processTransactionCheckDataMock.errorChargeRecurringWithExistingCustomer.customersPage;
    const checkDataMock =
      processTransactionCheckDataMock.errorChargeRecurringWithExistingCustomer
      .processTransactionCheck;

    this[createNewCustomer](customersDataMock);
    this.page.get();
    this.page.setChargeAction();
    this.page.fillCustomerAutoComplete(customersDataMock.createCustomer.companyNameInput);
    this.page.fillFields(checkDataMock);
    this.page.setEditCustomer();
    this.page.clickProcessTransaction();
    await this.page.waitUntilElementDisplayed(this.page.approvePopup);

    this.page.closePopup();
    this.page.setChargeAction();
    this.page.fillCustomerAutoComplete(customersDataMock.createCustomer.companyNameInput);
    this.page.fillAccountNumberAutoComplete();
    this.page.fillFields(checkDataMock);
    this.page.clickProcessTransaction();
    this.page.waitUntilElementDisplayed(this.page.approvePopup);

    expect(this.page.isElementDisplayed(this.page.approvePopup)).toBe(true);
  }

  [createNewCustomerWithCheck](customersDataMock) {
    this[createNewCustomer](customersDataMock);
    return this[createNewCheck](customersDataMock);
  }

  [createNewCustomer](customersDataMock) {
    this.customersPage.get();
    this.customersPage.clickCreateCustomer();
    this.customersPage.fillFields({ createCustomer: customersDataMock.createCustomer });
    this.customersPage.clickCompleteCreateCustomer();
  }

  [createNewCheck](customersDataMock) {
    this.customersPage.selectCreatedCustomer(customersDataMock.createCustomer.companyNameInput);
    this.customersPage.selectWalletTab();
    this.customersPage.clickAddPaymentMethod();
    this.customersPage.selectCheckTab();
    this.customersPage.fillFields({
      addPaymentMethodCheck: customersDataMock.addPaymentMethodCheck,
    });
    return this.customersPage.clickAddCheck();
  }
}

export default ProcessTransactionCheckLogic;
