import axios from 'axios'
import {
  GET_QUESTIONS_SUCCESS,
  GET_QUESTIONS_FAIL,
  FORM_LOADING,
  RESET_FORM_LOADING,
  RESET_FORM_ERROR_MSG,
} from './types'


// Error messages
const unableToLoadQuestionsErrorMsg = "Unable to load questions"

// Async Action Createors
export const getQuestions = (formType) =>
  async dispatch => {
    dispatch(formLoading())

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

      dispatch(getQuestionsSuccess(formType, res.data))
    } catch (err) {
      dispatch(getQuestionsFail(unableToLoadQuestionsErrorMsg))
    }
  }



// Action Creators
export const getQuestionsSuccess = (formType, questions) => ({
  type: GET_QUESTIONS_SUCCESS,
  payload: { formType, questions},
})
export const getQuestionsFail = formErrorMsg => ({
  type: GET_QUESTIONS_FAIL,
  payload: formErrorMsg,
})

export const formLoading = () => ({ type: FORM_LOADING })
export const resetFormLoading = () => ({ type: RESET_FORM_LOADING })

export const resetFormErrorMsg = () => ({ type: RESET_FORM_ERROR_MSG })