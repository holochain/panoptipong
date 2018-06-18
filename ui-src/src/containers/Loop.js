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
=              Loop Container Logic           
=============================================*/

const mapStateToProps = state => {
  return {
    ...state
  }
}


const mapDispatchToProps = dispatch => {
  return {
  	//still need to complete these...
    getVote: () => {
      dispatch(getVote())
    },
    getState: () => {
      dispatch(getState())
    }
  }
}


/*=============================================
=              Loop Logic           
=============================================*/

class Loop extends Component {
	constructor(props) {
		super(props);
		this.state = {
			vote: 0
		};
	}

	render() {
		return (
			const loop = function(func) {
				(function loop(time) {
					func(Math.min((Date.now() - time) / 10, 1));
					window.requestAnimationFrame(loop.bind(Date.now()));
				})(Date.now());
			};
		)
	}

export default connect(mapStateToProps, mapDispatchToProps)(Loop)