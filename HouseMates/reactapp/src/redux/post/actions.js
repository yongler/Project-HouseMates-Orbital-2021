import axios from 'axios'
import {
  GET_POST_LIST_SUCCESS,
  GET_POST_LIST_FAIL,
  GET_POST_DETAIL_SUCCESS,
  GET_POST_DETAIL_FAIL,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAIL,
  EDIT_POST_SUCCESS,
  EDIT_POST_FAIL,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAIL,
  POST_LOADING,
  RESET_POST_LOADING,
  RESET_CREATE_POST_SUCCESS,
} from './types'

// Error messages
const getPostListErrorMsg = "Unable to load posts"
const getPostDetailErrorMsg = "Unable to load post"
const createPostErrorMsg = "Unable to submit form"
const editPostErrorMsg = "Unable to edit post"
const deletePostErrorMsg = "Unable to delete post"

// Async actions creators
export const getPostList = () =>
  async dispatch => {
    dispatch(loading())

    // Get access token from local storage
    const token = localStorage.getItem('access')

    // Request
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${token}`,
      }
    }

    // Get request
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/post-list/`, config)

      dispatch(getPostListSuccess(res.data))
    } catch (err) {
      dispatch(getPostListFail(getPostListErrorMsg))
    }
  }

export const getPostDetail = id =>
  async dispatch => {
    dispatch(loading())

    // Get access token from local storage
    const token = localStorage.getItem('access')

    // Draft request
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${token}`,
      }
    }

    // Get request
    try {
      const res = axios.get(`${process.env.REACT_APP_API_URL}/form/post-detail/${id}/`, config)

      dispatch(getPostDetailSuccess(res.data))
    } catch (err) {
      dispatch(getPostDetailFail(getPostDetailErrorMsg))
    }
  }

export const createPost = (post_form_type, selected_choices, owner) =>
  async dispatch => {
    dispatch(loading())

    // Get access token from local storage
    const token = localStorage.getItem('access')

    // Draft request
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${token}`,
      }
    }
    const body = JSON.stringify({ post_form_type, selected_choices, owner })

    // Post request
    try {
      axios.post(`${process.env.REACT_APP_API_URL}/form/post-list/`, body, config)

      dispatch(createPostSuccess())
    } catch (err) {
      dispatch(createPostFail(createPostErrorMsg))
    }
  }

export const editPost = (id, post_form_type, selected_choices, owner) =>
  async dispatch => {
    dispatch(loading())

    // Get access token from local storage
    const token = localStorage.getItem('access')

    // Draft request
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${token}`,
      }
    }
    const body = JSON.stringify({ post_form_type, selected_choices, owner })

    // Put request
    try {
      axios.put(`${process.env.REACT_APP_API_URL}/form/post-list/${id}/`, body, config)

      dispatch(editPostSuccess())
    } catch (err) {
      dispatch(editPostFail(editPostErrorMsg))
    }
  }

export const deletePost = id =>
  async dispatch => {
    dispatch(loading())

    // Get access token from local storage
    const token = localStorage.getItem('access')

    // Draft request
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${token}`,
      }
    }

    // Post request
    try {
      axios.delete(`${process.env.REACT_APP_API_URL}/form/post-list/${id}/`, config)

      dispatch(deletePostSuccess())
    } catch (err) {
      dispatch(deletePostFail(deletePostErrorMsg))
    }
  }

// Action Creators
export const getPostListSuccess = posts => ({
  type: GET_POST_LIST_SUCCESS,
  payload: posts,
})
export const getPostListFail = errorMsg => ({
  type: GET_POST_LIST_FAIL,
  payload: errorMsg,
})

export const getPostDetailSuccess = post => ({
  type: GET_POST_DETAIL_SUCCESS,
  payload: post,
})
export const getPostDetailFail = errorMsg => ({
  type: GET_POST_DETAIL_FAIL,
  payload: errorMsg,
})

export const createPostSuccess = () => ({ type: CREATE_POST_SUCCESS })
export const createPostFail = errorMsg => ({
  type: CREATE_POST_FAIL,
  payload: errorMsg,
})

export const editPostSuccess = () => ({ type: EDIT_POST_SUCCESS })
export const editPostFail = errorMsg => ({
  type: EDIT_POST_FAIL,
  payload: errorMsg,
})

export const deletePostSuccess = () => ({ type: DELETE_POST_SUCCESS })
export const deletePostFail = errorMsg => ({
  type: DELETE_POST_FAIL,
  payload: errorMsg,
})

export const loading = () => ({ type: POST_LOADING })
export const resetLoading = () => ({ type: RESET_POST_LOADING })

export const resetCreatePostSuccess = () => ({ type: RESET_CREATE_POST_SUCCESS })