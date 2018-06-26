import React, { Component } from "react";
import {connect} from 'react-redux';

import {Jdenticon} from './Common';

import {updateNameEntry} from '../actions';

import './RegisterModal.css';


class RegisterModal extends Component {

  handleName = e => {
    this.props.updateNameEntry(e.target.value)
  }

  render() {
    return <div className="interstitial-modal-overlay">
      <div className="interstitial-modal">
        <Jdenticon size="80px" hash={this.props.nameEntry} />
        <input type="text" value={this.props.nameEntry} onChange={this.handleName} />
        <button>join game</button>
      </div>
    </div>
  }
}

const mapStateToProps = ({nameEntry}) => ({nameEntry})

const mapDispatchToProps = dispatch => {
  return {
    updateNameEntry: (name) => {
      dispatch(updateNameEntry(name))
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(RegisterModal);
