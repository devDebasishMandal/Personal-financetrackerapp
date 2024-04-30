import React from "react";
import {
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
  Card,
  Col,
  Row,
} from "antd";

const AddExpenseModal = ({
  isExpenseModalVisible,
  handleExpenseCancel,
  onFinish,
}) => {
  const [form] = Form.useForm();


  return (
    <div>
      <Modal
        style={{ fontWeight: 600 }}
        title="Add Expanse"
        visible={isExpenseModalVisible}
        onCancel={handleExpenseCancel}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={(values) => {
            onFinish(values, "expense");
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
                message: "Please Input the date of the transaction!",
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
              <Select.Option value="food">Food</Select.Option>
              <Select.Option value="car">Car</Select.Option>
              <Select.Option value="miscellaneous">Miscellaneous</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button className="btn btn-blue" type="primary" htmlType="submit">
              Add Expense
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddExpenseModal;
