import React from "react";
import { Modal } from "antd";

export default function GenericModal(props) {
  return (
    <Modal
      cancelButtonProps={{ style: { display: "none" } }}
      closable={false}
      okButtonProps={{ style: { display: "none" } }}
      open={props.open}
      title={props.title}
    >
      {props.children}
    </Modal>
  );
}
