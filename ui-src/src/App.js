import React, { Component } from "react";
import logo from "./holochain_logo.png";
import "./App.css";
import ButtonController from "./components/ButtonController";
import Game from "./components/Game";
import RegisterModal from "./components/RegisterModal";
import "./components/Header";
import {connect} from 'react-redux';

import {
  register,
  getState,
  getTeam,
} from './actions'


class App extends Component {

  componentWillMount() {
    this.props.register({name: this.props.nameEntry}, data => {
      setInterval(this.props.getState, 500);
      return data;
    })
  }

  render() {
    const game = <Game ballX={10} ballY={20} leftPaddleY={30} rightPaddleY={40} />
    const buttons = <ButtonController />
    const isRegistered = false

    return (
      <div className="App">
        <div class="App-header-wrapper">
          <div class="left"></div>
          <header className="App-header">
            <h1 className="App-title">PANOPTIPONG</h1>
          </header>
        </div>
        <div className="game-and-controls">
          { this.props.team === 'L'
            ? [buttons, game]
            : [game, buttons]
          }
        </div>

        { isRegistered ? null : <RegisterModal/> }
      </div>
    );
  }
}

const mapStateToProps = ({team, nameEntry}) => ({team, nameEntry})

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

export default connect(mapStateToProps, mapDispatchToProps)(App);
