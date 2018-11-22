import React, { Component } from "react";
import { SplashScreen, InterruptSelection, Dashboard } from "./Screens";
class App extends Component {
  constructor(props) {
    super();
    this.state = {
      processes: null,
      step: 1,
      interruptType: ""
    };
  }

  inputProcesses = processes => {
    this.setState({ processes });
  };

  handleNextStep = () => {
    console.log("handleNextStep");
    const { step } = this.state;
    this.setState({ step: step + 1 });
  };

  handleInputProcesses = (interruptType, processes) => {
    const { step } = this.state;
    console.log("handleInputProcesses=>", interruptType, processes);
    this.setState({ processes, interruptType, step: step + 1 });
  };

  render() {
    const { Ready_Queue, processes, step } = this.state;
    return (
      <div className="App">
        {/* {this.renderHeader()}
        {!processes && <Input inputProcesses={this.inputProcesses} />}
        {processes && <Dashboard processes={processes}/>} */}
        {this.renderSteps(step)}
      </div>
    );
  }

  renderSteps = step => {
    switch (step) {
      case 1: {
        return <SplashScreen handleNextStep={this.handleNextStep} />;
      }
      // step two select the interrupt and type processes
      case 2: {
        return (
          <InterruptSelection
            handleInputProcesses={this.handleInputProcesses}
            handleStartHardwareInterrupt={this.handleStartHardwareInterrupt}
            handleStartSoftwareInterrupt={this.handleStartSoftwareInterrupt}
          />
        );
      }
      case 3: {
        return (
          <Dashboard
            processes={this.state.processes}
            interruptType={this.state.interruptType}
          />
        );
      }
    }
  };
}

export default App;
