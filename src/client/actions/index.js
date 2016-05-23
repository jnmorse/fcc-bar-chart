import * as types from './types'
import axios from 'axios'

const API_URL = 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json'

export function loadData() {
  const results = axios.get(API_URL)

  return dispatch => {
    dispatch({
      type: types.LOADING_DATA
    })

    results.then(result => {
      dispatch({
        type: types.LOAD_DATA_SUCCESS,
        data: result.data
      })
    })

    .catch(e => dispatch({
      type: types.LOAD_DATA_ERROR,
      message: e.message
    }))
  }
}
