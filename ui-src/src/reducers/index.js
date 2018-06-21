/*=============================================
=            Reducer Imports
=============================================*/

import { combineReducers } from 'redux';

import * as actions from '../actions'
import {gameDimensions} from '../config';


/*=============================================
=              Reducer Logic
=============================================*/

const initialState = {
  game: {}
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
      }
    case actions.REGISTER:
      const team = payload === 'L' || payload === 'R' ? {team: payload} : {}
      return Object.assign({...state}, team)
    default:
      return state
  }
}

export default pongReducer;