import React, { useState } from "react";
import { Select, Table, Radio, message} from "antd";
import { Button } from "antd";
import searchImg from "../../assets/search.svg";
import { parse, unparse } from "papaparse";
import { toast } from "react-toastify";


const TransactionsTable = ({
  transactions,
  addTransaction,
  fetchTransaction,
}) => {
  const { Option } = Select;
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [sortKey, setSortKey] = useState("");
  // column is the strcture if the table
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Tag",
      dataIndex: "tag",
      key: "date",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
  ];
  function handleSearch(e) {
    setSearch(e.target.value);
  }
  //---------------------
  let filteredTransactions = transactions.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) &&
      item.type.includes(typeFilter)
  );
  //--------------------
  let sortedTransactions = filteredTransactions.sort((a, b) => {
    if (sortKey === "date") {
      return new Date(a.date) - new Date(b.date);
    } else if (sortKey === "amount") {
      return a.amount - b.amount;
    } else {
      return 0;
    }
  });
  //----------------------
  // converting JSON data to CSV File and Download
  function exportCSV() {
    var csv = unparse({
      fields: ["name", "type", "tag", "date", "amount"],
      data: transactions,
    });
    // to download the file creating a BLOB
    const bolb = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    // bolb is the data
    const url = URL.createObjectURL(bolb);
    const link = document.createElement("a");
    link.href = url;
    link.download = "transactions.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  //--------------------
  function importCSV(event) {
    event.preventDefault();
    try {
      //when there is more then one file selectedwe get array
      parse(event.target.files[0], {
        header: true,
        complete: async function (results) {
          // results.data is an array of objects
          // representing rows of the CSV
          for (const transaction of results.data) {
            // writing each transaction to firebase
            // using the addTransaction function here
            const newTransaction = {
              ...transaction,
              amount: parseFloat(transaction.amount),
            };
            await addTransaction(newTransaction, true);
          }
        },
      });
      toast.success("All Transactions Added");
      fetchTransaction();
      event.target.files = null;
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <>
      <div className="top-input">
        <div className="input-flex">
          <img src={searchImg} width="20" />
          <input
            type="text"
            value={search}
            onChange={
              (e) => handleSearch(e)
              // setSearch(e.target.value)
            }
            placeholder="Search By Name"
          />
        </div>
        <Select
          className="select-input"
          onChange={(value) => setTypeFilter(value)}
          value={typeFilter}
          placeholder="Filters"
          allowClear
        >
          <Option value="">All</Option>
          <Option value="income">Income</Option>
          <Option value="expense">Expense</Option>
        </Select>
      </div>

      <div className="mid-input">
        <h2>My Transactions</h2>
        <Radio.Group
          className="input-radio"
          onChange={(e) => setSortKey(e.target.value)}
          value={sortKey}
        >
          <Radio.Button value="">All</Radio.Button>
          <Radio.Button value="date">Sort by Date</Radio.Button>
          <Radio.Button value="amount">Sort by Amount</Radio.Button>
        </Radio.Group>
        <div className="end-input">
          <Button className="btn" onClick={exportCSV}>
            Export to CSV
          </Button>
          <label for="file-csv" className="btn btn-blue">
            Import from CSV
          </label>
          <input
            id="file-csv"
            type="file"
            accept=".csv"
            required
            onChange={importCSV}
            style={{ display: "none" }}
          />
        </div>
      </div>

      <Table dataSource={sortedTransactions} columns={columns} />
    </>
  );
};

export default TransactionsTable;
