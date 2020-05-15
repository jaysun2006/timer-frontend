import { Layout } from "antd";
import moment from "moment";
import React, { Component } from "react";
import Auth from "./app/component/auth/Auth";
import AppBase from "./app/component/core/AppBase";
import { SUCCESS_MSG_TYPE } from "./app/constants/dataKeys";
import {
  loggedInUser,
  logInUser,
  logOutUser,
  singUpUser,
} from "./app/utils/auth";
import { displayMessage } from "./app/utils/common";

class App extends Component {
  state = {
    user: loggedInUser(),
    register: false,
  };

  componentDidMount() {
    moment.locale("en");
  }

  changeFormState = (flag) => {
    this.setState({ register: flag });
  };

  login = (data) => {
    let successFn = () => {
      let user = loggedInUser();
      this.setState({
        user: user,
      });
    };
    let errorFn = () => {};
    logInUser(data, successFn, errorFn);
  };

  signUp = (data) => {
    let successFn = () => {
      this.setState(
        {
          register: false,
        },
        () => {
          displayMessage(
            SUCCESS_MSG_TYPE,
            "You have been registered Successfully!"
          );
        }
      );
    };
    let errorFn = () => {};
    singUpUser(data, successFn, errorFn);
  };

  logout = () => {
    let successFn = () => {
      this.setState({
        user: null,
      });
    };
    let errorFn = () => {};
    logOutUser(successFn, errorFn);
  };

  render() {
    return (
      <Layout>
        {this.state.user ? (
          <AppBase {...this.state} logout={this.logout} />
        ) : (
          <Auth
            {...this.state}
            login={this.login}
            signup={this.signUp}
            register={this.state.register}
            changeForm={this.changeFormState}
          />
        )}
      </Layout>
    );
  }
}

export default App;
