import React, { useEffect, useState } from "react";
import { Form, Input, notification, Radio, Select } from "antd";
import { useSelector } from "react-redux";
import store from "../../store";
import { fetchEmployees } from "./employeesSlice";
import { handlePUTAPI, handlePostAPI } from "../../api/APIHandlers";
import GenericModal from "../../components/GenericModal";
import GenericForm from "../../components/GenericForm";
import { fetchCafes } from "../cafes/cafeSlice";
import { validateStringLength } from "../../utilities/formValidatorUtils";

export default function EmployeeModal(props) {
  const { modalType } = props;
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();

  const cafeList = useSelector((state) => state.cafes.cafeList);
  const [formData, setFormData] = useState({
    "Cafe ID": "",
    "Employee ID": "",
    Name: "",
    "Email Address": "",
    "Phone Number": "",
    Gender: "",
  });

  const handleCancel = () => {
    props.handleCancel();
    form.resetFields();
    setFormData({});
  };

  const handleFieldsChange = (e) => {
    let tempData = {};
    e.forEach((change) => {
      tempData = {
        ...tempData,
        [change.name[0]]: change.value,
      };
    });
  };

  const handleFormSubmit = async () => {
    try {
      let description = "";
      let notifTitle = "";

      if (modalType === "Add") {
        let addFormData = new FormData();
        Object.keys(formData).forEach((key) => {
          addFormData.append(key, formData[key]);
        });
        description = `Added new employee: ${formData.Name}`;
        notifTitle = "Add Success!";

        await handlePostAPI(
          `${process.env.REACT_APP_API_URL_DEV}/employees/add`,
          addFormData
        );
      } else if (modalType === "Delete") {
        let deleteFormData = new FormData();

        description = `Deleted data for: ${formData["Name"]}`;
        notifTitle = "Delete Success!";

        deleteFormData.append("Employee ID", formData["Employee ID"]);
        await handlePostAPI(
          `${process.env.REACT_APP_API_URL_DEV}/employees/delete`,
          deleteFormData
        );
      } else if (modalType === "Edit") {
        description = `Saved changes for: ${formData["Name"]}`;
        notifTitle = "Update Success!";

        await handlePUTAPI(
          `${process.env.REACT_APP_API_URL_DEV}/employees/`,
          formData
        );
      }
      store.dispatch(fetchEmployees());
      store.dispatch(fetchCafes());
      handleCancel();
      openNotification("success", notifTitle, description);
    } catch (err) {
      console.log(err);
      alert(err);
    }
  };

  const handleInputChange = (key, value) => {
    setFormData((prevState) => {
      form.setFieldsValue({
        ...prevState,
        [key]: value,
      });
      return {
        ...prevState,
        [key]: value,
      };
    });
  };

  const openNotification = (type, title, description) => {
    api[type]({
      message: title,
      description: description,
    });
  };

  useEffect(() => {
    if (props.modalOpen) {
      setFormData({ ...props.modalData });
      form.setFieldsValue({
        ...props.modalData,
      });
    }
  }, [props.modalOpen]);

  return (
    <GenericModal open={props.modalOpen} title={`${modalType} Employee`}>
      {contextHolder}
      <GenericForm
        form={form}
        formType={modalType}
        handleCancel={handleCancel}
        onChange={handleFieldsChange}
        onFinish={handleFormSubmit}
      >
        {modalType === "Delete" ? (
          <div style={{ marginBottom: "10px" }}>
            Confirm to delete Employee: {formData.Name}?
          </div>
        ) : (
          <>
            <Form.Item
              label="Name"
              name="Name"
              rules={[
                { required: true, message: "Please input employee name!" },
                { validator: validateStringLength },
              ]}
              valuePropName="Name"
            >
              <Input
                onChange={(e) => {
                  handleInputChange("Name", e.target.value);
                }}
                value={formData["Name"]}
              />
            </Form.Item>
            <Form.Item
              label="Email Address"
              name="Email Address"
              rules={[
                {
                  type: "email",
                  message: "Please input a valid email!",
                },
                {
                  required: true,
                  message: "Please input employee e-mail!",
                },
              ]}
              valuePropName="Email Address"
            >
              <Input
                onChange={(e) =>
                  handleInputChange("Email Address", e.target.value)
                }
                value={formData["Email Address"]}
              />
            </Form.Item>
            <Form.Item
              label="Phone Number"
              name="Phone Number"
              rules={[
                {
                  required: true,
                  message: "Please input employee phone number!",
                },
                {
                  pattern: /^[89]\d{7}$/,
                  message: "Please input a valid phone number!",
                },
              ]}
              valuePropName="Phone Number"
            >
              <Input
                onChange={(e) =>
                  handleInputChange("Phone Number", e.target.value)
                }
                value={formData["Phone Number"]}
              />
            </Form.Item>
            <Form.Item
              label="Gender"
              name="Gender"
              rules={[
                { required: true, message: "Please input employee gender!" },
              ]}
              valuePropName="Gender"
            >
              <Radio.Group
                onChange={(e) => handleInputChange("Gender", e.target.value)}
                value={formData.Gender}
              >
                <Radio value="F"> Female </Radio>
                <Radio value="M"> Male </Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              label="Assigned Cafe"
              name="Assigned Cafe"
              rules={[{ required: true, message: "Please assign a cafe!" }]}
              valuePropName="Assigned Cafe"
            >
              <Select
                onChange={(value) => handleInputChange("Assigned Cafe", value)}
                options={cafeList}
                value={formData["Assigned Cafe"]}
              />
            </Form.Item>
          </>
        )}
      </GenericForm>
    </GenericModal>
  );
}
