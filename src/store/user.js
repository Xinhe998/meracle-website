// ------------------------------------
// Constants
// ------------------------------------
export const USER_LOGIN = 'USER_LOGIN'
export const USER_LOGOUT = 'USER_LOGOUT'

// ------------------------------------
// Actions
// ------------------------------------
export function userLogin (data) {
  return {
    type    : USER_LOGIN,
    data
  }
}

export function userLogout (data) {
  return {
    type    : USER_LOGOUT,
    data
  }
}

export const actions = {
  userLogin,
  userLogout
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [USER_LOGIN] : (state, action) => {
    return {
      ...state,
      ...action.data,
    }
  },
  [USER_LOGOUT] : (state, action) => {
    return {
      ...state,
      ...action.data,
    }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  account: '',
  authorization: '',
}

export default function userReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
