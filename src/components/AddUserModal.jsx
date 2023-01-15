import { Button, Form, Input, Modal, Select } from "antd";
import axios from "axios";
import { useState } from "react";

const hobbies = [
  {
    value: "gaming",
    label: "gaming",
  },
  {
    value: "bowling",
    label: "bowling",
  },
];

const AddUserModal = ({ open, setOpen }) => {
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const onFinish = (values) => {
    setConfirmLoading(true);
    form.resetFields();
    console.log("Received values of form: ", values);
    axios
      .post(process.env.REACT_APP_API_URL + "/users", values)
      .then((res) => {
        setOpen(false);
        setConfirmLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setConfirmLoading(false);
      });
  };
  const handleOk = () => form.submit();
  const handleCancel = () => {
    console.log("Clicked cancel button");
    form.resetFields();
    setOpen(false);
  };
  return (
    <>
      <Modal
        title="Add New User"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Return
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={confirmLoading}
            onClick={handleOk}
          >
            Submit
          </Button>,
        ]}
      >
        <Form layout="vertical" form={form} name="newUser" onFinish={onFinish}>
          <Form.Item
            name="name"
            label="Name"
            required
            rules={[
              {
                required: true,
                message: "Please input your name!",
              },
              {
                pattern: new RegExp("^[a-zA-Z ]{2,30}$"),
                message: "Please input a valid name!",
              },
            ]}
          >
            <Input placeholder="John Doe" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            required
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input type="email" placeholder="john.doe@gmail.com" />
          </Form.Item>
          <Form.Item
            name="phoneNumber"
            label="Phone Number"
            required
            rules={[
              {
                required: true,
                message: "Please input your phone number!",
              },
              {
                pattern: new RegExp("^[0-9]{10}$"),
                message: "Please input a valid phone number!",
              },
            ]}
          >
            <Input type="number" placeholder="123456790" />
          </Form.Item>
          <Form.Item
            name="hobbies"
            label="Hobbies"
            required
            rules={[
              {
                type: "array",
                required: true,
                message: "Please select your hobbies!",
              },
            ]}
          >
            <Select
              mode="tags"
              style={{
                width: "100%",
              }}
              placeholder="Select Hobbies"
              onChange={(value) => console.log(value)}
              options={hobbies}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default AddUserModal;
