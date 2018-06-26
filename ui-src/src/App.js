import React, { Component } from "react";
import logo from "./holochain_logo.png";
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
    this.props.register(data => {
      setInterval(this.props.getState, 500);
      return data;
    })
  }

  render() {
    const game = <Game ballX={10} ballY={20} leftPaddleY={30} rightPaddleY={40} />
    const buttons = <ButtonController />
    const interstitialModal = <div className="interstitial-modal-overlay">
      <div className="interstitial-modal">
        <p>pick a name</p>
        <button>join game</button>
      </div>
    </div>
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

        { isRegistered ? null : interstitialModal }
      </div>
    );
  }
}

const mapStateToProps = ({team}) => ({team})

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