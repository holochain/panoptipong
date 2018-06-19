import React, { Component, PropTypes } from "react";
import "./ButtonController.css";

import VoteButton from './VoteButton';

class ButtonController extends Component {
	// static propTypes = {
	// 	upCount: PropTypes.number,
	// 	stayCount: PropTypes.number,
	// 	downCount: PropTypes.number
	// };

	// static defaultProps = {
	// 	upCount: 0,
	// 	stayCount: 0,
	// 	downCount: 0
	// };


	handleInputChange = event => {
	    let { name, value } = event.target;
	    if (name === "upCount"){
	    	value += 1
	    }
	   	else if (name === "downCount"){
	    	value -= 1
	    }
	    console.log('TODO: action: ', value)
	}

	render() {
		const waiting = true
		return (
			<div>
				<ul className="no-bullets">
					<li>
						<VoteButton disabled={waiting} handleVote={this.handleChange}>
							Up
						</VoteButton>
					</li>
					<li>
						<VoteButton disabled={waiting} handleVote={this.handleChange}>
							Stay
						</VoteButton>
					</li>
					<li>
						<VoteButton disabled={waiting} handleVote={this.handleChange}>
							Down
						</VoteButton>
					</li>
				</ul>
			</div>
		);
	}
}

export default ButtonController;
