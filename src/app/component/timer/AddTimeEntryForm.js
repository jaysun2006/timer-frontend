import { Button, Form, Input } from "antd";
import React from "react";
import { ENTRY_LIST_API, ENTRY_COMPLETE_API } from "../../constants/api";
import { SUCCESS_MSG_TYPE } from "../../constants/dataKeys";
import {
  displayMessage,
  interpolate,
  postAPI,
  putAPI,
} from "../../utils/common";

export default class AddTimeEntryForm extends React.Component {
  state = {
    loading: false,
    initialValues: this.props.initialValues || null,
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let reqData = { ...values };
        this.setState({
          loading: true,
        });
        let successFn = (data) => {
          displayMessage(SUCCESS_MSG_TYPE, "Time Entry Created Successfully!");
          this.setState({
            loading: false,
          });
          if (this.props.successFn) this.props.successFn(data);
        };
        let errorFn = () => {
          this.setState({
            loading: false,
          });
        };
        if (this.state.initialValues) {
          putAPI(
            interpolate(ENTRY_COMPLETE_API, [this.state.initialValues.id]),
            reqData,
            successFn,
            errorFn
          );
        } else {
          postAPI(ENTRY_LIST_API, reqData, successFn, errorFn);
        }
      } else {
        console.error(err);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item label={"Task Name"}>
          {getFieldDecorator("task", {
            initialValue: this.state.initialValues
              ? this.state.initialValues.title
              : "",
            rules: [
              {
                required: true,
                message: "Please Input Task Name!",
                whitespace: true,
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label={"Project"}>
          {getFieldDecorator("project", {
            initialValue: this.state.initialValues
              ? this.state.initialValues.description
              : "",
            rules: [
              {
                message: "Please Select Project from List !",
                whitespace: true,
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" loading={this.state.loading}>
            Start Project
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
