import React, { useState } from "react";
import { Select, Table, Radio} from "antd";
import { Button } from "antd";
import searchImg from "../../assets/search.svg"
const TransactionsTable = ({ transactions }) => {
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

  let filteredTransactions = transactions.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) &&
      item.type.includes(typeFilter)
  );

  let sortedTransactions = filteredTransactions.sort((a, b) => {
    if (sortKey === "date") {
      return new Date(a.date) - new Date(b.date);
    } else if (sortKey === "amount") {
      return a.amount - b.amount;
    } else {
      return 0;
    }
  });
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
        <div>
          <Button>Export to CSV</Button>
          <Button type="primary">Import from CSV</Button>
        </div>
      </div>

      <Table dataSource={sortedTransactions} columns={columns} />
    </>
  );
};

export default TransactionsTable;
