import React, { useEffect, useState } from "react";
import { AutoComplete, Form, Input, notification } from "antd";
import { useSelector } from "react-redux";
import store from "../../store";
import { cafesDelete, fetchCafes } from "./cafeSlice";
import { handlePostAPI, handlePUTAPI } from "../../api/APIHandlers";
import GenericModal from "../../components/GenericModal";
import GenericForm from "../../components/GenericForm";
import {
  validateParaLength,
  validateStringLength,
} from "../../utilities/formValidatorUtils";

const { TextArea } = Input;

export default function CafeModal(props) {
  const { modalType } = props;
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();

  const [formData, setFormData] = useState({
    Description: "",
    id: "",
    location: "",
    Name: "",
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

  const handleFormSubmit = async () => {
    try {
      let description = "";
      let notifTitle = "";

      if (props.modalType === "Add") {
        let addFormData = new FormData();
        Object.keys(formData).forEach((key) => {
          addFormData.append(key, formData[key]);
        });

        description = `Added new cafe: ${formData.Name}`;
        notifTitle = "Add Success!";

        await handlePostAPI(
          `${process.env.REACT_APP_API_URL_DEV}/cafes/add`,
          addFormData
        );
      } else if (props.modalType === "Delete") {
        let deleteFormData = new FormData();
        deleteFormData.append("id", formData.id);

        description = `Deleted data for: ${formData["Name"]}`;
        notifTitle = "Delete Success!";

        await handlePostAPI(
          `${process.env.REACT_APP_API_URL_DEV}/cafes/delete`,
          deleteFormData
        );
        store.dispatch(cafesDelete(formData.location));
      } else if (props.modalType === "Edit") {
        description = `Saved changes for: ${formData["Name"]}`;
        notifTitle = "Update Success!";
        await handlePUTAPI(
          `${process.env.REACT_APP_API_URL_DEV}/cafes/`,
          formData
        );
      }

      store.dispatch(fetchCafes());
      handleCancel();
      openNotification("success", notifTitle, description);
    } catch (err) {
      console.log(err);
      alert(err);
    }
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
    <GenericModal open={props.modalOpen} title={`${modalType} Cafe`}>
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
            Confirm to delete Cafe: {formData.name}?
          </div>
        ) : (
          <>
            <Form.Item
              label="Name"
              name="Name"
              rules={[
                { required: true, message: "Please input cafe name!" },
                { validator: validateStringLength },
              ]}
              valuePropName="Name"
            >
              <Input
                maxLength={10}
                onChange={(e) => {
                  handleInputChange("Name", e.target.value);
                }}
                placeholder="Name"
                value={formData["Name"]}
              />
            </Form.Item>
            <Form.Item
              label="Description"
              name="Description"
              rules={[{ validator: validateParaLength }]}
              valuePropName="Description"
            >
              <TextArea
                maxLength={256}
                onChange={(e) =>
                  handleInputChange("Description", e.target.value)
                }
                showCount
                value={formData.Description}
              />
            </Form.Item>
            <Form.Item label="Logo">
              <Input placeholder="input placeholder" />
            </Form.Item>

            <Form.Item
              label="Location"
              name="Location"
              valuePropName="Location"
            >
              <AutoComplete
                options={props.locationOptions.filter(
                  (item) => item.label !== "Select All"
                )}
                onChange={(value) => handleInputChange("Location", value)}
                placeholder="input here"
                value={formData["Location"]}
              />
            </Form.Item>
          </>
        )}
      </GenericForm>
    </GenericModal>
  );
}
