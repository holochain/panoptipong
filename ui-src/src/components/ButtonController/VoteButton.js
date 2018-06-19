import React, { Component, PropTypes } from "react";
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
    <button disabled={props.disabled} className={buttonClass} bsStyle="success" bsSize="large" onclick={props.handleVote}>
      { props.children }
    </button>
  </div>
}
