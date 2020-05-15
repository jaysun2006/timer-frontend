import { Col, Form, Layout, Row } from "antd";
import React from "react";
import "../../assets/auth.css";
import LoginForm from "./forms/LoginForm";
import SignupForm from "./forms/SignupForm";

class Auth extends React.Component {
  render() {
    const LoginFormLayout = Form.create()(LoginForm);
    const SignUpFormLayout = Form.create()(SignupForm);
    return (
      <Layout className="loginLayout">
        <Row>
          <Col
            xs={{ span: 20, offset: 2 }}
            sm={{ span: 16, offset: 4 }}
            md={{ span: 12, offset: 6 }}
            lg={{ span: 8, offset: 8 }}
            xl={{ span: 8, offset: 8 }}
            style={{ padding: "35px" }}
          ></Col>
          <Col
            xs={{ span: 20, offset: 2 }}
            sm={{ span: 16, offset: 4 }}
            md={{ span: 12, offset: 6 }}
            lg={{ span: 8, offset: 8 }}
            xl={{ span: 8, offset: 8 }}
            style={{ padding: "35px" }}
          >
            <div className="loginFormWrapper">
              <img
                src={"https://bookmanager.s3.us-east-2.amazonaws.com/prod.png"}
                alt=""
                style={{ width: "30%", padding: 20, textAlign: "center  " }}
              />
              <span style={{ fontSize: "large", fontWeight: "bold" }}>
                Productivity & Time Tracker
              </span>
              {this.props.register ? (
                <SignUpFormLayout
                  {...this.props}
                  signup={this.props.signup}
                  changeForm={this.props.changeForm}
                />
              ) : (
                <LoginFormLayout
                  {...this.props}
                  login={this.props.login}
                  changeForm={this.props.changeForm}
                />
              )}
            </div>
          </Col>
        </Row>
      </Layout>
    );
  }
}
export default Auth;
