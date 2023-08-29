import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Col, Row, Select, Typography } from "antd";
import { AgGridReact } from "ag-grid-react";
import { Link } from "react-router-dom";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import store from "../store";
import { cafesLoading, fetchCafes } from "../features/cafes/cafeSlice";
import CafeModal from "../features/cafes/CafeModal";
import GenericSpinner from "../components/GenericSpinner";
import GenericAlert from "../components/GenericAlert";

const { Title } = Typography;

export default function Cafe() {
  const cafesData = useSelector((state) => state.cafes.data);
  const cafeLocations = useSelector((state) => state.cafes.locations);
  const cafeError = useSelector((state) => state.cafes.error);
  const loadingStatus = useSelector((state) => state.cafes.loading);
  // const modalOpen = useSelector((state) => state.cafes.modalOpen);

  const [cafeLocation, setCafeLocation] = useState("Select All");
  const [modalData, setModalData] = useState({
    description: "",
    id: "",
    location: "",
    name: "",
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("Edit");

  const handleModalClose = () => setModalOpen(false);
  const handleModalOpen = () => setModalOpen(true);

  const handleCafeLocChange = (value) => {
    setCafeLocation(value);
    store.dispatch(cafesLoading());
    let location = value;
    if (value === "Select All") {
      location = "";
    }
    store.dispatch(fetchCafes(location));
  };

  const handleCellBtnClick = (props, type) => {
    const { data } = props.node;

    setModalType(() => {
      setModalData(data);
      return type;
    }, handleModalOpen());
  };

  const columnDefs = useMemo(
    () => [
      { field: "Name", sortable: true },
      { field: "Description", sortable: true },
      {
        field: "employees",
        cellRenderer: (props) => (
          <Link to={`/employees?cafe=${props.node.data["Name"]}`}>
            {props.node.data["employees"]}
          </Link>
        ),
        sortable: true,
      },
      {
        field: "Location",

        sortable: true,
      },
      {
        field: "edit",
        cellRenderer: (props) => (
          <Button onClick={() => handleCellBtnClick(props, "Edit")}>
            Edit
          </Button>
        ),
      },
      {
        field: "delete",
        cellRenderer: (props) => (
          <Button onClick={() => handleCellBtnClick(props, "Delete")}>
            Delete
          </Button>
        ),
      },
    ],
    []
  );

  const getLocationOpts = () => {
    let uniqueLocs = [...new Set(cafeLocations)];
    let options = uniqueLocs.map((location) => {
      return {
        label: location,
        value: location,
      };
    });

    return [
      {
        label: "Select All",
        value: "Select All",
      },
      ...options.sort((a, b) => a.label.localeCompare(b.label)),
    ];
  };

  const locationOptions = useMemo(() => getLocationOpts(), [cafeLocations]);

  return (
    <div className="content">
      {loadingStatus ? (
        <GenericSpinner />
      ) : cafeError ? (
        <GenericAlert
          message="Error Loading Cafe Data"
          description="Please reload the page or try again later."
        />
      ) : (
        <>
          <Row className="title-wrapper">
            <Col xs={6} md={6} lg={6}>
              <Title className="title">Cafe</Title>
            </Col>
            <Col
              xs={12}
              md={12}
              lg={12}
              style={{ display: "flex", alignItems: "center" }}
            >
              <div style={{ marginRight: "6px" }}>Select Location: </div>
              <Select
                onChange={handleCafeLocChange}
                options={locationOptions}
                style={{ width: "200px", marginRight: "20px" }}
                value={cafeLocation}
              />
              <Button
                onClick={() => {
                  setModalType(() => {
                    setModalData({
                      description: "",
                      location: "",
                      name: "",
                    });
                    return "Add";
                  }, handleModalOpen());
                }}
              >
                Add Cafe
              </Button>
            </Col>
            <Col xs={6} md={6} lg={6}></Col>
          </Row>

          <CafeModal
            handleCancel={handleModalClose}
            locationOptions={locationOptions}
            modalData={modalData}
            modalOpen={modalOpen}
            modalType={modalType}
          />
          <Row className="content-wrapper">
            <AgGridReact
              className="ag-theme-alpine data-table"
              columnDefs={columnDefs}
              rowData={cafesData}
            ></AgGridReact>
          </Row>
        </>
      )}
    </div>
  );
}
