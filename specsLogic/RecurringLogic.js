import SpecBaseLogic from '../utils/SpecLogicBase';
import { ProcessTransactionCard, Recurring, Customers, ProcessTransactionsCheck,
  ControlPanel } from '../pages';
import { recurringDataMock } from '../dataMock';

const createNewCustomer = Symbol('create new customer');
const createNewCard = Symbol('create new card');
const createNewCustomerWithCard = Symbol('create new customer with card');

const processTransactionCard = new ProcessTransactionCard();
const processTransactionCheck = new ProcessTransactionsCheck();
const controlPanel = new ControlPanel();

class RecurringLogic extends SpecBaseLogic {
  constructor() {
    super();
    this.page = new Recurring();
    this.customersPage = new Customers();
  }

  beforeEach() {
    processTransactionCard.get();
  }

  madeRecurringWithDiscoverCard() {
    const { madeRecurringWithDiscoverCard } = recurringDataMock;

    browser.waitForAngular()
      .then(() => {
        processTransactionCard.fillFields(madeRecurringWithDiscoverCard);
        processTransactionCard.clickProcess();
      });

    this.page.navigationTooggle.click();
    this.page.recurringTab.click();
    this.page.clickViewRecurringButton();
    const checkInputsValue = this.createInputsCheckerCard(madeRecurringWithDiscoverCard);
    browser.executeScript('arguments[0].scrollIntoView(true);'
    , this.page.paymentTitle);
    checkInputsValue('recurringInfo', [
      // 'paymentTitle',
    ]);
  }

  madeRecurringWithExistingCustomerAndAmex() {
    const customersDataMock =
      recurringDataMock.madeRecurringOngoingWithAmexAndCustomer
        .customersPage;
    const cardDataMock =
      recurringDataMock.madeRecurringOngoingWithAmexAndCustomer
        .processTransactionCardPage;

    this[createNewCustomerWithCard](customersDataMock);

    browser.waitForAngular()
      .then(() => {
        processTransactionCard.get();
        processTransactionCard.fillCustomerAutoComplete(customersDataMock.createCustomer
          .companyNameInput);
        processTransactionCard.fillFields(cardDataMock);
        processTransactionCard.clickProcessBrowserExecute();
        processTransactionCard.waitUntilElementDisplayed(processTransactionCard.approvePopup);
        expect(processTransactionCard.isElementDisplayed(processTransactionCard.approvePopup))
          .toBe(true);
        processTransactionCard.clickComplete();
      });

    this.page.navigationTooggle.click();
    this.page.recurringTab.click();
    this.page.clickViewRecurringButton();
    this.page.clickCardViewButton();
    // continue test
    // this.page.expandedContent.each((row, index) => {
    //   const rowElement = row.$$('td');
    //   expect(rowElement.count()).toBe(2);
    //   expect(rowElement.get(1).getAttribute('innerText')).toMatch(cardDataMock[index]);
    // });

    // const checkInputsValue = this.createInputsCheckerCard(cardDataMock);
    // browser.executeScript('arguments[0].scrollIntoView(true);'
    //   , this.page.paymentTitle);
    // checkInputsValue('recurringInfo', [
    //   'paymentTitle',
    // ]);
  }

  sendChargeCheckingTransaction() {
    const { successChargeRecurring } = recurringDataMock;
    processTransactionCheck.get();
    processTransactionCheck.setChargeAction();
    processTransactionCheck.fillFields(successChargeRecurring);
    processTransactionCheck.clickProcessTransaction();
    // expect(this.page.inDom(this.page.toastNotification));
    // expect(this.page.hasText(this.page.toastNotification, 'Recurring payment was create'));
    // browser.wait(() => {
    //   return this.page.toastNotification.isDisplayed();
    // }, 20000);
    // browser.waitForAngular()
    //   .then(() => {
    //     expect(this.page.waitUntilElementDisplayed(this.page.toastNotification))]
    // .toEqual('Recurring payment was created')
    //     expect(this.page.toastNotification.getText())
    //       .toEqual('Recurring payment was created');
    //   })
    // browser.sleep(2000);
    // browser.ignoreSynchronization = true;
    // browser.sleep(500);
    // expect(this.page.toastNotification.getText())
    //   .toEqual('Recurring payment was created');
    // // browser.waitForAngular();
    // browser.ignoreSynchronization = false;
    // browser.sleep(500);

    this.page.navigationTooggle.click();
    this.page.recurringTab.click();
    this.page.clickViewRecurringButton();
    this.page.clickCardViewButton();
    // continue test
    // this.page.expandedContent.each((row, index) => {
    //   const rowElement = row.$$('td');
    //   expect(rowElement.count()).toBe(2);
    //   expect(rowElement.get(1).getAttribute('innerText')).toMatch(cardDataMock[index]);
    // });
  }

