import * as types from '../../actions/types'
const dataReducer = (state = {}, action) => {
  switch (action.type) {
  case types.LOAD_DATA_SUCCESS:
    return { ...state, results: action.data }
  case types.LOADING_DATA:
    return state
  default:
    return state
  }
}

export default dataReducer
