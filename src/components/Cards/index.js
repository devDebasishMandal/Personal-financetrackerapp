import React from 'react';
import "./styles.css";
import { Card, Row } from 'antd';
import Button from "../Button"
const  Cards = () => {
  return (
    <div>
      <Row className="my-row">
        <Card className="my-card">
          <h2>Current Balance</h2>
          <p>₹{0}</p>
          {/* <p>₹{currentBalance}</p> */}
          <Button text="Reset Balance" />
          {/* <Button text="Reset Balance" onClick={reset} /> */}
        </Card>
        <Card className="my-card">
          <h2>Total Income</h2>
          <p>₹{0}</p>
          {/* <p>₹{Income}</p> */}
          <Button text="Add Income" />
          {/* <Button text="Add Income" onClick={showIncomeModal} /> */}
        </Card>
        <Card className="my-card">
          <h2>Toatal Expenses</h2>
          <p>₹{0}</p>
          {/* <p>₹{expenses}</p> */}
          <Button text="Reset Balance"  />
          {/* <Button text="Reset Balance" onClick={showExpenseModal} /> */}
        </Card>
      </Row>
    </div>
  );
}

export default  Cards;


/* 17:00 -l8 */