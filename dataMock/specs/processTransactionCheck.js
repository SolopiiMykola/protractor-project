import { getRandomInt } from '../../utils/Helpers';

const MIN_NUM = 0;
const MAX_NUM = 100000000;

const processTransactionCheckDataMock = {
  successSavingWithTEL: {
    generalInfo: {
      checkNameInput: 'Test Check',
      accountTypeInput: 'Savings',
      transactionTypeInput: 'TEL',
      routingNumberInput: '061000227',
      accountNumberInput: '10102233',
      amountInput: '101',
      taxInput: '10.04',
      surchargeInput: '15.11',
      avsStreetInput: '1307 Broad Hollow Road',
      avsZipInput: '11747',
    },
  },
  successCheckingWithPPD: {
    generalInfo: {
      checkNameInput: 'Test Check',
      accountTypeInput: 'Checking',
      transactionTypeInput: 'PPD',
      routingNumberInput: '061000052',
      accountNumberInput: '10103344',
      amountInput: '840',
      companyName: `New Company ${getRandomInt(MIN_NUM, MAX_NUM)}`,
    },
  },
  successDuplicateSavingWithCCD: {
    generalInfo: {
      checkNameInput: 'Test Check',
      accountTypeInput: 'Savings',
      transactionTypeInput: 'CCD',
      routingNumberInput: '061000052',
      accountNumberInput: '10101122',
      amountInput: '102',
    },
  },
  successCheckingWithPPDAndBilling: {
    generalInfo: {
      checkNameInput: 'Test Check',
      accountTypeInput: 'Checking',
      transactionTypeInput: 'PPD',
      routingNumberInput: '061000227',
      accountNumberInput: '10102233',
      amountInput: '1303',
      taxInput: '10.04',
      surchargeInput: '15.11',
      avsStreetInput: '1307 Broad Hollow Road',
      avsZipInput: '11747',
      poNumberInput: '0002',
      descriptionInput: 'test description',
      emailInput: 'an@codemotion.eu',
    },
    billingInfo: {
      firstName: 'Leo',
      lastName: 'Cockin',
      street: '123 6th St.',
      street2: '123 8th St.',
      city: 'Melbourne',
      zipCode: '32904',
      phone: '(152)234234234',
    },
  },
  successRefundSavingWithCCD: {
    generalInfo: {
      checkNameInput: 'Test Check',
      accountTypeInput: 'Savings',
      transactionTypeInput: 'CCD',
      routingNumberInput: '061000227',
      accountNumberInput: '10102233',
      amountInput: '1304',
      taxInput: '20',
      surchargeInput: '1',
      avsStreetInput: '1307 Broad Hollow Road',
      avsZipInput: '11747',
      companyName: `New Company ${getRandomInt(MIN_NUM, MAX_NUM)}`,
    },
  },
  successRefundWithExistingCustomer: {
    customersPage: {
      createCustomer: {
        companyNameInput: `New Company ${getRandomInt(MIN_NUM, MAX_NUM)}`,
      },
      addPaymentMethodCheck: {
        checkNameInput: 'Test Check',
        accountTypeInput: 'Checking',
        transactionTypeInput: 'CCD',
        routingNumberInput: '061092387',
        accountNumberInput: '10104455',
        avsStreetInput: '1307 Broad Hollow Road',
        avsZipInput: '11747',
      },
    },
    processTransactionCheck: {
      generalInfo: {
        amountInput: '1205.99',
        taxInput: '0.01',
      },
    },
  },
  successChargeWithExistingCustomer: {
    customersPage: {
      createCustomer: {
        companyNameInput: `New Company ${getRandomInt(MIN_NUM, MAX_NUM)}`,
      },
      addPaymentMethodCheck: {
        checkNameInput: 'Test Check',
        accountTypeInput: 'Savings',
        transactionTypeInput: 'WEB',
        routingNumberInput: '061000227',
        accountNumberInput: '10105566',
      },
    },
    processTransactionCheck: {
      generalInfo: {
        accountTypeInput: 'Checking',
        amountInput: '1061.99',
        taxInput: '0.01',
      },
    },
  },
  successChargeRecurringWithExistingCustomer: {
    customersPage: {
      createCustomer: {
        companyNameInput: `New Company ${getRandomInt(MIN_NUM, MAX_NUM)}`,
      },
      addPaymentMethodCheck: {
        checkNameInput: 'Test Check',
        accountTypeInput: 'Checking',
        transactionTypeInput: 'CCD',
        routingNumberInput: '061092387',
        accountNumberInput: '10104455',
      },
    },
    processTransactionCheck: {
      generalInfo: {
        amountInput: '1027.50',
        taxInput: '2.48',
        surchargeInput: '0.02',
      },
      recurringInfo: {
        paymentTitle: `Test ${getRandomInt(MIN_NUM, MAX_NUM)}`,
        startBillingDate: null,
        everyPeriodValue: '2 weeks',
        repeatTimes: '2',
        billFirstTransaction: true,
      },
    },
  },
  errorChargeRecurringWithExistingCustomer: {
    customersPage: {
      createCustomer: {
        companyNameInput: `New Company ${getRandomInt(MIN_NUM, MAX_NUM)}`,
      },
    },
    processTransactionCheck: {
      generalInfo: {
        checkNameInput: 'Test Check',
        accountTypeInput: 'Savings',
        transactionTypeInput: 'PPD',
        routingNumberInput: '061092387',
        accountNumberInput: '10107788',
        amountInput: '1083.50',
        taxInput: '10.22',
        surchargeInput: '10.23',
      },
      recurringInfo: {
        paymentTitle: `Test ${getRandomInt(MIN_NUM, MAX_NUM)}`,
        startBillingDate: null,
        everyPeriodValue: '2 weeks',
        repeatTimes: '2',
        billFirstTransaction: true,
      },
    },
  },
};

export {
  processTransactionCheckDataMock,
};
