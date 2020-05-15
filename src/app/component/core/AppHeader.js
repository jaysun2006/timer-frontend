import React from "react";
import { Icon, Layout, Tooltip } from "antd";

const { Header } = Layout;
export default class AppHeader extends React.Component {
  render() {
    return (
      <Header
        style={{
          background: "white",
          boxShadow: "rgba(38, 50, 69, 0.2) 0px 2px 4px 0px",
        }}
      >
        <img
          src={"https://bookmanager.s3.us-east-2.amazonaws.com/prod.png"}
          alt=""
          style={{ width: 50 }}
        />
        <Tooltip title={"Log Out"}>
          <Icon
            type="logout"
            style={{
              padding: 15,
              float: "right",
              fontSize: 30,
              cursor: "pointer",
            }}
            onClick={() => this.props.logout()}
          />
        </Tooltip>
      </Header>
    );
  }
}
