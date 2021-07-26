import axios from 'axios'
import {
  GET_SCORE_LIST_SUCCESS,
  GET_SCORE_LIST_FAIL,
  GET_SCORE_DETAIL_SUCCESS,
  GET_SCORE_DETAIL_FAIL,
  CREATE_SCORE_SUCCESS,
  CREATE_SCORE_FAIL,
  EDIT_SCORE_SUCCESS,
  EDIT_SCORE_FAIL,
  SCORE_LOADING,
  RESET_GET_SCORE_LIST_SUCCESS,
} from './types'



// Erorr messages
const getScoreListFailErrorMsg = "Unable to get scores"
const getScoreDetailFailErrorMsg = "Unable to get score"
const createScoreFailErrorMsg = "Unable to create score"
const editScoreFailErrorMsg = "Unable to edit score"



// Async action creators
export const getScoreList = (post, owner) =>
  async dispatch => {
    // Loading
    dispatch(scoreLoading())

    // Get access token from local storage
    const token = localStorage.getItem("access")

    // Draft request
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `JWT ${token}`
      },
    }

    // Get request
    try {
      var res
      if (post && !owner) {
        res = await axios.get(`/form/score-list/?post=${post}`, config)
      } else {
        res = await axios.get(`/form/score-list/?owner=${owner}`, config)
      }
      dispatch(getScoreListSuccess(res.data))
    } catch (err) {
      dispatch(getScoreListFail(getScoreListFailErrorMsg))
    }
  }

export const createScore = (score, owner1, owner2, post1, post2) =>
  async dispatch => {
    // Loading
    dispatch(scoreLoading())

    // Get access token from local storage
    const token = localStorage.getItem("access")

    // Draft request
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `JWT ${token}`
      },
    }
    const body = JSON.stringify({ score, owner1, owner2, post1, post2 })

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
    // Loading
    dispatch(scoreLoading())

    // Get access token from local storage
    const token = localStorage.getItem("access")

    // Draft request
    const config = {
      headers: {
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
export const getScoreListSuccess = (scoreList) => ({
  type: GET_SCORE_LIST_SUCCESS,
  payload: scoreList,
})
export const getScoreListFail = (scoreErrorMsg) => ({
  type: GET_SCORE_LIST_FAIL,
  payload: scoreErrorMsg,
})

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

export const scoreLoading = () => ({ type: SCORE_LOADING })

export const resetGetScoreListSuccess = () => ({ type: RESET_GET_SCORE_LIST_SUCCESS })