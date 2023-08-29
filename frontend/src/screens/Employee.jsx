import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Col, Row, Typography } from "antd";
import { useSearchParams } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import store from "../store";

import EmployeeModal from "../features/employees/EmployeeModal";
import { fetchEmployees } from "../features/employees/employeesSlice";
import GenericSpinner from "../components/GenericSpinner";
import GenericAlert from "../components/GenericAlert";

const { Title } = Typography;

const defaultModalData = {
  "Cafe ID": "",
  "Employee ID": "",
  name: "",
  "Email Address": "",
  "Phone Number": "",
  gender: "",
};

export default function Employee() {
  const [searchParams] = useSearchParams();
  const cafeSearch = searchParams.get("cafe");

  const employeeData = useSelector((state) => state.employees.data);
  const employeeError = useSelector((state) => state.employees.error);
  const loadingStatus = useSelector((state) => state.employees.loading);

  const [modalData, setModalData] = useState(defaultModalData);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("Edit");

  const handleCellBtnClick = (props, type) => {
    const { data } = props.node;

    setModalType(() => {
      setModalData(data);
      return type;
    }, handleModalOpen());
  };

  const handleModalClose = () => setModalOpen(false);
  const handleModalOpen = () => setModalOpen(true);

  useEffect(() => {
    store.dispatch(fetchEmployees(cafeSearch === null ? "" : cafeSearch));
  }, []);

  const columnDefs = useMemo(
    () => [
      {
        field: "Employee ID",
        cellStyle: { textAlign: "left" },
        sortable: true,
      },
      { field: "Name", cellStyle: { textAlign: "left" }, sortable: true },
      {
        field: "Email Address",
        cellStyle: { textAlign: "left" },
        sortable: true,
      },
      { field: "Phone Number", cellStyle: { textAlign: "left" } },
      {
        field: "Days Worked",
        cellStyle: { textAlign: "left" },
        filter: "agSetColumnFilter",
        sortable: true,
      },
      { field: "Cafe Name", cellStyle: { textAlign: "left" } },
      {
        field: "edit",
        cellRenderer: (props) => (
          <Button onClick={() => handleCellBtnClick(props, "Edit")}>
            Edit
          </Button>
        ),
        cellStyle: { textAlign: "left" },
        editable: false,
        width: 100,
      },
      {
        field: "delete",
        cellRenderer: (props) => (
          <Button onClick={() => handleCellBtnClick(props, "Delete")}>
            Delete
          </Button>
        ),
        cellStyle: { textAlign: "left" },
        editable: false,
        width: 120,
      },
    ],
    []
  );

  return (
    <div className="content">
      {loadingStatus ? (
        <GenericSpinner />
      ) : employeeError ? (
        <GenericAlert
          message="Error Loading Employee Data"
          description="Please reload the page or try again later."
        />
      ) : (
        <>
          <Row className="title-wrapper">
            <Col xs={8} md={8} lg={8}>
              <Title className="title">Employee Management</Title>
            </Col>

            <Button
              onClick={() => {
                setModalType(() => {
                  setModalData(defaultModalData);
                  return "Add";
                }, handleModalOpen());
              }}
            >
              Add Employee
            </Button>
          </Row>
          <EmployeeModal
            handleCancel={handleModalClose}
            modalData={modalData}
            modalOpen={modalOpen}
            modalType={modalType}
          />
          <Row className="content-wrapper">
            <AgGridReact
              className="ag-theme-alpine data-table"
              columnDefs={columnDefs}
              rowData={employeeData}
            ></AgGridReact>
          </Row>
        </>
      )}
    </div>
  );
}
