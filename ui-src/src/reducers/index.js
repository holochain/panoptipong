/*=============================================
=            Reducer Imports
=============================================*/

import { combineReducers } from 'redux';
import * as actions from '../actions'
import {gameDimensions} from '../config';

const initialState = {
  game: {}
}

/*=============================================
=              Reducer Logic
=============================================*/

const pongReducer = function(state = initialState, action) {
  const { payload } = action
  switch (action.type) {
    case actions.GET_STATE:
      return {
        ...state,
        game: {
          ballX: payload.ball.x,
          ballY: payload.ball.y,
          leftPaddleY: payload.paddleL,
          rightPaddleY: payload.paddleR,
        },
      }
    case actions.REGISTER:
      return {
        ...state,
        team: payload,
      }
    default:
      return state
  }
}

export default pongReducer;