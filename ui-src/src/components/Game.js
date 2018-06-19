import React, { Component } from "react";

import './Game.css';


/*=============================================
=              Game Logic
=============================================*/

const Paddle = ({y, side}) => {
	const width = 5.0;
	const height = 20.0;
	const sideStyle = side == 'left' ? {left: 0} : {right: 0};
	const top = y - (height / 2)
	const style = Object.assign({
		top: `${top}%`,
		width: `${width}%`,
		height: `${height}%`,
	}, sideStyle)
	return <div className="paddle" style={style}></div>
}

const PongBall = ({x, y}) => {
	const width = 5.0;
	const height = 5.0;
	const left = x - (width / 2)
	const top = y - (height / 2)
	const style = {
		left: `${left}%`,
		top: `${top}%`,
		width: `${width}%`,
		height: `${height}%`,
	}
	return <div className="ball" style={style}></div>
}

const Game = ({ballX, ballY, leftPaddleY, rightPaddleY}) => {

	return (
		<div className="Game">
			<Paddle side="left" y={leftPaddleY} />
			<Paddle side="right" y={rightPaddleY} />
			<PongBall x={ballX} y={ballY} />
		</div>
	);
}

export default Game;
