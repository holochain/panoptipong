import React, { Component } from "react";
import { connect } from 'react-redux'
import {
  appProperty,
  register,
  getTeam,
  getState,
  vote
} from '../actions'


/*=============================================
=              Game Container Logic           
=============================================*/
const mapStateToProps = state => {
  return {
    ...state
  }
}

const mapDispatchToProps = dispatch => {
  return {
  	register: () => {
      dispatch(register())
    },
    getTeam: () => {
      dispatch(getTeam())
    },
    getState: (initialState, votesL, votesR) => {
      dispatch(getState(initialState, votesL, votesR))
    },
    changeAppProp: (appStateChange, then) => {
      dispatch(appProperty(appStateChange, then))
    },
    vote: (payload) => {
      dispatch(getHandle(payload))
    }
  }
}

/*=============================================
=              Game Logic           
=============================================*/

class Game extends Component {
	constructor(props) {
		super(props);
		this.state = {
			vote: 0,

			ballY: Math.floor(Math.random() * 13),
			ballX: Math.floor(window.innerWidth / 2),

			// randomly choose the direction
			vx: 5 * (Math.random() < 0.5 ? 1 : -1), // accelleration
			vy: 5 * (Math.random() < 0.5 ? 1 : -1), // accelleration
			speed: 2 * (Math.random() < 0.5 ? 1 : -1),

			leftScore: 0,
			rightScore: 0,

			level: "easy",
			leftPaddleTop: gameStartHeight,
			rightPaddleY: 0,
			isModalOpen: false
		};
	}

	onKeyDown = event => {
		// if up arrow hit & top of paddle is below top header
		if (event.keyCode === 38 && event.target.getBoundingClientRect().top > 140) {
			this.setState(prevState => ({
				leftPaddleTop: R.subtract(prevState.leftPaddleTop, 10)
			}));
		}
		if (
			event.keyCode === 40 &&
			Math.ceil(R.add(event.target.getBoundingClientRect().top, 150)) <
				window.innerHeight
		) {
			this.setState(prevState => ({
				leftPaddleTop: R.add(prevState.leftPaddleTop, 10)
			}));
		}
	};

	onSubmit = e => {
		this.setState({ level: e.target.value });

		this.startGame();
	};

	startGame = () => {
		Loop(tick => {
			if (this.state.level === "easy") {
				this.easyAI(tick);
			} else if (this.state.level === "intermediate") {
				this.intermediateAI();
			}

			this.setState({
				ballX: R.multiply(R.add(this.state.ballX, this.state.vx), tick),
				ballY: R.multiply(R.add(this.state.ballY, this.state.vy), tick)
			});

			// // if the ball is at the right side of the screen
			if (this.state.ballX > R.add(this.boardBoundsRight, 50)) {
				this.setState({
					vx: R.negate(this.state.vx),
					leftScore: R.inc(this.state.leftScore)
				}); // reverse direction of ball
			}

			if (
				this.state.ballX > R.subtract(this.boardBoundsRight, 50) &&
				this.state.ballY > this.state.rightPaddleY &&
				this.state.ballY < R.add(this.state.rightPaddleY, 150)
			) {
				return this.setState({
					vx: R.negate(this.state.vx)
				});
			}

			// if ball is on the left side
			if (this.state.vx < 0 && this.state.ballX < -50) {
				this.setState({
					rightScore: R.inc(this.state.rightScore),
					vx: R.negate(this.state.vx)
				}); // reverse direction of ball
			} else if (
				this.state.vx < 0 &&
				this.state.ballX === 20 &&
				this.state.ballY > this.state.leftPaddleTop &&
				this.state.ballY < this.state.leftPaddleTop + 150
			) {
				// Hit left paddle!!
				return this.setState({
					vx: R.negate(this.state.vx)
				});
			}

			// if the ball is at the bottom or top of the board
			if (this.state.ballY > window.innerHeight - 100) {
				this.setState({ vy: R.negate(this.state.vy) });
			} else if (this.state.ballY < 0) {
				this.setState({ vy: R.negate(this.state.vy) });
			}
			this.forceUpdate();
		});
	};

	easyAI = tick => {
		if (this.state.rightPaddleY >= 0) {
			this.setState(prevState => ({
				// speed: negate(prevState.speed),
				rightPaddleY: R.multiply(
					R.add(prevState.rightPaddleY, prevState.speed),
					tick
				)
			}));
		}

		if (this.state.rightPaddleY < 0) {
			this.setState(prevState => ({
				speed: R.negate(prevState.speed),
				rightPaddleY: R.multiply(
					R.add(prevState.rightPaddleY, R.negate(prevState.speed)),
					tick
				)
			}));
		}
		if (this.state.rightPaddleY > R.subtract(window.innerHeight, 120)) {
			this.setState(prevState => ({
				speed: R.negate(prevState.speed),
				rightPaddleY: R.multiply(
					R.add(prevState.rightPaddleY, R.negate(prevState.speed)),
					tick
				)
			}));
		}
	};

	intermediateAI = () => {
		// if paddle moving toward us & up
		if (
			this.state.vx > 0 &&
			this.state.ballY < window.innerHeight / 2 &&
			this.state.rightPaddleY > 0
		) {
			this.setState(prevState => ({
				rightPaddleY: R.subtract(prevState.rightPaddleY, 10)
			}));
		}
		if (
			this.state.vx > 0 &&
			this.state.ballY > R.subtract(window.innerHeight, 150) / 2 &&
			R.add(+this.state.rightPaddleY, 150) < R.subtract(window.innerHeight, 150)
		) {
			this.setState(prevState => ({
				rightPaddleY: R.add(prevState.rightPaddleY, 10)
			}));
		}
	};
	boardBoundsRight = window.innerWidth + 20;

	render() {
		const { vote, ballX, ballY, leftPaddleTop, leftScore, rightScore } = this.state;

		const loop = function(vote) {
			if (vote) {

			} 

			window.requestAnimationFrame();
		}

		return (
			<div className="Game">
				<div className="radios">
					<label>
						<input type="radio" value="easy" name="level" onChange={this.onSubmit} />
						<span>Easy</span>
					</label>
					<label>
						<input
							type="radio"
							value="intermediate"
							name="level"
							onChange={this.onSubmit}
						/>
						<span>Intermediate</span>
					</label>
				</div>
				<Score position="left" player="1" total={leftScore} />
				{leftScore === 11 || rightScore === 11 ? (
					<div className="gameOver">
						<h1 style={{ display: "flex" }}>Game over </h1>
						<h3>Refresh page to play again</h3>
					</div>
				) : (
					<h1 className="gameOver" style={{ display: "none" }}>
						Game over
					</h1>
				)}
				<Score position="right" player="2" total={rightScore} />
				<Paddle
					name="p1"
					x={5}
					focus={true}
					y={leftPaddleTop}
					onKeyDown={event => this.onKeyDown(event)}
					position="left"
				/>
				<vl />
				<PongBall x={ballX} y={ballY} />
				<Paddle
					x={window.innerWidth - 20}
					y={this.state.rightPaddleY}
					position="right"
				/>
			</div>
		);
	}
}

// export default Game;

export default connect(mapStateToProps, mapDispatchToProps)(Game)