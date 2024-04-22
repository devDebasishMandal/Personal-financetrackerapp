import React, { useState } from "react";
import Header from "../components/header";
import Cards from "../components/Cards";

const Dashboard = () => {
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);

  const showExpenseModal = () => {
    setIsExpenseModalVisible(true);
  };

  const showIncomeModal = () => {
    setIsIncomeModalVisible(true);
  };

  const handleExpenseCancel = () => {
    setIsExpenseModalVisible(false);
  };

  const handleIncomeCancel = () => {
    setIsIncomeModalVisible(false);
  };

  return (
    <div>
      <Header />
      <Cards
        showExpenseModal={showExpenseModal}
        showIncomeModal={showIncomeModal}
        handleExpenseCancel={handleExpenseCancel}
        handleIncomeCancel={handleIncomeCancel}
      />
    </div>
  );
};

export default Dashboard;

/* 17:00 -l8 */
