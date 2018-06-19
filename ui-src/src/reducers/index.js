/*=============================================
=            Reducer Imports
=============================================*/

import { combineReducers } from 'redux';
import * as actions from '../actions'

export const gameDimensions = {
  width: 200,
  height: 100,
}

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
          ballX: payload.ball.x * 100 / gameDimensions.width,
          ballY: payload.ball.y * 100 / gameDimensions.height,
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