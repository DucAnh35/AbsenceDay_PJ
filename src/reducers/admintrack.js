import * as types from '../constants/actionTypes';
const INITIAL_STATE = {
  all: [],
  list: []
}
export default function store(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case types.GET_TRACK:
      return Object.assign({}, state, {
        all: action.payload
      })
    case types.GET_LICENSE:
      return Object.assign({}, state, {
        all: action.payload
      })
    case types.GET_DISLICENSE:
      console.log(action.payload);

      return Object.assign({}, state, {
        all: action.payload
      })
    default:
      return state
  }
}