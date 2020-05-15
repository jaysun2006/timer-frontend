import { Card, Col, DatePicker, Layout, Row, Table } from "antd";
import moment from "moment";
import React from "react";
import { ENTRY_LIST_API } from "../../constants/api";
import { getAPI } from "../../utils/common";
import CurrentRunningEntry from "../timer/CurrentRunningEntry";
import AppHeader from "./AppHeader";

const { RangePicker } = DatePicker;
const { Content } = Layout;
export default class AppBase extends React.Component {
  state = {
    entryList: [],
    loading: true,
    startTime: moment(),
    endTime: moment(),
  };

  componentDidMount() {
    this.loadTimeEntryList();
  }

  loadTimeEntryList = () => {
    this.setState({
      loading: true,
    });
    let successFn = (data) => {
      if (data && data.length) {
        this.setState({
          entryList: data,
          loading: false,
        });
      } else {
        this.setState({
          entryList: [],
          loading: false,
        });
      }
    };
    let errorFn = () => {
      this.setState({
        loading: false,
      });
    };
    let apiParams = {
      start: this.state.startTime.startOf("day").format("YYYY-MM-DD"),
      end: this.state.endTime.endOf("day").format("YYYY-MM-DD"),
    };
    getAPI(ENTRY_LIST_API, successFn, errorFn, apiParams);
  };

  columns = [
    {
      title: "Task",
      dataIndex: "task",
      key: "task",
    },
    {
      title: "Project",
      dataIndex: "project",
      key: "project",
    },

    {
      title: "Start Time",
      dataIndex: "start_datetime",
      key: "start_datetime",
      render: (item) => moment(item).format("hh:mm A"),
    },
    {
      title: "End Time",
      dataIndex: "end_datetime",
      key: "end_datetime",
      render: (item) => moment(item).format("hh:mm A"),
    },
    {
      title: "Start Date",
      dataIndex: "start_datetime",
      key: "end_datetime",
      render: (item) => moment(item).format("dddd, LL"),
    },
  ];

  updateTimeFilters = (timeArray) => {
    this.setState(
      {
        startTime: timeArray[0],
        endTime: timeArray[1],
      },
      () => {
        this.loadTimeEntryList();
      }
    );
  };

  render() {
    return (
      <Layout>
        <AppHeader {...this.props} />
        <Content
          style={{
            padding: 24,
            margin: 0,
            minHeight: "calc(100vh - 65px)",
          }}
        >
          <Row>
            <CurrentRunningEntry loadTimeEntryList={this.loadTimeEntryList} />
          </Row>
          <Row>
            <Card>
              <Row gutter={16}>
                <Col
                  xs={{ span: 24 }}
                  sm={{ span: 24 }}
                  md={{ span: 16 }}
                  lg={{ span: 16 }}
                  xl={{ span: 16 }}
                >
                  <h2>Complete Task Entries</h2>
                </Col>
                <Col
                  xs={{ span: 24 }}
                  sm={{ span: 24 }}
                  md={{ span: 8 }}
                  lg={{ span: 8 }}
                  xl={{ span: 8 }}
                >
                  <RangePicker
                    value={[this.state.startTime, this.state.endTime]}
                    style={{ float: "right", marginBottom: 10 }}
                    allowClear={false}
                    onChange={this.updateTimeFilters}
                  />
                </Col>
              </Row>
              <Table
                dataSource={this.state.entryList}
                bordered
                scroll={{ x: 1250 }}
                columns={this.columns}
                simple
                size={"small"}
                rowKey={(record) => record.id}
                loading={this.state.loading}
              />
            </Card>
          </Row>
        </Content>
      </Layout>
    );
  }
}
