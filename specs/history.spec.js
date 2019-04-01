import { HistoryLogic } from '../specsLogic';
const historyLogic = new HistoryLogic();

describe('History - Batch', () => {
  beforeAll(historyLogic.beforeAll.bind(historyLogic));
  beforeEach(historyLogic.beforeEach.bind(historyLogic));

  it('should process Discover card  + check made transaction in History tab',
    historyLogic.checkMadeTransaction.bind(historyLogic));

  it('should process Visa card  + void and check made transaction in History tab',
    historyLogic.checkVoidTransaction.bind(historyLogic));

  it('should process Master card  + remove and check removed transaction in History tab',
    historyLogic.checkRemovedTransaction.bind(historyLogic));

  it('should process Amex card  + refund and check refunded transaction in History tab',
    historyLogic.checkRefundTransaction.bind(historyLogic));

  it('should process Visa + recharge and check out all fields on the Process Transaction page',
    historyLogic.checkRechargeTransaction.bind(historyLogic));

  it('all columns of the Queued table contain info according to processed transaction',
    historyLogic.checkMadeAuthTransaction.bind(historyLogic));

  it('all data of created transaction with existing Customer is correct on Queued tab',
    historyLogic.checkAuthorizeCreateCustomerByVisaInQueuedTAb.bind(historyLogic));

  it('all data of created transaction with existing Customer is correct on Queued tab with ' +
    'Amex Card',
    historyLogic.checkPostAuthorizeCreateCustomerByAmexInQueuedTAb.bind(historyLogic));

  it('all data of created transaction with existing Customer is correct on All Transaction ' +
    'Tab tab with Discover Card',
    historyLogic.checkCreateCustomerByDiscoverRefundInAllTransactionTAb.bind(historyLogic));

  it('transaction with queued status (Auth action) is voided',
    historyLogic.transactionWithQueuedStatusIsVoided.bind(historyLogic));

  it('Сapture transaction (Auth action)',
    historyLogic.madeCaptureMasterCardWithAuthAction.bind(historyLogic));

  it('Сapture transaction (Postauth action)',
    historyLogic.madeCaptureAmexCardWithPostAuthAction.bind(historyLogic));

  it('check out transaction with Error status',
    historyLogic.madeErrorWithChargeByAmex.bind(historyLogic));

  it('check out transaction with Decline status on Dashboard',
    historyLogic.madeDeclineWithChargeByVisa.bind(historyLogic));

  it('Refund transaction with Capture status',
    historyLogic.refundTransactionWithCaptureStatusBiggerAmount.bind(historyLogic));

  it('Refund transaction with Queued status with less amount than previously transaction',
    historyLogic.refundTransactionWithQueuedStatusLessAmount.bind(historyLogic));

  it('Refund transaction with Queued status with less amount than previously transaction',
    historyLogic.rechargeTransactionWithQueuedStatus.bind(historyLogic));

  it('Charge check transaction is processed successfully and check in History Tab',
    historyLogic.sendChargeCheckingTransaction.bind(historyLogic));

  it('Refund check transaction is processed successfully and check in History Tab',
    historyLogic.sendAndCheckRefundWithExistingCustomer.bind(historyLogic));

  it('Check out check transaction that has error in History tab',
    historyLogic.errorWithChargeCheckTransaction.bind(historyLogic));

  it('Refund check transaction is voided and check out on History Tab',
    historyLogic.successVoidCheckWithRefundAction.bind(historyLogic));

  it('Charge check transaction is voided and check out on History Tab',
    historyLogic.successVoidCheckWithChargeAction.bind(historyLogic));

  it('Recharge check transaction with Charge type and checkout in History Tab',
    historyLogic.successRechargeCheckWithChargeAction.bind(historyLogic));

  it('Close batch in History Tab',
    historyLogic.approveWithChargeByVisaAndCloseBatch.bind(historyLogic));
});