  madeCheckRecurringWithExistingCustomer() {
    const customersDataMock =
      recurringDataMock.successChargeWithExistingCustomer
        .customersPage;
    const checkDataMock =
      recurringDataMock.successChargeWithExistingCustomer
        .processTransactionCheck;
    const resultDataMock =
      recurringDataMock.successChargeWithExistingCustomer
        .transactionResult;

    this[createNewCustomerWithCard](customersDataMock);

    processTransactionCheck.get();
    processTransactionCheck.setChargeAction();
    processTransactionCheck.fillCustomerAutoComplete(customersDataMock.createCustomer
      .companyNameInput);
    processTransactionCheck.fillAccountNumberAutoComplete();
    processTransactionCheck.fillFields(checkDataMock);
    processTransactionCheck.clickProcessTransaction();
    processTransactionCheck.waitUntilElementDisplayed(processTransactionCheck.approvePopup);
    expect(processTransactionCheck.isElementDisplayed(processTransactionCheck.approvePopup))
      .toBe(true);
    processTransactionCheck.closePopup();

    this.page.navigationTooggle.click();
    this.page.recurringTab.click();
    this.page.clickViewRecurringButton();
    this.page.clickCardViewButton();
    // continue test
    this.page.expandedContent.each((row, index) => {
      const rowElement = row.$$('td');
      expect(rowElement.count()).toBe(2);
      expect(rowElement.get(1).getAttribute('innerText').then(t => t.trim())).toEqual(resultDataMock[index]);
    });
  }

  declineRecurringWithGeneralSettingByCard() {
    const generalSettingDataMock =
      recurringDataMock.declineChargeRecurring
        .generalSettingInfo;
    const cardDataMock =
      recurringDataMock.declineChargeRecurring
        .processTransactionCardPage;

    controlPanel.get();
    controlPanel.generalSetting.click();
    controlPanel.timesToRetry.click();
    controlPanel.everyPeriodSelect(generalSettingDataMock.everyPeriodValue).click();

    browser.waitForAngular()
      .then(() => {
        processTransactionCard.get();
        processTransactionCard.fillFields(cardDataMock);
        processTransactionCard.clickProcessBrowserExecute();
        processTransactionCard.clickTryAgainButton();
        this.page.waitUntilElementDisplayed(this.page.declinedPopup);
        expect(this.page.isElementDisplayed(this.page.declinedPopup)).toBe(true);
        processTransactionCard.clickCancelButton();
      });

    this.page.navigationTooggle.click();
    this.page.recurringTab.click();
    this.page.clickViewRecurringButton();
    this.page.clickCardViewButton();
  }

  failedRecurringWithGeneralSettingByCard() {
    const generalSettingDataMock =
      recurringDataMock.failedRecurringSetChargeAction
        .generalSettingInfo;
    const cardDataMock =
      recurringDataMock.failedRecurringSetChargeAction
        .processTransactionCardPage;

    controlPanel.get();
    controlPanel.generalSetting.click();
    controlPanel.timesToRetry.click();
    controlPanel.everyPeriodSelect(generalSettingDataMock.everyPeriodValue).click();

    browser.waitForAngular()
      .then(() => {
        processTransactionCard.get();
        processTransactionCard.fillFields(cardDataMock);
        processTransactionCard.clickProcess();
        this.page.waitUntilElementDisplayed(this.page.declinedPopup);
        expect(this.page.isElementDisplayed(this.page.declinedPopup)).toBe(true);
        processTransactionCard.clickCancelButton();
      });

    this.page.navigationTooggle.click();
    this.page.recurringTab.click();
    this.page.clickViewRecurringButton();
    this.page.clickCardViewButton();
  }

