/*=============================================
=            Reducer Imports
=============================================*/

import { combineReducers } from 'redux';

import * as actions from '../actions'
import {gameDimensions} from '../config';


/*=============================================
=              Reducer Logic
=============================================*/

const dummyGauges = {
  left: {
    up: 3,
    stay: 6,
    down: 1,
  },
  right: {
    up: 0,
    stay: 1,
    down: 1,
  },
}

const initialState = {
  game: {},
  viz: {
    recentVotes: [],
    gauges: dummyGauges,
  },
  players: {},  // agentHash => {name, color}
}

const getMoveName = move => {
  if (move === 1) {
    return 'up'
  } else if (move === 0) {
    return 'stay'
  } else if (move === -1) {
    return 'down'
  } else {
    return '???'
  }
}

const calcVoteGauges = (votes) => {
  const result = {
    left: {
      up: 0,
      stay: 0,
      down: 0,
    },
    right: {
      up: 0,
      stay: 0,
      down: 0,
    },
  }
  votes.map(({teamID, move}) => {
    if (teamID === 'L') {
      result.left[getMoveName(move)] += 1
    } else {
      result.right[getMoveName(move)] += 1
    }
  })

  return result
}

const pongReducer = function(state = initialState, action) {
  const { payload } = action
  console.log(action.type, payload, action)
  switch (action.type) {
    case actions.GET_STATE:
      return {
        ...state,
        game: {
          ballX: payload.ball.x * 100 / gameDimensions.width,
          ballY: payload.ball.y * 100 / gameDimensions.height,
          leftPaddleY: payload.paddleL,
          rightPaddleY: payload.paddleR,
          leftScore: payload.scoreL,
          rightScore: payload.scoreR,
        },
        // viz: {
        //   recentVotes: payload.votes,
        //   gauges: calcVoteGauges(payload.votes),
        // }
      }
    case actions.REGISTER:
      const team = payload === 'L' || payload === 'R' ? {team: payload} : {}
      return Object.assign({...state}, team)
    default:
      return state
  }
}

export default pongReducer;
