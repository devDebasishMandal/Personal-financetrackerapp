import React, { useEffect, useState } from "react";
import Header from "../components/header";
import Cards from "../components/Cards";
import { Form } from "antd";
import AddIncomeModal from "../components/Modals/AddIncome";
import AddExpenseModal from "../components/Modals/AddExpense";
import { addDoc, collection, query, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase";
import { toast } from "react-toastify";
import moment from "moment";
import { useAuthState } from "react-firebase-hooks/auth";
import TransactionsTable from "../components/TransactionsTable";

const Dashboard = () => {
  const [user] = useAuthState(auth);

  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);

  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);
  // const [form] = Form.useForm();

  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);

  const showExpenseModal = () => {
    setIsExpenseModalVisible(true);
  };

  const showIncomeModal = () => {
    setIsIncomeModalVisible(true);
  };

  const handleExpenseCancel = () => {
    setIsExpenseModalVisible(false);
    // form.resetFields();
  };

  const handleIncomeCancel = () => {
    setIsIncomeModalVisible(false);
    // form.resetFields();
  };

  // 1.fetch all transaction on 1st load
  useEffect(() => {
    //fetching all the docs form a collection L_9
    fetchTransaction();
  }, [user]);
  //2 get the transaction from user
  const onFinish = (values, type) => {
    // console.log("this is don",values,type);
    // we create a new object to store in the DB
    const newTransaction = {
      type: type,
      amount: parseFloat(values.amount),
      date: values.date.format("YYYY-MM-DD"),
      tag: values.tag,
      name: values.name,
    };
    // console.log(newTransaction);
    addTransaction(newTransaction);
    // ----- fetching  new transactions -----
    //  fetchTransaction();
    //  calculateBalance();

    setIsExpenseModalVisible(false);
    setIsIncomeModalVisible(false);
  };
  // 3 add the new transaction to the DB coll^n
  // calculate the new balance
  async function addTransaction(transaction) {
    try {
      const docRef = await addDoc(
        collection(db, `users/${user.uid}/transactions`),
        transaction
      );

      // console.log(docRef.id);
      toast.success("Transaction Added");
      // ----- fetching  new transactions -----
      const newArr = transactions;
      newArr.push(transaction);
      setTransactions(newArr);
      calculateBalance();
    } catch (error) {
      console.error("Error Adding Document", error);
      toast.error("Couldn't Add Transaction");
    }
  }
  // 4 get all the transaction form the DB for display
  async function fetchTransaction() {
    setLoading(true);
    if (user) {
      const q = query(collection(db, `users/${user.uid}/transactions`));

      const querySnapshot = await getDocs(q);

      let transactionsArray = [];

      querySnapshot.forEach((doc) => {
        transactionsArray.push(doc.data());
      });

      setTransactions(transactionsArray);
      // console.log(transactions);

      toast.success("Transactions Fetched");
    }
    setLoading(false);
  }
  // whenever there is change in the transactions array
  // of the user re-calculate the balance of the user
  useEffect(() => {
    calculateBalance();
  }, [transactions]);

  function calculateBalance() {
    let incomeTotal = 0;
    let expenseTotal = 0;

    transactions.forEach((transaction) => {
      if (transaction.type === "income") {
        incomeTotal += transaction.amount;
      } else {
        expenseTotal += transaction.amount;
      }
    });
    setIncome(incomeTotal);
    setExpense(expenseTotal);
    setTotalBalance(incomeTotal - expenseTotal);
  }

  return (
    <div>
      <Header />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Cards
            income={income}
            expense={expense}
            totalBalance={totalBalance}
            showExpenseModal={showExpenseModal}
            showIncomeModal={showIncomeModal}
            handleExpenseCancel={handleExpenseCancel}
            handleIncomeCancel={handleIncomeCancel}
          />
          <AddExpenseModal
            isExpenseModalVisible={isExpenseModalVisible}
            handleExpenseCancel={handleExpenseCancel}
            onFinish={onFinish}
          />
          <AddIncomeModal
            isIncomeModalVisible={isIncomeModalVisible}
            handleIncomeCancel={handleIncomeCancel}
            onFinish={onFinish}
          />
          <TransactionsTable transactions={transactions} />
        </>
      )}
    </div>
  );
};

export default Dashboard;
