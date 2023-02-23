import { useCallback, useState } from "react";
import styled from "styled-components";
import { customers, QUARTERS } from "../utils";
import { Select } from "./Select";
import { Loading } from "./Loading";
import { Button } from "./Button";
import JsonViewer from "./JsonViewer";
import { useTransaction } from "../hooks/useTransaction";

const StyledDashboard = styled.div`
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-height: 150px;
  padding: 1rem;
  text-align: center;

  h3 {
    color: #008fcd;
  }
`;

const FieldsRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
`;

const PointsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
`;

export const Dashboard = () => {
  const [customer, setCustomer] = useState("");
  const [quarter, setQuarter] = useState("");
  const [transactionsQty, setTransactionsQty] = useState("");

  const { customerTransactions, loading, getPoints, transactionPoints } =
    useTransaction({ customer, quarter, transactionsQty });

  const getTitle = useCallback(() => {
    const { label } = QUARTERS.find(({ value }) => value === parseInt(quarter));
    const { name } = customers.find(({ id }) => id === customer);
    return `${name} has ${customerTransactions.length} transactions in the Period (${label})`;
  }, [customer, customerTransactions, quarter]);

  return (
    <StyledDashboard>
      <h1>Rewards Program</h1>
      <FieldsRow>
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
      </FieldsRow>
      {loading && <Loading />}
      {customerTransactions.length > 0 && (
        <>
          <JsonViewer title={getTitle()} data={customerTransactions} />
          <Button onClick={getPoints}>Calculate Points</Button>
          {transactionPoints && (
            <>
              <h3>Total Points: {transactionPoints.total}</h3>
              <PointsContainer>
                {transactionPoints.monthly.map(([name, value]) => (
                  <h3 key={name}>
                    {name}: {value}
                  </h3>
                ))}
              </PointsContainer>
            </>
          )}
        </>
      )}
    </StyledDashboard>
  );
};
