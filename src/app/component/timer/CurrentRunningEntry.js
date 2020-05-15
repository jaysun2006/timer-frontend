import { Button, Card, Col, Modal, Row } from "antd";
import * as moment from "moment";
import React from "react";
import Timer from "react-compound-timer";
import { ACTIVE_ENTRY_LIST_API, ENTRY_COMPLETE_API } from "../../constants/api";
import { ERROR_MSG_TYPE, SUCCESS_MSG_TYPE } from "../../constants/dataKeys";
import {
  displayMessage,
  getAPI,
  interpolate,
  postAPI,
} from "../../utils/common";
import AddTimeEntry from "./AddTimeEntry";

const confirm = Modal.confirm;

export default class CurrentRunningEntry extends React.Component {
  state = {
    showAddModal: false,
    activeEntry: null,
  };

  toggleModal = (option) => {
    this.setState({
      showAddModal: !!option,
    });
  };

  componentDidMount() {
    this.loadActiveEntryList();
  }

  loadActiveEntryList = () => {
    let successFn = (data) => {
      if (data) {
        this.setState({
          activeEntry: data,
        });
      } else {
        this.setState({
          activeEntry: null,
        });
      }
    };
    let errorFn = () => {};
    getAPI(ACTIVE_ENTRY_LIST_API, successFn, errorFn);
  };

  completeEntry = () => {
    var that = this;
    let successFn = () => {
      this.setState(
        {
          activeEntry: null,
        },
        () => {
          that.props.loadTimeEntryList();
        }
      );
      displayMessage(SUCCESS_MSG_TYPE, "Time Entry Completed Successfully!!");
    };
    let errorFn = () => {
      displayMessage(ERROR_MSG_TYPE, "Something went wrong!!");
      this.props.loadTimeEntryList();
    };
    confirm({
      title: "Are you sure end this entry?",
      content: "This process can not be undone",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        postAPI(
          interpolate(ENTRY_COMPLETE_API, [that.state.activeEntry.id]),
          {},
          successFn,
          errorFn
        );
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  render() {
    if (this.state.activeEntry) {
      var time = moment.duration(
        +moment().diff(moment(this.state.activeEntry.start_datetime))
      );
    }

    return (
      <Col
        xs={{ span: 24 }}
        sm={{ span: 24 }}
        md={{ span: 18, offset: 3 }}
        lg={{ span: 16, offset: 4 }}
        xl={{ span: 12, offset: 6 }}
      >
        {this.state.activeEntry ? (
          <div style={{ marginBottom: 10 }}>
            <Row>
              <Col
                xs={{ span: 20, offset: 2 }}
                sm={{ span: 20, offset: 2 }}
                md={{ span: 18, offset: 3 }}
                lg={{ span: 16, offset: 4 }}
                xl={{ span: 12, offset: 6 }}
              >
                <Card
                  title={`Task: ${this.state.activeEntry.task}`}
                  extra={
                    <Button
                      type={"danger"}
                      onClick={this.completeEntry}
                      icon={"stop"}
                    >
                      Stop
                    </Button>
                  }
                >
                  <Row
                    gutter={16}
                    style={{
                      marginBottom: 10,
                      textAlign: "center",
                    }}
                  >
                    <Col span={24}>
                      {moment(this.state.activeEntry.start_datetime).format(
                        "dddd, LL"
                      )}
                    </Col>
                  </Row>
                  <Row
                    style={{
                      marginBottom: 10,
                      textAlign: "center",
                    }}
                  >
                    <Col span={24}>
                      <React.Fragment>
                        <h3>
                          <Timer initialTime={time.asMilliseconds()}>
                            <Timer.Days />
                            D&nbsp;:&nbsp;
                            <Timer.Hours />
                            H&nbsp;:&nbsp;
                            <Timer.Minutes />
                            M&nbsp;:&nbsp;
                            <Timer.Seconds />S
                          </Timer>
                        </h3>
                      </React.Fragment>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          </div>
        ) : (
          <AddTimeEntry loadActiveEntryList={this.loadActiveEntryList} />
        )}
      </Col>
    );
  }
}
