import { Button, Form, Icon, Input } from "antd";
import "antd/dist/antd.css";
import React from "react";
import { PASSWORD, USERNAME } from "../../../constants/dataKeys";

const FormItem = Form.Item;

class LoginForm extends React.Component {
  state = {
    isLoading: false,
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let that = this;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let data = {
          [USERNAME]: values.username,
          [PASSWORD]: values.password,
        };
        that.props.login(data);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
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
        <FormItem>
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
            Log in
          </Button>
        </FormItem>
        <Form.Item style={{ align: "center" }}>
          <Button
            style={{ align: "center" }}
            type="link"
            onClick={() => this.props.changeForm(true)}
          >
            Don't have an account yet? Sign up
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default LoginForm;
