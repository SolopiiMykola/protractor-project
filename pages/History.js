import Base from '../utils/Base';

// const HISTORY_TAB = 'History';
const QUEUED_TAB = 'Queued';
const BATCHES_TAB = 'Batches';
const ALL_TRANSACTION_TAB = 'All transactions';
const CHECKS_TAB = 'Checks';
const VOID_FILTER_TEXT = 'voided';
const CAPTURED_FILTER = 'captured';
const VOID_CONFIRM_TEXT = 'Are you sure you want to void transaction?';
const REFUND_CONFIRM_TEXT = 'Please enter the amount for refund.';
const REMOVED_CONFIRM_TEXT = 'Are you sure you want to move transaction to «Queued» page?';
const CAPTURE_CONFIRM_TEXT = 'Are you sure you want to capture the transaction - transaction will' +
  ' be moved to current batch?';
const CLOSE_BATCH_CONFIRM_TEXT = 'Are you sure you want to close batch?';
const OK_BUTTON_TEXT = 'Ok';

class History extends Base {
  get url() {
    return `${this.baseUrl}/batches`;
  }

  get selector() {
    return $('button[aria-label="Current Batch"]');
  }

  get navigationTooggle() {
    return element(by.id('navigation-toggle'));
  }

  get historyTab() {
    return element(by.css('.icon.icon-ic-menu-history-active'));
  }

  get batchesTab() {
    return element(by.cssContainingText('md-tab-item span', BATCHES_TAB));
  }

  get queuedTab() {
    return element(by.cssContainingText('md-tab-item span', QUEUED_TAB));
  }

  get allTransactionsTab() {
    return element(by.cssContainingText('md-tab-item span', ALL_TRANSACTION_TAB));
  }

  get checksTab() {
    return element(by.cssContainingText('md-tab-item span', CHECKS_TAB));
  }

  get voidFilter() {
    return element(by.cssContainingText('.quick-filters-list', VOID_FILTER_TEXT));
  }

  get capturedFilter() {
    return element(by.cssContainingText('.quick-filters-list', CAPTURED_FILTER));
  }

  get currentBatch() {
    return element(by.css('button[aria-label="Current Batch"]'));
  }

  get closeBatch() {
    return element(by.css('button[aria-label="Close Batch"]'));
  }

  get rowData() {
    return element(by.css('tr[ng-repeat="row in rowData"]'));
  }

  get voidButton() {
    return element(by.css('img[alt="void"]'));
  }

  get voidConfirmText() {
    return element(by.cssContainingText('.confirm-dialog-content', VOID_CONFIRM_TEXT));
  }

  get captureConfirmText() {
    return element(by.cssContainingText('.confirm-dialog-content', CAPTURE_CONFIRM_TEXT));
  }

  get closeBatchConfirmText() {
    return element(by.cssContainingText('.confirm-dialog-content', CLOSE_BATCH_CONFIRM_TEXT));
  }

  get refundButton() {
    return element(by.css('img[alt="refund"]'));
  }

  get rechargeButton() {
    return element(by.css('img[alt="recharge"]'));
  }

  get captureActionButton() {
    return element(by.css('button[aria-label="capture"]'));
  }

  get refundAmountInput() {
    return element(by.css('input[name="refund"]'));
  }

  get refundSubmitButton() {
    return element(by.buttonText('Refund'));
  }

  get refundTextPopup() {
    return element(by.cssContainingText('.confirm-dialog-content', REFUND_CONFIRM_TEXT));
  }

  get removedButton() {
    return element(by.css('md-icon[alt="delete"]'));
  }

  get removedTextPopup() {
    return element(by.cssContainingText('.confirm-dialog-content', REMOVED_CONFIRM_TEXT));
  }

  get removedNotification() {
    return element(by.css('div[layout-align="space-between center"] '));
  }

  get toastNotification() {
    return element(by.css('md-toast .md-toast-wrapper .md-toast-body .md-toast-text'));
  }

  get okButton() {
    return element(by.cssContainingText('button span', OK_BUTTON_TEXT));
  }

  get yesButton() {
    return element(by.cssContainingText('button span', 'Yes'));
  }

  repeaterData(repeater) {
    return element.all(by.repeater(repeater));
  }

  get viewButton() {
    return element.all(by.css('tr[ng-repeat-start="series in rowData"]')).get(1);
  }

  get expandedContent() {
    return element(by.css('.ab-expanded-content')).all(by.css('tr'));
  }

  get tableData() {
    return element(by.css('#dynamic_row')).element(by.css('table'));
  }

  get rows() {
    return this.tableData.all(by.tagName('tr'));
  }

  get cells() {
    return this.rows[0].all(by.tagName('td'));
  }

  transactionResultData(result) {
    return element(by.cssContainingText('.ab-expanded-content tr', result));
  }

  clickVoidButton() {
    browser.executeScript('arguments[0].click();', this.voidButton);
  }

  clickRemoveButton() {
    browser.executeScript('arguments[0].click();', this.removedButton);
  }

  clickRefundButton() {
    browser.executeScript('arguments[0].click();', this.refundButton);
  }

  clickRechargeButton() {
    browser.executeScript('arguments[0].click();', this.rechargeButton);
  }

  clickCaptureActionButton() {
    browser.executeScript('arguments[0].click();', this.captureActionButton);
  }

  clickViewButton() {
    this.viewButton.click();
  }

  clickCloseBatch() {
    // Need to scroll to 'processButton', but than Protractor's '.click()' do not work here
    browser.executeScript('arguments[0].scrollIntoView()', this.closeBatch.getWebElement());
    browser.executeScript('arguments[0].click()', this.closeBatch.getWebElement());
  }

}
export default History;
