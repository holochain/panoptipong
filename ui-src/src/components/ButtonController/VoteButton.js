import React, { Component, PropTypes } from "react";
import { Button } from "react-bootstrap";
import "./radial-spinner.css";
import "./VoteButton.css";

export default props => {
  // props:
  //  active
  //  disabled
  //  handleVote

  const animateClass = props.disabled ? ' animate' : '';
  const buttonClass = props.active ? 'button active' : 'button';

  return <div className="button-wrapper">
    <div className={"spinner pie" + animateClass}></div>
    <div className={"filler pie" + animateClass}></div>
    <div className={"mask" + animateClass}></div>
    <Button
      disabled={props.disabled}
      className={buttonClass}
      bsStyle="success"
      bsSize="large"
      onClick={props.handleVote}>
      { props.children }
    </Button>
  </div>
}
