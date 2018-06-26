import React, { Component } from "react";
import {connect} from 'react-redux';

import {Jdenticon} from './Common';

import './RegisterModal.css';


class RegisterModal extends Component {

  constructor(props) {
    super(props)
    this.state = {
      name: ""
    }
  }

  handleName = e => {
    this.setState({name: e.target.value})
  }

  render() {
    return <div className="interstitial-modal-overlay">
      <div className="interstitial-modal">
        <Jdenticon size="80px" hash={this.state.name} />
        <input type="text" value={this.state.name} onChange={this.handleName} />
        <button>join game</button>
      </div>
    </div>
  }
}

export default RegisterModal

// const mapStateToProps = state => state.recentVotes

// export default connect(mapStateToProps)(BubbleChamber);
