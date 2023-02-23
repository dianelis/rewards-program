import { useEffect, useState } from "react";
import { fetchTransactions, getTotalAndPeriodPoints } from "../utils";

export const useTransaction = ({ customer, quarter, transactionsQty }) => {
  const [customerTransactions, setCustomerTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [transactionPoints, setTransactionPoints] = useState(null);

  const getPoints = () =>
    setTransactionPoints(getTotalAndPeriodPoints(customerTransactions));

  useEffect(() => {
    (async () => {
      try {
        if (![customer, quarter, transactionsQty].every((prop) => !!prop))
          return;
        setLoading(true);
        const transactions = await fetchTransactions(
          customer,
          parseInt(quarter),
          transactionsQty
        );
        setCustomerTransactions(transactions);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [customer, quarter, transactionsQty]);

  return {
    loading,
    customerTransactions,
    transactionPoints,
    getPoints,
  };
};
