import React, { Component } from "react";
import {connect} from 'react-redux';

import './BubbleChamber.css';

import {
  vote,
} from '../actions'


const PlayerBubble = ({name, color, x, y, right, opacity}) => {
  const style = Object.assign({
    backgroundColor: color,
    top: x,
    opacity,
  }, right ? {right: x} : {left: x})
  return <div className="player-bubble" style={style}>
    <span className="name">{ name }</span>
  </div>
}

class BubbleChamber extends Component {

  constructor(props) {
    super(props)
    this.state = {
      bubbles: [
        {
          x: 50,
          y: 80,
          color: 'green',
          right: true,
          opacity: 0.5,
          name: 'MD'
        },
        {
          x: 130,
          y: 90,
          color: 'blue',
          right: true,
          opacity: 0.5,
          name: 'LJ'
        }
      ]
    }
  }

  render() {
    return <div className="BubbleChamber">
      { this.props.children }
      { this.state.bubbles.map(PlayerBubble) }

    </div>
  }
}

const mapStateToProps = state => state.recentVotes

export default connect(mapStateToProps)(BubbleChamber);
