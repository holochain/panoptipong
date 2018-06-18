import React, { Component } from "react";

class Ball extends React.Component {
	static propTypes = {
		x: React.PropTypes.number.isRequired,
		y: React.PropTypes.number.isRequired
	};

	render() {
		return (
			<div
				style={{
					width: "30px",
					height: "30px",
					top: `${this.props.y}px`,
					left: `${this.props.x}px`,
					position: "absolute",
					backgroundColor: "white"
				}}
				className="PongBall"
			/>
		);
	}
}

export default Ball;