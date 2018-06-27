import React, { Component, PropTypes } from "react";
import { Button } from "react-bootstrap";
import "./radial-spinner.css";
import "./VoteButton.css";

import {rateLimitInterval} from '../../config';

export default class VoteButton extends Component {
  // props:
  //  active
  //  disabled
  //  handleVote
  //
  constructor(props) {
    super(props)
    this.state = {active: false}
  }

  static getDerivedStateFromProps(props, state) {
    if (props.disabled) {
      return null
    } else {
      return {active: false}
    }
  }

  handleClick = e => {
    this.setState({active: true})
    this.props.handleVote()
  }

  render () {
    const animateClass = this.props.disabled ? ' animate' : '';
    const buttonClass = this.state.active ? 'button active' : 'button';
    const intervalStyle = {animationDuration: `${rateLimitInterval}ms`}
    const buttonType = this.props.direction;

    return <div className="button-wrapper">
      <div style={intervalStyle} className={"spinner pie" + animateClass}></div>
      <div style={intervalStyle} className={"filler pie" + animateClass}></div>
      <div style={intervalStyle} className={"mask" + animateClass}></div>

      <Button
        disabled={this.props.disabled}
        className={buttonClass, buttonType}
        bsStyle="success"
        bsSize="large"
        onClick={this.handleClick}>
        { this.props.children }
      </Button>
    </div>
  }

}
