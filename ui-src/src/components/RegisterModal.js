import React, { Component } from "react";
import {connect} from 'react-redux';
import {Jdenticon} from './Common';
import {updateNameEntry, register} from '../actions';
import './RegisterModal.css';

class RegisterModal extends Component {
  handleName = e => {
    this.props.updateNameEntry(e.target.value)
  }

  handleRegister = e => {
    this.props.register({name: this.props.nameEntry}, data => {
      this.props.initApp();
      return data;
    })
  }

  render() {
    return <div className="interstitial-modal-overlay">
      <div className="interstitial-modal">
        <Jdenticon size="80px" hash={this.props.nameEntry} />
        <input type="text" value={this.props.nameEntry} onChange={this.handleName} />
        <button onClick={this.handleRegister}>join game</button>
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
    register: (data, then) => {
      dispatch(register(data, then))
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(RegisterModal);
