import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  customers,
  fetchTransactions,
  getTotalAndPeriodPoints,
  QUARTERS,
} from "../utils";
import { JSONTree } from "react-json-tree";
import { Select } from "./Select";

const StyledDashboard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  padding: 1rem;
  min-height: 150px;

  button {
    padding: 1rem;
    background: #008fcd;
    border: none;
    cursor: pointer;
    color: white;
    font-size: 16px;
    font-weight: 600;
    border-radius: 1rem;

    &:hover {
      opacity: 0.8;
    }
  }

  & > h1,
  h2,
  h3,
  h4 {
    margin: 0;
    text-align: center;
  }

  h3 {
    color: #008fcd;
  }

  select {
    flex: 1;
  }

  & > ul:first-of-type {
    padding: 1rem !important;
    overflow-y: auto;
    border-radius: 1rem;
    height: 200px;
    margin: 0 !important;
  }
`;

const Loader = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin: 0 auto;
  animation: spin 1.2s linear infinite;

  &::before,
  ::after {
    content: "";
    position: absolute;
    border-radius: inherit;
  }

  &::before {
    width: 100%;
    height: 100%;
    background-image: linear-gradient(
      90deg,
      rgba(2, 0, 36, 1) 0%,
      rgba(33, 64, 74, 1) 30%,
      rgba(0, 143, 205, 1) 100%
    );
  }

  &::after {
    width: 85%;
    height: 85%;
    background-color: white;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const StyledRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const StyledWrapperInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
`;

export const Dashboard = () => {
  const [customerTransactions, setCustomerTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [points, setPoints] = useState(null);
  const [customer, setCustomer] = useState("");
  const [quarter, setQuarter] = useState("");
  const [transactionsQty, setTransactionsQty] = useState("");

  const getPoints = () =>
    setPoints(getTotalAndPeriodPoints(customerTransactions));

  const isValid = customer && quarter && transactionsQty;
  const getQuarter = QUARTERS.find(({ value }) => value === parseInt(quarter));
  const getCustomer = customers.find(({ id }) => id === customer);

  useEffect(() => {
    (async () => {
      try {
        if (!isValid) return;
        setPoints({});
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
  }, [customer, isValid, quarter, transactionsQty]);

  return (
    <StyledDashboard>
      <h1>Rewards Program</h1>
      <StyledRow>
        <Select
          label="Transaction Quantity"
          value={transactionsQty}
          options={[
            { label: "10", value: 10 },
            { label: "50", value: 50 },
            { label: "100", value: 100 },
            { label: "200", value: 200 },
          ]}
          onChange={setTransactionsQty}
        />
        <Select
          label="Select Customer"
          labelKey="name"
          valueKey="id"
          value={customer}
          options={customers}
          onChange={setCustomer}
        />
        <Select
          label="Select Quarter"
          value={quarter}
          options={QUARTERS}
          onChange={setQuarter}
        />
      </StyledRow>
      {loading ? (
        <Loader />
      ) : !!customerTransactions.length ? (
        <>
          <h2>
            {` ${getCustomer.name} has ${customerTransactions.length} transactions in the Period (${getQuarter?.label})`}
          </h2>
          <JSONTree data={customerTransactions} />
          <button onClick={getPoints}>Calculate Points</button>
          {points?.total && <h3>Total Points: {points?.total}</h3>}
          <StyledWrapperInfo>
            {points?.monthly?.map(([name, value]) => (
              <h3 key={name}>
                {name}: {value}
              </h3>
            ))}
          </StyledWrapperInfo>
        </>
      ) : (
        isValid && <h3>Transactions not found!</h3>
      )}
    </StyledDashboard>
  );
};
