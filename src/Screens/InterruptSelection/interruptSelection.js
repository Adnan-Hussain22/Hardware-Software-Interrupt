import React from "react";
import { Modal, Button, Input } from "antd";
import "antd/dist/antd.css";
import "./interruptSelection.css";
import $ from "jquery";
const Search = Input.Search;
class InterruptSelection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prosessModel: false,
      processes: 0,
      interruptType: null
    };
  }

  componentDidMount() {
    this.handleStartAnimation();
  }

  handleStartAnimation = () => {
    setTimeout(() => {
      const header = document.getElementById("interruptHeader");
      header.style = "margin-top:0px";
    }, 800);
    setTimeout(() => {
      const header = document.getElementById("interruptHeader");
      this.handleAnimateHeader(header);
    }, 2500);
  };

  handleAnimateHeader = header => {
    header.style = "height: 60px; margin-top:0px";
    header.classList.add("animationEnd");
  };

  handleInterruptSelection = type => {
    switch (type) {
      case "Hardware Interrupt": {
        this.setState({
          prosessModel: true,
          interruptType: "Hardware Interrupt"
        });
        break;
      }
      case "Software Interrupt": {
        this.setState({
          prosessModel: true,
          interruptType: "Software Interrupt"
        });
        break;
      }
      default: {
        return;
      }
    }
  };

  handleProcessesSelected = () => {
    const { processes, interruptType } = this.state;
    if (interruptType && processes) {
      this.props.handleInputProcesses(interruptType, processes);
    }
  };

  handleProcessesInputChange = e => {
    const number = Number(e.target.value);
    if (number && number != NaN) {
      this.setState({ processes: number });
    } else {
      this.setState({ processes: "" });
    }
  };

  render() {
    const { prosessModel } = this.state;
    return (
      <div>
        {this.renderInterrruptSelection()}
        {prosessModel && this.renderProcessModel()}
      </div>
    );
  }

  renderInterrruptSelection = () => {
    return (
      <div className="interrrupt-selection">
        {this.renderHeader()}
        {this.renderMainContent()}
      </div>
    );
  };

  renderHeader = () => {
    return (
      <div className="header" id="interruptHeader">
        <h3 style={{ color: "white", fontWeight: "800" }}>
          INTERRUPT HANDLING
        </h3>
      </div>
    );
  };

  renderMainContent = () => {
    // const {
    //   handleStartSoftwareInterrupt,
    //   handleStartHardwareInterrupt
    // } = this.props;
    return (
      <div className="row">
        <div className="container">
          <div className="selection col-md-10 col-lg-10 col-sm-12">
            <div className="interrupt-type">
              <span style={{ fontWeight: "900" }}>SELECT</span> INTERRUPT TYPE
            </div>
            <div className="border-vertical" />
            <div className="row">
              <div className="border-container container col-md-10 col-lg-10 col-sm-12" />
            </div>
            <div className="interrupt-options container">
              <div
                className="software-interrupt"
                onClick={() => {
                  this.handleInterruptSelection("Software Interrupt");
                }}
              >
                Software Interrupt
              </div>
              <div
                className="hardware-interrupt"
                onClick={() => {
                  this.handleInterruptSelection("Hardware Interrupt");
                }}
              >
                Hardware Interrupt
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  renderProcessModel = () => {
    const { prosessModel, processes } = this.state;
    return (
      <div className="process-model" id="processModal">
        {/* <input
              placeholder="processes..."
              onChange={this.handleProcessesInputChange}
            /> */}
        <Modal
          className="process-model"
          visible={prosessModel}
          title="Title"
          onOk={() => {
            this.setState({ prosessModel: false });
          }}
          onCancel={() => {
            this.setState({ prosessModel: false });
          }}
          footer={null}
        >
          <h4 style={{ textAlign: "center", color: "red" }}>
            ENTER NUMBER OF PROCESSES
          </h4>
          <div className="process-container">
            <div className="input-processes">
              <input
                placeholder="processes.."
                onChange={this.handleProcessesInputChange}
                value={processes}
              />
            </div>
            <button onClick={this.handleProcessesSelected}>GO</button>
          </div>
        </Modal>
      </div>
    );
  };
}

export default InterruptSelection;
