/*=============================================
=            Reducer Imports           
=============================================*/

import { combineReducers } from 'redux';
import * as actions from '../actions'



/*=============================================
=         Reducer Base/Default State           
=============================================*/

const initialAppState = {
  // appProperities = any app properties received from Pong App backend 
  // (including the Board Dimensions, Inital Bactions State, Initial R/L Paddle States,
  //  and initial Velocity(?))
  appProperties: {}, 
  teamAssigned: "",
  teamL: {
    initialState: {},
    playerCount: 0,
    voteCount: 0
  },
  teamR: {
    initialState: {},
    playerCount: 0,
    voteCount: 0
  },
  modalIsOpen: true,
}



/*=============================================
=              Reducer Logic           
=============================================*/

const pongReducer = function(state = initialAppState, action) {
  const { actionType, meta, payload } = action
  // console.log('reducer actionType ' + actionType)
  switch (actionType) {
    case actions.APP_PROPERTY:
      console.log("APP_PROPERTY" + meta.data + "payload " + payload);
      return {
        ...state,
        appProperties: {
          ...state.appProperties,
          [meta.data]: payload
        }
      }
    case actions.REGISTER:
      return {
        ...state,
        data: payload
      }
    case actions.GET_TEAM:
      return {
        ...state,
        teamAssigned: payload
      }
    case actions.VOTE:
      return {
        ...state,
        vote: payload
      }
    case actions.GET_STATE:
      return {
        ...state,
        teamL: {
          ...state.teamL,
          [meta.data]: {
            initialState: payload.teamL.initialState,
            playerCount: payload.teamL.playerCount,
            voteCount: payload.teamL.voteCount
          }
        },
        teamR: {
          ...state.teamR,
          [meta.data]: {
            initialState: payload.teamR.initialState,
            playerCount: payload.teamR.playerCount,
            voteCount: payload.teamR.voteCount
          }
      }
    case actions.TOGGLE_MODAL:
      return {
        ...state,
        modalIsOpen: !state.modalIsOpen
      }
    default:
      return state
  }
}

export default pongApp;