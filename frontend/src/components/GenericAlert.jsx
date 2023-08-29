import React from "react";
import { Alert } from "antd";

export default function GenericAlert(props) {
  return (
    <Alert
      className="alert"
      message={props.message}
      description={props.description}
      showIcon={props.showIcon}
      type={props.type}
    />
  );
}

GenericAlert.defaultProps = {
  message: "",
  description: "",
  showIcon: true,
  type: "error",
};
