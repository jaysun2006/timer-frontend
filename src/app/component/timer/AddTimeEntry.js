import { Button, Form, Icon, Modal } from "antd";
import React from "react";
import AddTimeEntryForm from "./AddTimeEntryForm";

export default class AddTimeEntry extends React.Component {
  state = {
    showAddModal: false,
  };

  toggleModal = (option) => {
    this.setState({
      showAddModal: !!option,
    });
  };

  render() {
    let addTimeEntrySuccessFn = () => {
      this.toggleModal(false);
      this.props.loadActiveEntryList();
    };
    const AddTimeEntryFormLayout = Form.create()(AddTimeEntryForm);
    return (
      <div style={{ marginBottom: 10, textAlign: "center" }}>
        <Button
          type={"primary"}
          size={"large"}
          onClick={() => this.toggleModal(true)}
        >
          <Icon type={"plus"} /> Add Time Entry
        </Button>
        <Modal
          onCancel={() => this.toggleModal(false)}
          footer={null}
          visible={this.state.showAddModal}
          title={"Time Entry"}
        >
          <AddTimeEntryFormLayout successFn={addTimeEntrySuccessFn} />
        </Modal>
      </div>
    );
  }
}
