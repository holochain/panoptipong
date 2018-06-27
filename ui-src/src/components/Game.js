import React, { Component } from "react";
import {connect} from 'react-redux';
import BubbleChamber from "./BubbleChamber";
import PlayersTable from "./PlayersTable";
import './Game.css';
import './VoteGauge.css';
import {
  vote, //game, viz
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

const VoteGauge = ({up, stay, down}) => {
	const total = up + stay + down
  if (total === 0) {
    up = down = 0
    stay = 1
  } else {
    up /= total
    stay /= total
    down /= total
  }
	const styleUp = {flexBasis: `${100 * up}%`}
	const styleStay = {flexBasis: `${100 * stay}%`}
	const styleDown = {flexBasis: `${100 * down}%`}
	return <div className="vote-gauge">
		<div className="vote-gauge-bar up" style={styleUp}/>
		<div className="vote-gauge-bar stay" style={styleStay}/>
		<div className="vote-gauge-bar down" style={styleDown}/>
	</div>
}

const Game = ({game, viz, players}) => {
	const {ballX, ballY, leftPaddleY, rightPaddleY, leftScore, rightScore} = game
	const {gauges} = viz
	return (
		<div className="Game-wrapper">
			<BubbleChamber>
				<div className="Game">
					<div className="vote-gauge-wrapper left">
						<VoteGauge {...gauges.left}/>
					</div>
					<div className="vote-gauge-wrapper right">
						<VoteGauge {...gauges.right}/>
					</div>
					<div className="midpoint"/>
					<Paddle side="left" y={leftPaddleY} />
					<Paddle side="right" y={rightPaddleY} />
					<PongBall x={ballX} y={ballY} />
					<div className="score score-left">{leftScore}</div>
					<div className="score score-right">{rightScore}</div>
				</div>
			</BubbleChamber>

      <PlayersTable players={Object.values(players)}/>
		</div>
	);
}

const mapStateToProps = ({game, viz, players}) => ({game, viz, players})
export default connect(mapStateToProps)(Game);
