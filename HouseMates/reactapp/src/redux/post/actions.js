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
  RESET_POST_ERROR_MSG,
  RESET_CREATE_POST_SUCCESS,
  RESET_EDIT_POST_SUCCESS,
  RESET_DELETE_POST_SUCCESS,
} from './types'

// Error messages
const getPostListErrorMsg = "Unable to load posts"
const getPostDetailErrorMsg = "Unable to load post"
const createPostErrorMsg = "Unable to submit form"
const editPostErrorMsg = "Unable to edit post"
const deletePostErrorMsg = "Unable to delete post"

// Async actions creators
export const getPostList = formType =>
  async dispatch => {
    dispatch(postLoading())

    // Request
    const config = {
      headers: {
        'Content-Type': 'application/json',
      }
    }

    // Get request
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/form/post-list/?form_type=${formType}`, config)

      dispatch(getPostListSuccess(formType, res.data))
    } catch (err) {
      dispatch(getPostListFail(getPostListErrorMsg))
    }
  }

export const getPostDetail = id =>
  async dispatch => {
    dispatch(postLoading())

    // Draft request
    const config = {
      headers: {
        'Content-Type': 'application/json',
      }
    }

    // Get request
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/form/post-list/${id}/`, config)

      dispatch(getPostDetailSuccess(res.data))
    } catch (err) {
      dispatch(getPostDetailFail(getPostDetailErrorMsg))
    }
  }

export const createPost = (post_form_type, selected_choices, owner) =>
  async dispatch => {
    dispatch(postLoading())

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
    dispatch(postLoading())

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
    dispatch(postLoading())

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
export const getPostListSuccess = (formType, posts) => ({
  type: GET_POST_LIST_SUCCESS,
  payload: { formType, posts },
})
export const getPostListFail = postErrorMsg => ({
  type: GET_POST_LIST_FAIL,
  payload: postErrorMsg,
})

export const getPostDetailSuccess = post => ({
  type: GET_POST_DETAIL_SUCCESS,
  payload: post,
})
export const getPostDetailFail = postErrorMsg => ({
  type: GET_POST_DETAIL_FAIL,
  payload: postErrorMsg,
})

export const createPostSuccess = () => ({ type: CREATE_POST_SUCCESS })
export const createPostFail = postErrorMsg => ({
  type: CREATE_POST_FAIL,
  payload: postErrorMsg,
})

export const editPostSuccess = () => ({ type: EDIT_POST_SUCCESS })
export const editPostFail = postErrorMsg => ({
  type: EDIT_POST_FAIL,
  payload: postErrorMsg,
})

export const deletePostSuccess = () => ({ type: DELETE_POST_SUCCESS })
export const deletePostFail = postErrorMsg => ({
  type: DELETE_POST_FAIL,
  payload: postErrorMsg,
})

export const postLoading = () => ({ type: POST_LOADING })
export const resetPostLoading = () => ({ type: RESET_POST_LOADING })

export const resetPostErrorMsg = () => ({ type: RESET_POST_ERROR_MSG })

export const resetCreatePostSuccess = () => ({ type: RESET_CREATE_POST_SUCCESS })
export const resetEditPostSuccess = () => ({ type: RESET_EDIT_POST_SUCCESS })
export const resetDeletePostSuccess = () => ({ type: RESET_DELETE_POST_SUCCESS })