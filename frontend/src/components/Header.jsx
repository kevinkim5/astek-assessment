import React, { useState } from "react";
import { Button, Col, Row, Typography } from "antd";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

export default function Header() {
  let time = new Date().toLocaleTimeString();
  const navigate = useNavigate();
  const [ctime, setTime] = useState(time);

  const UpdateTime = () => {
    time = new Date().toLocaleTimeString();
    setTime(time);
  };
  setInterval(UpdateTime);

  return (
    <Row className="header">
      <Col xs={13} md={13} xl={13} className="title-wrapper">
        <Title level={4} className="title">
          Cafe Employee Management System
        </Title>
      </Col>
      <Col xs={8} md={8} xl={8} className="nav-wrapper">
        <Button
          className="nav-button item-center-center"
          icon={<img src={"/coffee.png"} height="20px" />}
          onClick={() => navigate("/")}
        >
          Cafes
        </Button>
        <Button
          className="nav-button item-center-center"
          icon={<img src={"/employees.png"} height="20px" />}
          onClick={() => navigate("/employees")}
        >
          Employees
        </Button>
      </Col>
      <Col xs={3} md={3} xl={3} className="clock-wrapper">
        <div className="clock-item item-center-center">
          {new Date().toLocaleDateString("en-SG", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </div>
        <div className="clock-item item-center-center">{ctime}</div>
      </Col>
    </Row>
  );
}
