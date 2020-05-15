import { Button, Card, Col, Modal, Row } from "antd";
import * as moment from "moment";
import React from "react";
import Timer from "react-compound-timer";
import { ENTRY_COMPLETE_API } from "../../constants/api";
import { ERROR_MSG_TYPE, SUCCESS_MSG_TYPE } from "../../constants/dataKeys";
import { displayMessage, interpolate, postAPI } from "../../utils/common";

const confirm = Modal.confirm;

export default class CurrentRunningEntry extends React.Component {
  state = {
    showAddModal: false,
    activeEntry: this.props.activeEntry,
  };

  toggleModal = (option) => {
    this.setState({
      showAddModal: !!option,
    });
  };

  componentDidUpdate(prevProps) {
    if (this.props.activeEntry.id !== prevProps.activeEntry.id) {
      this.setState({
        activeEntry: this.props.activeEntry,
      });
    }
  }

  completeEntry = () => {
    let successFn = () => {
      displayMessage(SUCCESS_MSG_TYPE, "Time Entry Completed Successfully!!");
      this.props.loadTimeEntryList();
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
          interpolate(ENTRY_COMPLETE_API, [this.state.activeEntry.id]),
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
    var time = moment.duration(
      +moment().diff(moment(this.state.activeEntry.start_datetime))
    );

    return (
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
                style={{ marginBottom: 10, textAlign: "center" }}
              >
                <Col span={24}>
                  {moment(this.state.activeEntry.start_datetime).format(
                    "dddd, L"
                  )}
                </Col>
              </Row>
              <Row style={{ marginBottom: 10, textAlign: "center" }}>
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
    );
  }
}
