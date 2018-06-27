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

export const GET_PLAYERS = "getPlayers"
export const GET_RECENT_VOTES = "getVotesAfterVote"

export const UPDATE_NAME_ENTRY = "updateNameEntry"

const namespace = 'voting'

/*=============================================
=            Action Definitions
=============================================*/

// Holochain actions
export function appProperty(appState, then) {
  return {
    type: APP_PROPERTY,
    meta: {
      isHc: true,
      namespace,
      data: appState,
      then
    }
  }
}

export function register(data, then) {
  return {
    type: REGISTER,
    meta: {
      isHc: true,
      namespace,
      data,
      then,
    }
  }
}

export function vote(data) {
  return {
    type: VOTE,
    meta: {
      isHc: true,
      namespace,
      data
    }
  }
}

export function getState() {
  return {
    type: GET_STATE,
    meta: {
      isHc: true,
      namespace,
    }
  }
}

export function getPlayers() {
  return {
    type: GET_PLAYERS,
    meta: {
      isHc: true,
      namespace,
    }
  }
}

export function getVotesAfterVote(data) {
  return {
    type: GET_RECENT_VOTES,
    meta: {
      isHc: true,
      namespace,
      data,
    }
  }
}

export function updateNameEntry(name) {
  return {
    type: UPDATE_NAME_ENTRY,
    payload: name,
  }
}
