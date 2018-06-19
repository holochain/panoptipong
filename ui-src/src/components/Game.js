import React, { Component } from "react";

import './Game.css';

import {
  vote,
} from '../actions'

import {connect} from 'react-redux';


/*=============================================
=              Game Logic
=============================================*/

const Paddle = ({y, side}) => {
	const width = 5.0;
	const height = 20.0;
	const sideStyle = side == 'left' ? {left: `-${width}%`} : {right: `-${width}%`};

	const SubPaddle = ({y}) => {
		const top = y - (height / 2)
		const style = Object.assign({
			top: `${top}%`,
			width: `${width}%`,
			height: `${height}%`,
		}, sideStyle)
		return <div className="paddle" style={style}></div>
	}

	const y2 = (y <= 50) ? y + 100 : y -100;

	return <div className="two-paddles">
		<SubPaddle y={y} />
		<SubPaddle y={y2} />
	</div>
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
		<div className="Game-wrapper">
			<div className="Game">
				<Paddle side="left" y={leftPaddleY} />
				<Paddle side="right" y={rightPaddleY} />
				<PongBall x={ballX} y={ballY} />
			</div>
		</div>
	);
}

const mapStateToProps = state => state.game

export default connect(mapStateToProps)(Game);
