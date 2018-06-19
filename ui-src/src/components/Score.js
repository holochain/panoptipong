import React, { Component } from "react";


class Score extends React.Component {
	static propTypes = {
		totalL: React.PropTypes.number,
		totalR: React.PropTypes.number,
		position: React.PropTypes.oneOf(["left", "right"]).isRequired,
		player: React.PropTypes.string.isRequired
	};

	static defaultProps = {
		totalR: 0,
		totalR: 0
	};

	render() {
		return (
			<div className={this.props.position}>
				<h2>Player {this.props.player}</h2>
				<h2>{this.props.total}</h2>
			</div>
		);
	}
}


export default Score;