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

export function register(then) {
  return {
    type: REGISTER,
    meta: {
      isHc: true,
      namespace,
      data: {},
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
