import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Game from "./components/Game";
import ButtonController from "./components/ButtonController";
import "./components/Header";

import {
  register,
  getState,
  getTeam,
} from './actions'


class App extends Component {

  componentWillMount() {
    this.props.register(() => {
      setInterval(this.props.getState, 1000);
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Holo's Post PongChain</h1>
        </header>
        <Game ballX={10} ballY={20} leftPaddleY={30} rightPaddleY={40} />
        <ButtonController />
      </div>
    );
  }
}

export default App;

// const mapStateToProps = state => {
//   return {
//     ...state
//   }
// }

const mapDispatchToProps = dispatch => {
  return {
    register: () => {
      dispatch(register())
    },
    getState: () => {
      dispatch(getState())
    },
  }
}