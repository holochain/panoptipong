import React, { Component } from "react";

class Paddle extends React.Component {
	static propTypes = {
		x: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number])
			.isRequired,
		y: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number])
			.isRequired,
		onKeyDown: React.PropTypes.func,
		focus: React.PropTypes.bool
	};

	static defaultProps = {
		onKeyDown: Function.prototype,
		focus: false
	};

	render() {
		return (
			<div
				role="button"
				tabIndex={0}
				onKeyDown={this.props.onKeyDown}
				className="Paddle"
				style={{
					width: "15px",
					height: "150px",
					position: "absolute",
					backgroundColor: "#ffffff",
					opacity: "0.7",
					top: `${this.props.y}px`,
					left: `${this.props.x}px`
				}}
			>
				<input
					type="text"
					className="paddleInput"
					autofocus={this.props.autofocus}
				/>
			</div>
		);
	}
}

export default Paddle;