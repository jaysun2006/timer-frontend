import { Button, Form, Icon, Input } from "antd";
import "antd/dist/antd.css";
import React from "react";
import {
  EMAIL,
  PASSWORD1,
  PASSWORD2,
  USERNAME,
} from "../../../constants/dataKeys";

const FormItem = Form.Item;

class SignupForm extends React.Component {
  state = {
    isLoading: false,
    username: null,
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let that = this;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let data = {
          [EMAIL]: values.email,
          [PASSWORD1]: values.password,
          [PASSWORD2]: values.password,
          [USERNAME]: values.username,
        };
        that.props.signup(data);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem
          name="username"
          rules={[{ required: true, message: "Username is required" }]}
        >
          {getFieldDecorator("username", {
            rules: [{ required: true, message: "Please input your username!" }],
          })(
            <Input
              size="large"
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Username"
            />
          )}
        </FormItem>

        <FormItem
          name="email"
          rules={[{ required: true, message: "Email is required" }]}
        >
          {getFieldDecorator("email", {
            rules: [{ required: true, message: "Please enter your mail!" }],
          })(
            <Input
              size="large"
              prefix={<Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Email"
            />
          )}
        </FormItem>

        <FormItem
          name="password"
          rules={[{ required: true, message: "Password is required" }]}
        >
          {getFieldDecorator("password", {
            rules: [{ required: true, message: "Please input your Password!" }],
          })(
            <Input
              size="large"
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Password"
            />
          )}
        </FormItem>

        <FormItem>
          <Button
            size="large"
            loading={this.state.changePassLoading}
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Register
          </Button>
        </FormItem>
        <Form.Item>
          <Button type="link" onClick={() => this.props.changeForm(false)}>
            Already have an account? Login
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default SignupForm;
