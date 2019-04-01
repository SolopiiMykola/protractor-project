import Base from '../utils/Base';

const DECLINED_POPUP_TEXT = 'Declined!';
const APPROVED_POPUP_TEXT = 'Approved';

const fillCardGeneralFields = Symbol('fill check tab general fields');
const fillCardExpireMonthField = Symbol('fill card expire month field');
const fillCardExpireYearField = Symbol('fill card expire year field');

class DashboardCard extends Base {
  get url() {
    return `${this.baseUrl}/dashboard`;
  }

  get selector() {
    return element(by.id('dashboard'));
  }

  get processButton() { return $('button[ng-click="vm.cardSubmit()"]'); }

  get declinedPopup() { return element(by.cssContainingText('.transactions-dialog-header h1', DECLINED_POPUP_TEXT)); }

  get approvePopup() { return element(by.cssContainingText('.transactions-dialog-header h1', APPROVED_POPUP_TEXT)); }

  get okButton() { return element(by.buttonText('Ok')); }

  get completeButton() { return element(by.buttonText('Complete')); }

  get cancelButton() { return element(by.buttonText('Cancel')); }

  get generalInfo() {
    return {
      cardNameInput: element.all(by.name('card_name')).get(1),
      cardNumberInput: element(by.name('card_number')),
      cardAutocompleteItem: $('md-virtual-repeat-container:not(.ng-hide) [md-extra-name="$mdAutocompleteCtrl.itemName"]'),
      cardCvvInput: element(by.name('cvv')),
      cardExpireMonth: {
        dropdown: element(by.name('expiry_month')),
        select: month => element(by.css(`md-option[value="${month}"]`)),
      },
      cardExpireYear: {
        dropdown: element(by.name('expiry_year')),
        select: year => element(by.css(`md-option[value="${year}"]`)),
      },
      amountInput: element(by.name('amount')),
    };
  }

  clickProcess() {
    this.processButton.click();
  }

  clickCancelButton() {
    this.cancelButton.click();
  }

  fillFields(fields) {
    if (fields.generalInfo) this[fillCardGeneralFields](fields.generalInfo);
  }

  [fillCardGeneralFields](generalInfo) {
    Object.keys(generalInfo).forEach((key) => {
      if (key === 'cardExpireMonth') {
        this[fillCardExpireMonthField](generalInfo.cardExpireMonth);
        return;
      }

      if (key === 'cardExpireYear') {
        this[fillCardExpireYearField](generalInfo.cardExpireYear);
        return;
      }
      this.inputField.apply(this, [generalInfo, 'generalInfo'])(key);
    });
  }

  [fillCardExpireMonthField](month) {
    this.generalInfo.cardExpireMonth.dropdown.click();
    this.generalInfo.cardExpireMonth.select(month).click();
  }

  [fillCardExpireYearField](year) {
    this.generalInfo.cardExpireYear.dropdown.click();
    this.generalInfo.cardExpireYear.select(year).click();
  }
}

export default DashboardCard;
