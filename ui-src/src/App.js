import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Game from "./components/Game";
import ButtonController from "./components/ButtonController";
import "./components/Header";
import {connect} from 'react-redux';

import {
  register,
  getState,
  getTeam,
} from './actions'


class App extends Component {

  componentWillMount() {
    this.props.register(() => {
      setInterval(this.props.getState, 500);
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

const mapDispatchToProps = dispatch => {
  return {
    register: (then) => {
      dispatch(register(then))
    },
    getState: () => {
      dispatch(getState())
    },
  }
}

export default connect(null, mapDispatchToProps)(App);