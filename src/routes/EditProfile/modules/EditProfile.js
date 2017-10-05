// ------------------------------------
// Constants
// ------------------------------------
export const GET_USER_DATA = 'GET_USER_DATA'

// ------------------------------------
// Actions
// ------------------------------------
export function getUserData (data) {
  return {
    type    : GET_USER_DATA,
    data
  }
}

export const actions = {
  getUserData,
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_USER_DATA] : (state, action) => {
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
  name: '',
  gender: '',
  birth: '',
  avatar: '',
  address: '',
}

export default function counterReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
