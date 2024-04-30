import React from "react";
import {
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
} from "antd";

const AddIncomeModal = ({
  isIncomeModalVisible,
  handleIncomeCancel,
  onFinish,
}) => {

  const [form] = Form.useForm();


  return (
    <div>
      <Modal
        style={{ fontWeight: 600 }}
        title="Add Income"
        visible={isIncomeModalVisible}
        onCancel={handleIncomeCancel}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={(values) => {
            onFinish(values, "income");
            form.resetFields();
          }}
        >
          <Form.Item
            style={{ fontWeight: 600 }}
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please Input the name of the transaction",
              },
            ]}
          >
            <Input type="text" className="custome-input" />
          </Form.Item>

          <Form.Item
            style={{ fontWeight: 600 }}
            label="Amount"
            name="amount"
            rules={[
              {
                required: true,
                message: "Please Input the Amount of the transaction",
              },
            ]}
          >
            <Input type="number" className="custome-input" />
          </Form.Item>

          <Form.Item
            style={{ fontWeight: 600 }}
            label="Date"
            name="date"
            rules={[
              {
                required: true,
                message: "Please Input the date of the transaction",
              },
            ]}
          >
            <DatePicker format="YYYY-MM-DD" className="custom-input" />
          </Form.Item>

          <Form.Item
            style={{ fontWeight: 600 }}
            label="Tag"
            name="tag"
            rules={[
              {
                required: true,
                message: "Please Select a Tag !",
              },
            ]}
          >
            <Select className="select-input-2">
              <Select.Option value="salary">Salary</Select.Option>
              <Select.Option value="Freelance">Freelance</Select.Option>
              <Select.Option value="investment">Investment</Select.Option>
            </Select>
          </Form.Item>
          
          <Form.Item>
            <Button className="btn btn-blue" type="primary" htmlType="submit">
              Add Income
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddIncomeModal;
