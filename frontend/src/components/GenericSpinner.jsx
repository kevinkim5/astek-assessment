import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const antIcon = <LoadingOutlined style={{ fontSize: 40 }} spin />;

export default function GenericSpinner() {
  return (
    <div className="spinner">
      <Spin indicator={antIcon} />
    </div>
  );
}
