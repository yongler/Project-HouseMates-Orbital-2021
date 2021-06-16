import axios from 'axios'
import {
  GET_FORM_SUCCESS,
  GET_FORM_FAIL,
  LOADING,
  RESET_LOADING,
  GET_QUESTIONS_SUCCESS, GET_QUESTIONS_FAIL
} from './types'

const getFormFailErrorMsg = "Unable to load form"


export const getQuestions = () => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/form/question-list/`,
        config
      );
      dispatch({
        type: GET_QUESTIONS_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: GET_QUESTIONS_FAIL,
      });
    }
  } else {
    dispatch({
      type: GET_QUESTIONS_FAIL,
    });
  }
};



// Async Action Createors
export const getForm = () =>
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
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/form/form-list/`, config)

      dispatch(getFormSuccess())
    } catch (err) {
      dispatch(getFormFail(getFormFailErrorMsg))
    }
  }



// Action Creators
export const getFormSuccess = users => ({
  type: GET_FORM_SUCCESS,
  payload: users
})
export const getFormFail = error => ({
  type: GET_FORM_FAIL,
  payload: error,
})

export const loading = () => ({ type: LOADING })
export const resetLoading = () => ({ type: RESET_LOADING })