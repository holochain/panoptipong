import React, { Component, PropTypes } from "react";
import "./ButtonController.css";
import {connect} from 'react-redux';

import {vote} from '../../actions';
import VoteButton from './VoteButton';

class ButtonController extends Component {

	handleVote = move => event => {
		this.props.vote({move})
	}

	render() {
		const waiting = false
		return (
			<div className="ButtonController-wrapper">
				<ul className="no-bullets">
					<li>
						<VoteButton disabled={waiting} handleVote={this.handleVote(-1)}>
							Up
						</VoteButton>
					</li>
					<li>
						<VoteButton disabled={waiting} handleVote={this.handleVote(0)}>
							Stay
						</VoteButton>
					</li>
					<li>
						<VoteButton disabled={waiting} handleVote={this.handleVote(+1)}>
							Down
						</VoteButton>
					</li>
				</ul>
			</div>
		);
	}
}


const mapDispatchToProps = dispatch => {
  return {
    vote: (payload) => {
      dispatch(vote(payload))
    },
  }
}

export default connect(null, mapDispatchToProps)(ButtonController);
