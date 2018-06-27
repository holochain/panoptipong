import React, { Component } from "react";
import {connect} from 'react-redux';
import {Jdenticon} from './Common';
import './BubbleChamber.css';
import {vote, getPlayers} from '../actions'

const PlayerBubble = ({name, x, y, right, opacity}) => {
  const style = Object.assign({
    top: x,
    opacity,
  }, right ? {right: x} : {left: x})
  return <div className="player-bubble" style={style}>
    <Jdenticon size="40px" hash={name} />
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
          right: true,
          opacity: 0.75,
          name: 'MD'
        },
        {
          x: 130,
          y: 90,
          right: true,
          opacity: 0.75,
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
// const mapStateToProps = ({getPlayers}) => ({getPlayers})
export default connect(mapStateToProps)(BubbleChamber);
