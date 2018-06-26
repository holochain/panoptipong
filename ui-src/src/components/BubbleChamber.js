import React, { Component } from "react";
import {connect} from 'react-redux';

import './Game.css';

import {
  vote,
} from '../actions'

import {gameDimensions} from '../config';


const PlayerBubble = ({name, color}) => {
  return <div className="player-bubble" style={{backgroundColor: color}}>
    <span className="name">{ name }</span>
  </div>
}

class BubbleChamber extends Component {

  constructor(props) {
    super(props)
    this.state = {
      bubbles: []
    }
  }

  render() {
    <div className="BubbleChamber">
      { bubbles.map(PlayerBubble) }
    </div>
  }
}