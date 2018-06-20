import React, { Component } from "react";
import {connect} from 'react-redux';

import './Game.css';

import {
  vote,
} from '../actions'

import {gameDimensions} from '../config';


/*=============================================
=              Game Logic
=============================================*/

const Paddle = ({y, side}) => {
	const widthPx = "12px";
	const heightPct = 20.0;
	const sideStyle = side == 'left' ? {left: `-${widthPx}`} : {right: `-${widthPx}`};

	const SubPaddle = ({y}) => {
		const top = y - (heightPct / 2)
		const style = Object.assign({
			top: `${top}%`,
			width: `${widthPx}`,
			height: `${heightPct}%`,
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
	const width = 5.0 * 100 / gameDimensions.width;
	const height = 5.0 * 100 / gameDimensions.height;
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

const Game = (props) => {
	const {ballX, ballY, leftPaddleY, rightPaddleY, leftScore, rightScore} = props
	console.log('game props', props)

	return (
		<div className="Game-wrapper">
			<div className="Game">
				<div className="midpoint"/>
				<Paddle side="left" y={leftPaddleY} />
				<Paddle side="right" y={rightPaddleY} />
				<PongBall x={ballX} y={ballY} />
				<div className="score score-left">{leftScore}</div>
				<div className="score score-right">{rightScore}</div>
			</div>
		</div>
	);
}

const mapStateToProps = state => state.game

export default connect(mapStateToProps)(Game);
