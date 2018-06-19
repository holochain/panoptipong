import React, { Component, PropTypes } from "react";
import "./ButtonController.css";

import {vote} from '../../actions';
import VoteButton from './VoteButton';

class ButtonController extends Component {

	handleVote = move => event => {
		vote({move})
	}

	render() {
		const waiting = true
		return (
			<div>
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
						<VoteButton disabled={waiting} handleVote={this.vote(1)}>
							Down
						</VoteButton>
					</li>
				</ul>
			</div>
		);
	}
}

export default ButtonController;
