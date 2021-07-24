import axios from 'axios'
import {
  CREATE_SCORE_SUCCESS,
  CREATE_SCORE_FAIL,
  EDIT_SCORE_SUCCESS,
  EDIT_SCORE_FAIL,
} from './actions'



// Erorr messages
const createScoreFailErrorMsg = "Unable to create score"
const editScoreFailErrorMsg = "Unable to edit score"



// Async action creators
export const createScore = (owner, this_post, other_post, score) =>
  async dispatch => {
    // Get access token from local storage
    const token = localStorage.getItem("access")

    // Draft request
    const config = {
      header: {
        "Content-Type": "application/json",
        "Authorization": `JWT ${token}`
      }
    }
    const body = JSON.stringify({ owner, this_post, other_post, score })

    // Post request
    try {
      await axios.post('/form/score-list/', body, config)
      dispatch(createScoreSuccess())
    } catch (err) {
      dispatch(createScoreFail(createScoreFailErrorMsg))
    }
  }

export const editScore = (id, score) =>
  async dispatch => {
    // Get access token from local storage
    const token = localStorage.getItem("access")

    // Draft request
    const config = {
      header: {
        "Content-Type": "application/json",
        "Authorization": `JWT ${token}`
      }
    }
    const body = JSON.stringify({ score })

    // Patch request
    try {
      await axios.patch(`/form/score-list/${id}/`, body, config)
      dispatch(editScoreSuccess())
    } catch (err) {
      dispatch(editScoreFail(editScoreFailErrorMsg))
    }
  }



// Action creators
export const createScoreSuccess = () => ({ type: CREATE_SCORE_SUCCESS })
export const createScoreFail = (scoreErrorMsg) => ({
  type: CREATE_SCORE_FAIL,
  payload: scoreErrorMsg,
})

export const editScoreSuccess = () => ({ type: EDIT_SCORE_SUCCESS })
export const editScoreFail = (scoreErrorMsg) => ({
  type: EDIT_SCORE_FAIL,
  payload: scoreErrorMsg,
})