  inactiveRecurringSetByCard() {
    const cardDataMock =
      recurringDataMock.inactiveChargeRecurringByCard;

    browser.waitForAngular()
      .then(() => {
        processTransactionCard.get();
        processTransactionCard.fillFields(cardDataMock);
        processTransactionCard.clickProcess();
      });

    this.page.navigationTooggle.click();
    this.page.recurringTab.click();
    this.page.clickTurnOffButton();
    expect(this.page.inactiveTextPopup.getText())
      .toEqual('Are you sure you want to deactivate recurring set?');
    this.page.clickOkButton();
    this.checkRecurringStatus('INACTIVE');
  }

  inactiveRecurringSetByCheck() {
    const checkDataMock =
      recurringDataMock.inactiveChargeRecurringByCheck;

    browser.waitForAngular()
      .then(() => {
        processTransactionCheck.get();
        processTransactionCheck.setChargeAction();
        processTransactionCheck.fillFields(checkDataMock);
        processTransactionCheck.setNewCustomer();
        processTransactionCheck.clickProcessTransaction();
        processTransactionCheck.waitUntilElementDisplayed(processTransactionCheck.approvePopup);
        expect(processTransactionCheck.isElementDisplayed(processTransactionCheck.approvePopup))
          .toBe(true);
        processTransactionCheck.closePopup();
      });

    this.page.navigationTooggle.click();
    this.page.recurringTab.click();
    this.page.clickTurnOffButton();
    expect(this.page.inactiveTextPopup.getText())
      .toEqual('Are you sure you want to deactivate recurring set?');
    this.page.clickOkButton();
    this.checkRecurringStatus('INACTIVE');
  }

  // helper methods using in this logic

  createInputsCheckerCard(dataMock) {
    return (blockName, inputs) => {
      inputs.forEach((input) => {
        console.log('mock', dataMock[blockName][input]);
        console.log(this.page[blockName][input]);
        expect(this.page[blockName][input].getAttribute('value'))
          .toEqual(dataMock[blockName][input]);
      });
    };
  }

  checkIfRowExist({ repeatSelector, colIdx, toEqualValue }) {
    this.page.repeaterData(repeatSelector)
      .then(rows => rows[0].all(by.repeater('column in vm.columns')))
      .then(cols => cols[colIdx])
      .then(col => col.getAttribute('innerText'))
      .then((text) => {
        expect(text).toEqual(toEqualValue);
      });
  }

  checkRecurringStatus(expectValue) {
    this.checkIfRowExist({
      repeatSelector: 'row in vm.rowData',
      colIdx: 5,
      toEqualValue: expectValue,
    });
  }

  [createNewCustomerWithCard](customersDataMock) {
    this[createNewCustomer](customersDataMock);
    this[createNewCard](customersDataMock);
  }

  [createNewCustomer](customersDataMock) {
    this.customersPage.get();
    this.customersPage.clickCreateCustomer();
    this.customersPage.fillFields({ createCustomer: customersDataMock.createCustomer,
      addBillingInfo: customersDataMock.addBillingInfo,
      addShippingInfo: customersDataMock.addShippingInfo });
    this.customersPage.clickCompleteCreateCustomer();
    browser.sleep(500);
  }

  [createNewCard](customersDataMock) {
    this.customersPage.selectCreatedCustomer(customersDataMock.createCustomer.companyNameInput);
    this.customersPage.selectWalletTab();
    this.customersPage.clickAddPaymentMethod();
    this.customersPage.selectCardTab();
    this.customersPage.fillFields({ addPaymentMethodCard: customersDataMock.addPaymentMethodCard });
    this.customersPage.clickAddCard();
  }
}

export default RecurringLogic;
