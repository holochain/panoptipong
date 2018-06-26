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
  team: null,
  nameEntry: "",
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

const compareVotesReversed = (a, b) => {
  var totalVotesA = a.teamL.voteCount + a.teamR.voteCount;
  var totalVotesB = b.teamL.voteCount + b.teamR.voteCount;
  return totalVotesB - totalVotesA;
}

const getLatestVote = votes => {
  // TODO: use agentHash as tie breaker, coordinate with backend
  if (votes.length > 0) {
    return votes.sort(compareVotesReversed)[0]
  }
  return null
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
        }
      }
    case actions.REGISTER:
      const team = payload === 'L' || payload === 'R' ? {team: payload} : {}
      return Object.assign({...state}, team)
    case actions.GET_PLAYERS:
      const players = {}
      payload.forEach(({agentHash, teamID, name}) => {
        players[agentHash] = {name, teamID}
      })
      return { ...state, players }
    case actions.GET_RECENT_VOTES:
      const latestVote = getLatestVote(payload.votes)
      return {
        ...state,
        viz: {
          latestVote: latestVote ? latestVote : state.viz.latestVote,
          recentVotes: payload.votes,
          gauges: calcVoteGauges(payload.votes),
        }
      }
    case actions.UPDATE_NAME_ENTRY:
      return {
        ...state,
        nameEntry: payload,
      }
    default:
      return state
  }
}

export default pongReducer;
