/*=============================================
=            Action Exports           
=============================================*/
// UI actions
export const TOGGLE_MODAL = 'toggleModal'

// Holochain actions
export const REGISTER = "register"
export const GET_TEAM = "getTeam"
export const VOTE = "vote"
export const GET_STATE = "getState"
export const APP_PROPERTY = "appProperty"


/*=============================================
=            Action Definitions           
=============================================*/
// Holochain actions
export function appProperty(appState, then) {
  return {
    type: APP_PROPERTY,
    meta: {
      isHc: true,
      namespace: 'postPongChain',
      data: appState,
      then
    }
  }
}

export function register() {
  return {
    type: REGISTER,
    meta: {
      isHc: true,
      namespace: "postPongChain",
    }
  }
}

export function getTeam() {
  return {
    type: GET_TEAM,
    meta: {
      isHc: true,
      namespace: "postPongChain"
    }
  }
}

export function vote(payload) {
  return {
    type: VOTE,
    meta: {
      isHc: true,
      namespace: "postPongChain",
      data: payload
    }
  }
}

export function getState(initialState, votesL, votesR) {
  return {
    type: GET_STATE,
    meta: {
      isHc: true,
      namespace: "postPongChain",
      data: {
        initialState: initialState,
        votesL: votesL,
        votesR: votesR
      }
    }
  }
}

//UI Action:
export function toggleModal() {
  return {
    type: TOGGLE_MODAL
  }
}
