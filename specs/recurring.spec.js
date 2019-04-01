import { RecurringLogic } from '../specsLogic';

const recurringLogic = new RecurringLogic();

describe('Recurring - Recurring Tab', () => {
  beforeAll(recurringLogic.beforeAll.bind(recurringLogic));
  beforeEach(recurringLogic.beforeEach.bind(recurringLogic));

  it('Active recurring set (n times) with card is created',
    recurringLogic.madeRecurringWithDiscoverCard.bind(recurringLogic));

  it('Check that active recurring set (ongoing) with card is created',
    recurringLogic.madeRecurringWithExistingCustomerAndAmex.bind(recurringLogic));

  it('Active recurring set (n times) with check is created.',
    recurringLogic.sendChargeCheckingTransaction.bind(recurringLogic));

  it('Active recurring set (ongoing) with check is created',
    recurringLogic.madeCheckRecurringWithExistingCustomer.bind(recurringLogic));

  it('Declined recurring set (n times) with card is created',
    recurringLogic.declineRecurringWithGeneralSettingByCard.bind(recurringLogic));

  it(' Failed recurring set (ongoing) with card is created',
    recurringLogic.failedRecurringWithGeneralSettingByCard.bind(recurringLogic));

  it('Recurring set with card (Active status) becomes inactive',
    recurringLogic.inactiveRecurringSetByCard.bind(recurringLogic));

  it('Recurring set with check (Active status) becomes inactive',
    recurringLogic.inactiveRecurringSetByCheck.bind(recurringLogic));
});
