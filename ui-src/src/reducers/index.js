/*=============================================
=            Reducer Imports
=============================================*/

import { combineReducers } from 'redux';
import * as actions from '../actions'


/*=============================================
=              Reducer Logic
=============================================*/

const pongReducer = function(state = {}, action) {
  const { actionType, meta, payload } = action
  switch (actionType) {
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

export default pongApp;