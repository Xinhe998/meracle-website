// ------------------------------------
// Constants
// ------------------------------------
export const GET_CHILD_DATA = 'GET_CHILD_DATA'

// ------------------------------------
// Actions
// ------------------------------------
export function getChildData (data) {
  return {
    type    : GET_CHILD_DATA,
    data
  }
}

export const actions = {
  getChildData,
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_CHILD_DATA] : (state, action) => {
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
  isSurvey: false,
}

export default function counterReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
