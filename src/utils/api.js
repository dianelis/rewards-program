import { generateTransactions, getQuarter } from "./helpers";

export const fetchTransactions = (_customerId, quarter, transactionsQty) =>
  new Promise((resolve) => {
    setTimeout(() => {
      const allTransactions = generateTransactions(transactionsQty);
      const filteredTransactions = allTransactions
        .filter(
          ({ customerId, createDate }) =>
            customerId === _customerId && getQuarter(createDate) === quarter
        )
        .sort((trxA, trxB) => trxA.createDate - trxB.createDate);
      resolve(filteredTransactions);
    }, 2000);
  });
