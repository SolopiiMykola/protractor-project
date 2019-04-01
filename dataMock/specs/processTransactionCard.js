import { getRandomInt } from '../../utils/Helpers';
import { cards } from '../cards';

const { discover, discoverDeclined, visa, visaDeclined, masterCard, amex, amexError } = cards;

const MIN_NUM = 0;
const MAX_NUM = 100000000;

const processTransactionCardDataMock = {
  approveWithChargeByDiscover: {
    generalInfo: {
      actionSelect: 'charge',
      cardNameInput: discover.name,
      cardNumberInput: discover.number,
      cardCvvInput: discover.cvv,
      cardExpireMonth: discover.expire.month,
      cardExpireYear: discover.expire.year,
      amountInput: '1012',
      taxInput: '0.92',
      avsStreetInput: '1307 Broad Hollow Road',
      avsZipInput: '11747',
    },
  },
  approveWithAuthorizeCreateCustomerByVisa: {
    generalInfo: {
      actionSelect: 'authorize',
      cardNameInput: visa.name,
      cardNumberInput: visa.number,
      cardCvvInput: visa.cvv,
      cardExpireMonth: visa.expire.month,
      cardExpireYear: visa.expire.year,
      amountInput: '75',
      taxInput: '1',
      surchargeInput: '0.31',
      companyNameInput: `Test Process Transaction Card ${getRandomInt(MIN_NUM, MAX_NUM)}`,
      avsStreetInput: '1307 Broad Hollow Road',
      avsZipInput: '11747',
      createCustomerCheckbox: true,
    },
  },
  approveWithRefundByVisa: {
    generalInfo: {
      actionSelect: 'refund',
      cardNumberInput: visa.number,
      cardExpireMonth: visa.expire.month,
      cardExpireYear: visa.expire.year,
      amountInput: '100',
      taxInput: '10',
      surchargeInput: '15',
      descriptionInput: 'test description',
      poNumberInput: '0002',
      invoiceNumber: '0001',
      emailInput: 'test@codemotion.eu',
    },
  },
  approveWithChargeWithCustomerByMasterCard: {
    customersPage: {
      createCustomer: {
        companyNameInput: `New Company ${getRandomInt(MIN_NUM, MAX_NUM)}`,
      },
      addPaymentMethodCard: {
        cardNameInput: masterCard.name,
        cardNumberInput: masterCard.number,
        cardExpireMonth: masterCard.expire.month,
        cardExpireYear: masterCard.expire.year,
        avsStreetInput: '1307 Broad Hollow Road',
        avsZipInput: '11747',
      },
    },
    processTransactionCardPage: {
      generalInfo: {
        customerSelectInput: `New Company ${getRandomInt(MIN_NUM, MAX_NUM)}`,
        actionSelect: 'charge',
        cardNumberInput: 'autocomplete',
        cardCvvInput: masterCard.cvv,
        amountInput: '74',
        taxInput: '0.43',
        surchargeInput: '2',
      },
    },
  },
  approveWithPostauthorizeEditingCustomerByAmex: {
    customersPage: {
      createCustomer: {
        companyNameInput: `New Company ${getRandomInt(MIN_NUM, MAX_NUM)}`,
      },
      addPaymentMethodCard: {
        cardNameInput: amex.name,
        cardNumberInput: amex.number,
        cardExpireMonth: amex.expire.month,
        cardExpireYear: amex.expire.year,
      },
    },
    processTransactionCardPage: {
      generalInfo: {
        customerSelectInput: `New Company ${getRandomInt(MIN_NUM, MAX_NUM)}`,
        actionSelect: 'postauthorize',
        cardNumberInput: 'autocomplete',
        cardCvvInput: amex.cvv,
        authNumberInput: '212121',
        amountInput: '77.19',
        avsStreetInput: '1307 Broad Hollow Road',
        avsZipInput: '11747',
        editCustomerCheckbox: true,
      },
    },
  },
  declineRepeatedlyWithChargeWithUnexistingCustomerByVisa: {
    generalInfo: {
      actionSelect: 'charge',
      companyNameInput: `Unexisting Test Process Transaction Card ${getRandomInt(MIN_NUM, MAX_NUM)}`,
      cardNameInput: visaDeclined.name,
      cardNumberInput: visaDeclined.number,
      cardExpireMonth: visaDeclined.expire.month,
      cardExpireYear: visaDeclined.expire.year,
      amountInput: '137.50',
      avsStreetInput: '1307 Broad Hollow Road',
      avsZipInput: '11747',
    },
  },
  declineRepeatedlyWithChargeWithCustomerByDiscover: {
    customersPage: {
      createCustomer: {
        companyNameInput: `New Company ${getRandomInt(MIN_NUM, MAX_NUM)}`,
      },
      addPaymentMethodCard: {
        cardNameInput: discoverDeclined.name,
        cardNumberInput: discoverDeclined.number,
        cardExpireMonth: discoverDeclined.expire.month,
        cardExpireYear: discoverDeclined.expire.year,
      },
    },
    processTransactionCardPage: {
      generalInfo: {
        customerSelectInput: `New Company ${getRandomInt(MIN_NUM, MAX_NUM)}`,
        actionSelect: 'charge',
        cardNumberInput: 'autocomplete',
        amountInput: '1100.07',
        surchargeInput: '68',
      },
    },
  },
  errorWithChargeWithCustomerByAmex: {
    customersPage: {
      createCustomer: {
        companyNameInput: `New Company ${getRandomInt(MIN_NUM, MAX_NUM)}`,
      },
    },
    processTransactionCardPage: {
      generalInfo: {
        customerSelectInput: `New Company ${getRandomInt(MIN_NUM, MAX_NUM)}`,
        actionSelect: 'charge',
        cardNameInput: amexError.name,
        cardNumberInput: amexError.number,
        cardExpireMonth: amexError.expire.month,
        cardExpireYear: amexError.expire.year,
        amountInput: '349',
        surchargeInput: '0.01',
        avsStreetInput: '1307 Broad Hollow Road',
        avsZipInput: '11747',
        editCustomerCheckbox: true,
      },
    },
  },
  approveWithRefundWithCustomerByMasterCard: {
    customersPage: {
      createCustomer: {
        companyNameInput: `New Company ${getRandomInt(MIN_NUM, MAX_NUM)}`,
      },
      addPaymentMethodCard: {
        cardNameInput: masterCard.name,
        cardNumberInput: masterCard.number,
        cardExpireMonth: masterCard.expire.month,
        cardExpireYear: masterCard.expire.year,
        avsStreetInput: '1307 Broad Hollow Road',
        avsZipInput: '11747',
      },
    },
    processTransactionCardPage: {
      generalInfo: {
        customerSelectInput: `New Company ${getRandomInt(MIN_NUM, MAX_NUM)}`,
        actionSelect: 'refund',
        cardNumberInput: 'autocomplete',
        amountInput: '99.99',
        taxInput: '0.43',
      },
    },
  },
  successChargeRecurringWithExistingCustomerByDiscover: {
    customersPage: {
      createCustomer: {
        companyNameInput: `Recurring ${getRandomInt(MIN_NUM, MAX_NUM)}`,
      },
      addPaymentMethodCard: {
        cardNumberInput: discover.number,
        cardExpireMonth: discover.expire.month,
        cardExpireYear: discover.expire.year,
        avsStreetInput: '1307 Broad Hollow Road',
        avsZipInput: '11747',
      },
    },
    processTransactionCardPage: {
      generalInfo: {
        customerSelectInput: `Recurring ${getRandomInt(MIN_NUM, MAX_NUM)}`,
        actionSelect: 'charge',
        cardNumberInput: 'autocomplete',
        cardCvvInput: '123',
        amountInput: '1012.92',
      },
      recurringInfo: {
        paymentTitle: `Test ${getRandomInt(MIN_NUM, MAX_NUM)}`,
        startingFromDate: null,
        everyPeriodValue: '6 months',
        repeatTimes: '10',
        billFirstTransaction: true,
      },
    },
  },
  declinedChargeRecurringWithExistingCustomerByVisa: {
    customersPage: {
      createCustomer: {
        companyNameInput: `Recurring ${getRandomInt(MIN_NUM, MAX_NUM)}`,
      },
      addPaymentMethodCard: {
        cardNumberInput: visaDeclined.number,
        cardExpireMonth: visaDeclined.expire.month,
        cardExpireYear: visaDeclined.expire.year,
      },
    },
    processTransactionCardPage: {
      generalInfo: {
        customerSelectInput: `Recurring ${getRandomInt(MIN_NUM, MAX_NUM)}`,
        actionSelect: 'charge',
        cardNumberInput: 'autocomplete',
        cardCvvInput: '123',
        amountInput: '130',
        taxInput: '7.50',
      },
      recurringInfo: {
        paymentTitle: `Test ${getRandomInt(MIN_NUM, MAX_NUM)}`,
        startingFromDate: null,
        everyPeriodValue: 'quarter',
        ongoing: '10',
        billFirstTransaction: true,
      },
    },
  },
  declinedRepeatedlyRecurringWithExistingCustomerByDiscover: {
    customersPage: {
      createCustomer: {
        companyNameInput: `Recurring ${getRandomInt(MIN_NUM, MAX_NUM)}`,
      },
      addPaymentMethodCard: {
        cardNumberInput: discoverDeclined.number,
        cardExpireMonth: discoverDeclined.expire.month,
        cardExpireYear: discoverDeclined.expire.year,
      },
    },
    processTransactionCardPage: {
      generalInfo: {
        customerSelectInput: `Recurring ${getRandomInt(MIN_NUM, MAX_NUM)}`,
        actionSelect: 'charge',
        cardNameInput: discoverDeclined.name,
        cardNumberInput: 'autocomplete',
        cardCvvInput: '123',
        amountInput: '1100',
        taxInput: '68',
        surchargeInput: '0.07',
        avsStreetInput: '1307 Broad Hollow Road',
        avsZipInput: '11747',
        editCustomerCheckbox: true,
      },
      recurringInfo: {
        paymentTitle: `Test ${getRandomInt(MIN_NUM, MAX_NUM)}`,
        startingFromDate: null,
        everyPeriodValue: 'year',
        ongoing: '10',
        billFirstTransaction: true,
      },
    },
  },
};

export {
  processTransactionCardDataMock,
};
