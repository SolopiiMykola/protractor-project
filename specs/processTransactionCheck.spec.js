import { ProcessTransactionCheckLogic } from '../specsLogic';
const checkLogic = new ProcessTransactionCheckLogic();

describe('Process Transactions - Check', () => {
  beforeAll(checkLogic.beforeAll.bind(checkLogic));
  beforeEach(checkLogic.beforeEach.bind(checkLogic));

  it('should be visible', checkLogic.shouldBeVisible.bind(checkLogic));

  it('should send saving with TEL', checkLogic.sendSavingWithTEL.bind(checkLogic));

  it('should send checking with PPD', checkLogic.sendCheckingWithPPD.bind(checkLogic));

  it('should send duplicate saving with PPD', checkLogic.sendDuplicateSavingWithCCD.bind(checkLogic));

  it('should send billing checking with PPD', checkLogic.sendBillingCheckingWithPPD.bind(checkLogic));

  it('should send refund saving with PPD', checkLogic.sendRefundSavingWithCCD.bind(checkLogic));

  it('should send refund with existing customer', checkLogic.sendRefundWithExistingCustomer.bind(checkLogic));

  it('should send charge with existing customer', checkLogic.sendChargeWithExistingCustomer.bind(checkLogic));

  it('should send recurring charge with existing customer',
    checkLogic.sendRecurringChargeWithExistingCustomer.bind(checkLogic));

  it('should send error with duplicate error recurring charge',
    checkLogic.sendErrorRecurringDuplicateWithExistingCustomer.bind(checkLogic));
});
