import React from "react";
import { Modal } from "antd";
import "antd/dist/antd.css";
import Queue from "../../Helpers/Queue/Queue";
import { QueueContainer } from "../../Components";
import "./dashboard.css";
import { toast, ToastContainer } from "react-toastify";
import {
  BlockQueueInterruptDark,
  BlockQueueInterruptHandledDark,
  BlockQueueInterruptHandledlight,
  BlockQueueInterruptLight,
  ProcessDipatchedDark,
  ProcessDipatchedLight,
  ProcessTimeoutDark,
  ProcessTimeoutLight
} from "../../Helpers/Assets";
import "react-toastify/dist/ReactToastify.css";
export default class Dasboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Ready_Queue: new Queue(),
      Block_Queue: new Queue(),
      no_Ofprocesses: props.processes || 5000,
      interruptType: props.interruptType,
      processor: null,
      timeoutTimer: null,
      blockTimer: null,
      systemTimer: null,
      timeOutActive: false,
      interruptHandledActive: false,
      blockqueueActive: false,
      processDispatchActice: false,
      systemEnd: false
    };
  }

  componentDidMount() {
    // const { no_Ofprocesses, Ready_Queue } = this.state;
    // for (let i = 0; i < no_Ofprocesses; i++) {
    //   const number = i + 1;
    //   Ready_Queue.Enqueue({
    //     processId: number,
    //     processName: `Process # ${number}`,
    //     executionCount: Math.ceil(Math.random() * 10)
    //   });
    // }
    // const currentProcess = Ready_Queue.Dequeue();
    // this.setState({
    //   processor: currentProcess,
    //   timeoutTimer: setInterval(this.handleTimout, 5000),
    //   blockTimer: setInterval(this.handleReleaseProcess, 5000),
    //   systemTimer: setInterval(this.handlecheckSystemStatus, 20),
    //   processorLoader: document.getElementById("processorLoader"),
    //   processorLoaderIncreasing: false
    // });
    // this.handleCreateNotification(
    //   "info",
    //   `${currentProcess.processName} Exectution Started`
    // );
  }

  handleDispatchingToProcessor = process => {
    const {
      processorLoaderIncreasing,
      processorLoader,
      processorLoaderWidth
    } = this.state;
    console.log("Process Dispatche:=>", process);
    // this.handleCreateNotification("info",`${process.processName} Execution Started`);
    // this.handleCreateNotification(
    //   "info",
    //   `${process.processName} Exectution Started`
    // );
    this.setState({ processor: process });
    setTimeout(() => {
      this.setState({ processDispatchActice: true });
    }, 400);
    setTimeout(() => {
      this.setState({ processDispatchActice: false });
    }, 2000);
  };

  handleTimout = () => {
    console.log("timeOut*****");
    const { processor, Ready_Queue } = this.state;
    if (processor) {
      if (processor.executionCount) {
        processor.executionCount--;
        console.log(processor);
        Ready_Queue.Enqueue(processor);
        this.setState({ Ready_Queue, processor, timeOutActive: true });
        setTimeout(() => {
          this.setState({ timeOutActive: false });
        }, 1000);
        // this.handleCreateNotification(
        //   "warning",
        //   `${processor.processName} Timeout`
        // );
      } else {
        // this.handleCreateNotification(
        //   "success",
        //   `${processor.processName} Has Beed Terminated Successfully`
        // );
      }
    }
    if (Ready_Queue.Count()) {
      this.handleDispatchingToProcessor(Ready_Queue.Dequeue());
    } else this.setState({ processor: null });
  };

  handleBlockProcess = () => {
    const { Block_Queue, Ready_Queue, processor } = this.state;
    console.log("Blocking Process");
    if (processor) {
      Block_Queue.Enqueue(processor);
      let status = Ready_Queue.Dequeue();
      // this.handleCreateNotification(
      //   "warning",
      //   `${processor.processName} Blocked Due To Resource Demand`
      // );
      this.setState({
        Block_Queue,
        processor: null,
        Ready_Queue,
        blockqueueActive: true
      });
      setTimeout(() => {
        this.setState({ blockqueueActive: false });
      }, 2000);
      if (status)
        setTimeout(() => {
          this.handleDispatchingToProcessor(status);
        }, 400);
      console.log(`Blocked Queue********`);
      console.log(Block_Queue);
    }
  };

  handleReleaseProcess = () => {
    const { Block_Queue, Ready_Queue } = this.state;
    console.log("releaseBlockedProcesses******");
    if (Block_Queue.Count()) {
      const blocked = Block_Queue.Dequeue();
      this.setState({ interruptHandledActive: true });
      setTimeout(() => {
        this.setState({ interruptHandledActive: false });
      }, 700);
      Ready_Queue.Enqueue(blocked);
      // this.handleCreateNotification(
      //   "info",
      //   `${blocked.processName} Released From Block Queue`
      // );
      console.log("Releasing Process " + blocked.processName);
    }
  };

  handleCreateNotification = (type, message) => {
    switch (type) {
      case "info": {
        toast.info(message, {
          position: "bottom-left",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: false
        });
        break;
      }
      case "success": {
        toast.success(message, {
          position: "bottom-left",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: false
        });
        break;
      }
      case "warning": {
        toast.warn(message, {
          position: "bottom-left",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: false
        });
        break;
      }
      case "error": {
        toast.error(message, {
          position: "bottom-left",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: false
        });
        break;
      }
    }
  };

  handlecheckSystemStatus = () => {
    const { Ready_Queue, Block_Queue, processor } = this.state;
    if (!Ready_Queue.Count() && !Block_Queue.Count() && !processor) {
      this.clearIntervals();
      console.log("system ended=>", processor);
      this.setState({ systemEnd: true });
    }
  };

  clearIntervals() {
    const { timeoutTimer, blockTimer, systemTimer } = this.state;
    clearInterval(timeoutTimer);
    clearInterval(blockTimer);
    clearInterval(systemTimer);
    this.setState({ timeoutTimer: null, systemTimer: null, blockTimer: null });
    // this.handleCreateNotification(
    //   "warning",
    //   `System is shutting down`
    // );
  }

  render() {
    const {
      Ready_Queue,
      Block_Queue,
      processor,
      interruptHandledActive,
      blockqueueActive,
      processDispatchActice,
      timeOutActive
    } = this.state;
    console.log("Render Ready_Queue***", Ready_Queue);
    return (
      <div className="dashboard-screen">
        {this.renderHeader()}
        <div className="row">
          <div className="dasboard-system container col-md-10 col-lg-10 col-sm-12">
            <div className="row">
              {Block_Queue && (
                <div className="blockqueue-container container">
                  <QueueContainer
                    processes={Block_Queue.QueueArray}
                    text="Block Queue"
                    name="block-queue"
                    className="col-lg-10 col-md-10 col-sm-12"
                  />
                  <div className="process-interrrupted-images col-lg-10 col-md-10 col-sm-12">
                    {!blockqueueActive && (
                      <img src={BlockQueueInterruptLight} />
                    )}
                    {blockqueueActive && <img src={BlockQueueInterruptDark} />}
                  </div>
                </div>
              )}
            </div>
            <div className="row">
              {Ready_Queue && (
                <div className="queue-container col-lg-6 col-md-6 col-sm-6 ready-queue-container">
                  <QueueContainer
                    processes={Ready_Queue.QueueArray}
                    text="Ready Queue"
                    name="ready-queue"
                    className=""
                  />
                  <div className="interrrupt-handled-images">
                    {!interruptHandledActive && (
                      <img src={BlockQueueInterruptHandledlight} />
                    )}
                    {interruptHandledActive && (
                      <img src={BlockQueueInterruptHandledDark} />
                    )}
                  </div>
                  <div className="process-dispatched-images">
                    {!processDispatchActice && (
                      <img src={ProcessDipatchedLight} />
                    )}
                    {processDispatchActice && (
                      <img src={ProcessDipatchedDark} />
                    )}
                    {!timeOutActive && <img src={ProcessTimeoutLight} />}
                    {timeOutActive && <img src={ProcessTimeoutDark} />}
                  </div>
                </div>
              )}
              <div className="col-md-6 col-lg-6 col-sm-6 processor-container">
                {this.renderProcessor(processor)}
              </div>
            </div>
            {this.renderBlockMessage()}
          </div>
        </div>
        {this.renderFooter()}
        <Modal
          className="info-model process-model"
          visible={this.state.systemEnd}
          title="Title"
          onOk={() => {}}
          onCancel={() => {}}
          footer={null}
        >
          <h4 style={{ textAlign: "center", color: "red" }}>
            System Ended!
            <br />
            Thank you
          </h4>
        </Modal>
      </div>
    );
  }

  renderHeader = () => {
    const { no_Ofprocesses, interruptType } = this.state;
    return (
      <div className="header">
        <div className="interrupt-type">
          <h4 style={{ color: "red" }}>{interruptType}</h4>
        </div>
        <div className="total-processes">
          <h4 style={{ color: "red" }}>No of Processes : {no_Ofprocesses}</h4>
        </div>
      </div>
    );
  };

  renderFooter = () => {
    return (
      <div className="footer">
        <div className="status">
          <div style={{ color: "red" }}>
            <span
              style={{
                fontWeight: "bolder"
              }}
            >
              Status:
            </span>
            <span
              className="click-interrrupt"
              onClick={this.handleBlockProcess}
            >
              Click to interrupt process
            </span>
          </div>
        </div>
        <div className="time-latency">
          <div style={{ color: "red" }}>Time Latency : 5 sec</div>
        </div>
      </div>
    );
  };

  renderProcessor(process) {
    return (
      <div className="processor">
        <h5 style={{ color: "red" }}>Processor</h5>
        {process && <div className="process">{process.processName}</div>}
        <div className="processor-timer" id="processorLoader" />
      </div>
    );
  }

  renderBlockMessage() {
    return (
      <h3
        style={{
          position: "absolute",
          bottom: "30px",
          left: "500px"
        }}
      />
    );
  }

  // blinker() {
  //   const blinker = document.getElementById("blink-message");
  //   blinker.style.visibility = "visible";
  //   setInterval(() => {
  //     console.log("Blinking");
  //     console.log(blinker.style.visibility)
  //     if (blinker.style.visibility === "visible")
  //       blinker.style.visibility = "hidden";
  //     else blinker.style.visibility = "visible";
  //   }, 500);
  // }
}
