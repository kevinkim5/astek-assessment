import React from "react";
import { Button, Form } from "antd";

export default function GenericForm(props) {
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
      className="generic-form"
      form={props.form}
      layout={"horizontal"}
      onFinish={props.onFinish}
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
          className="cancel-btn"
          htmlType="button"
          onClick={props.handleCancel}
        >
          Cancel
        </Button>
      </Form.Item>
    </Form>
  );
}
