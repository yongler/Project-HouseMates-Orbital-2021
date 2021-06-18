import axios from 'axios'
import {
  GET_QUESTIONS_SUCCESS,
  GET_QUESTIONS_FAIL,
  FORM_LOADING,
  RESET_FORM_LOADING,
} from './types'


// Error messages
const unableToLoadQuestionsErrorMsg = "Unable to load questions"

// Async Action Createors
export const getQuestions = (formType) =>
  async dispatch => {
    dispatch(loading())

    // Get access token from local storage
    const token = localStorage.getItem('access')

    // Request
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${token}`
      }
    }

    // Get request
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/form/question-list/?form_type=${formType}`, config)

      dispatch(getQuestionsSuccess(res.data))
    } catch (err) {
      dispatch(getQuestionsFail(unableToLoadQuestionsErrorMsg))
    }
  }



// Action Creators
export const getQuestionsSuccess = questions => ({
  type: GET_QUESTIONS_SUCCESS,
  payload: questions,
})
export const getQuestionsFail = error => ({
  type: GET_QUESTIONS_FAIL,
  payload: error,
})

export const loading = () => ({ type: FORM_LOADING })
export const resetLoading = () => ({ type: RESET_FORM_LOADING })