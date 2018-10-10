import React, { Component } from "react";
import "./App.css";
import Input from "./Components/Input/Input";
import Dashboard from "./Components/Dashboard/dashboard";
class App extends Component {
  constructor(props) {
    super();
    this.state = {
      processes: null
    };
  }

  inputProcesses = processes => {
    this.setState({ processes });
  };

  render() {
    const { Ready_Queue, processes } = this.state;
    return (
      <div className="App">
        {this.renderHeader()}
        {!processes && <Input inputProcesses={this.inputProcesses} />}
        {processes && <Dashboard processes={processes}/>}
      </div>
    );
  }
  renderHeader() {
    return (
      <header className="header">
        <h2 className="heading">Hardware And Software Interrupt</h2>
      </header>
    );
  }
}

export default App;
