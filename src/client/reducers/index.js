import { combineReducers } from 'redux'
import dataReducer from './data-reducer'

const rootReducer = combineReducers({
  api: dataReducer
})

export default rootReducer
