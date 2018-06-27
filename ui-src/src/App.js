import React, { Component } from "react";
import logo from "./holochain_logo.png";
import "./App.css";
import ButtonController from "./components/ButtonController";
import PlayersTable from "./components/PlayersTable";
import Game from "./components/Game";
import RegisterModal from "./components/RegisterModal";
import "./components/Header";
import {connect} from 'react-redux';

import {
  register,
  getState,
  getVotesAfterVote,
  getPlayers,
  getRegistration,
  getTeam,
} from './actions'


class App extends Component {

  initApp = () => {
    this.props.getState()
    this.props.getPlayers()
    setInterval(this.props.getState, 500);
    setInterval(this.props.getPlayers, 5000);
    setInterval(
      () => {
        this.props.getVotesAfterVote()  // no vote, just get most recent N
      },
      500
    );
  }

  componentWillMount() {
    this.props.getRegistration(data => {
      if (data.teamID === 'L' || data.teamID === 'R') {
        this.initApp()
      }
      return data
    })
  }

  render() {
    const game = <Game ballX={10} ballY={20} leftPaddleY={30} rightPaddleY={40} />
    const buttons = <ButtonController />
    const isRegistered = !!this.props.team

    return (
      <div className="App">
        <div class="App-header-wrapper">
          <div class="left"></div>
          <header className="App-header">
            <h1 className="App-title">PANOPTIPONG</h1>
          </header>
        </div>
        <div>
          <div className="game-and-controls">
            { !isRegistered
              ? [game]
              : this.props.team === 'L'
              ? [buttons, game]
              : [game, buttons]
            }
          </div>
          <PlayersTable players={Object.values(this.props.players)}/>
        </div>
        { isRegistered ? null : <RegisterModal initApp={this.initApp}/> }
      </div>
    );
  }
}

const mapStateToProps = ({team, viz, players}) => ({team, viz, players})

const mapDispatchToProps = dispatch => {
  return {
    getState: () => dispatch(getState()),
    getPlayers: () => dispatch(getPlayers()),
    getRegistration: (then) => dispatch(getRegistration(then)),
    getVotesAfterVote: (data) => dispatch(getVotesAfterVote(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
