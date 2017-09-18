// ------------------------------------
// Constants
// ------------------------------------
export const ADD_CHILD = 'ADD_CHILD'

// ------------------------------------
// Actions
// ------------------------------------
export function addChild (data) {
  return {
    type    : ADD_CHILD,
    data
  }
}

export const actions = {
  addChild,
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [ADD_CHILD] : (state, action) => {
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
  child_name: '',
  child_gender: '',
  child_birth: '',
}

export default function counterReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
