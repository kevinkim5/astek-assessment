import React, { useRef } from "react";
import { Button, Form } from "antd";

export default function GenericForm(props) {
  // const formRef = useRef(null);
  const [form] = Form.useForm();

  const formItemLayout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 18,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };

  return (
    <Form
      {...formItemLayout}
      form={props.form}
      // ref={props.formRef}
      layout={"horizontal"}
      onFinish={props.onFinish}
      style={{ maxWidth: 600 }}
      onFieldsChange={(_, allFields) => {
        props.onChange(allFields);
      }}
    >
      {props.children}
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          {props.formType === "Add"
            ? "Add"
            : props.formType === "Edit"
            ? "Save Changes"
            : "Delete"}
        </Button>
        <Button
          htmlType="button"
          onClick={props.handleCancel}
          style={{ marginLeft: "10px" }}
        >
          Cancel
        </Button>
      </Form.Item>
    </Form>
  );
}
