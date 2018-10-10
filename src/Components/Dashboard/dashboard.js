import React from "react";
import Queue from "../../Helpers/Queue/Queue";
import QueueContainer from "../../Components/QueueContainer/QueueContainer";
import "./dashboard.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default class Dasboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Ready_Queue: new Queue(),
      Block_Queue: new Queue(),
      no_Ofprocesses: 4, //props.processes
      processor: null,
      timeoutTimer: null,
      blockTimer: null,
      systemTimer: null
    };
  }

  componentDidMount() {
    const { no_Ofprocesses, Ready_Queue } = this.state;
    for (let i = 0; i < no_Ofprocesses; i++) {
      const number = i + 1;
      Ready_Queue.Enqueue({
        processId: number,
        processName: `Process # ${number}`,
        executionCount: Math.ceil(Math.random() * 10)
      });
    }
    const currentProcess = Ready_Queue.Dequeue();
    this.setState({
      processor: currentProcess,
      timeoutTimer: setInterval(this.handleTimout, 5000),
      blockTimer: setInterval(this.handleReleaseProcess, 5000),
      systemTimer: setInterval(this.handlecheckSystemStatus, 20)
    });
    this.handleCreateNotification(
      "info",
      `${currentProcess.processName} Exectution Started`
    );
  }

  handleDispatchingToProcessor = process => {
    console.log("Process Dispatche:=>", process);
    // this.handleCreateNotification("info",`${process.processName} Execution Started`);
    this.handleCreateNotification(
      "info",
      `${process.processName} Exectution Started`
    );
    this.setState({ processor: process });
  };

  handleTimout = () => {
    console.log("timeOut*****");
    const { processor, Ready_Queue } = this.state;
    if (processor) {
      if (processor.executionCount) {
        processor.executionCount--;
        console.log(processor);
        Ready_Queue.Enqueue(processor);
        this.setState({ Ready_Queue, processor });
        this.handleCreateNotification(
          "warning",
          `${processor.processName} Timeout`
        );
      } else {
        this.handleCreateNotification(
          "success",
          `${processor.processName} Has Beed Terminated Successfully`
        );
      }
    }
    if (Ready_Queue.Count())
      this.handleDispatchingToProcessor(Ready_Queue.Dequeue());
    else this.setState({ processor: null });
  };

  handleBlockProcess = () => {
    const { Block_Queue, Ready_Queue, processor } = this.state;
    console.log("Blocking Process");
    if (processor) {
      Block_Queue.Enqueue(processor);
      let status = Ready_Queue.Dequeue();
      this.handleCreateNotification(
        "warning",
        `${processor.processName} Blocked Due To Resource Demand`
      );
      this.setState({ Block_Queue, processor: null, Ready_Queue });
      if (status) this.handleDispatchingToProcessor(status);
      console.log(`Blocked Queue********`);
      console.log(Block_Queue);
    }
  };

  handleReleaseProcess = () => {
    const { Block_Queue, Ready_Queue } = this.state;
    console.log("releaseBlockedProcesses******");
    if (Block_Queue.Count()) {
      const blocked = Block_Queue.Dequeue();
      Ready_Queue.Enqueue(blocked);
      this.handleCreateNotification(
        "info",
        `${blocked.processName} Released From Block Queue`
      );
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
    const { Ready_Queue, Block_Queue } = this.state;
    if (!Ready_Queue.Count() && !Block_Queue.Count()) {
      this.clearIntervals();
    }
  };

  clearIntervals(){
    const { timeoutTimer,blockTimer,systemTimer} = this.state;
    clearInterval(timeoutTimer);
    clearInterval(blockTimer);
    clearInterval(systemTimer);
    this.handleCreateNotification(
      "warning",
      `System is shutting down`
    );
  }

  render() {
    const { Ready_Queue, Block_Queue, processor } = this.state;
    console.log("Render Ready_Queue***", Ready_Queue);
    return (
      <div>
        <ToastContainer closeButton={false} />
        <div className="dasboard-system">
          {/* <div
          style={{
            textAlign: "center",
            position: "absolute",
            width: "100%",
            top: "-40px"
          }}
        >
          System Status
        </div> */}
          {Ready_Queue && (
            <QueueContainer
              processes={Ready_Queue.QueueArray}
              text="Ready Queue"
            />
          )}
          {Block_Queue && (
            <QueueContainer
              processes={Block_Queue.QueueArray}
              text="Block Queue"
              name="block-queue"
            />
          )}
          {this.renderProcessor(processor)}
          {this.renderBlockMessage()}
        </div>
      </div>
    );
  }

  renderProcessor(process) {
    return (
      <div className="processor">
        <h5>Processor</h5>
        {process && <div className="process">{process.processName}</div>}
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
      >
        <a
          href="#"
          onClick={this.handleBlockProcess}
          style={{ transition: "4s" }}
          id="blink-message"
        >
          Demand for some resource
        </a>
      </h3>
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
