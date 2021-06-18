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

const initialState = {
  loading: false,
  posts: [],
  post: null,
  errorMsg: '',
  createPostSuccess: false,
}

const postReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case GET_POST_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: payload,
      }

    case GET_POST_LIST_FAIL:
      return {
        ...state,
        loading: false,
        errorMsg: payload,
      }

    case GET_POST_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        post: payload,
      }

    case GET_POST_DETAIL_FAIL:
      return {
        ...state,
        loading: false,
        errorMsg: payload,
      }

    case CREATE_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        createPostSuccess: true,
      }

    case CREATE_POST_FAIL:
      return {
        ...state,
        loading: false,
        errorMsg: payload,
        createPostSuccess: false,
      }

    case EDIT_POST_SUCCESS:
      return {
        ...state,
        loading: false,
      }

    case EDIT_POST_FAIL:
      return {
        ...state,
        loading: false,
        errorMsg: payload,
      }

    case DELETE_POST_SUCCESS:
      return {
        ...state,
        loading: false,
      }

    case DELETE_POST_FAIL:
      return {
        ...state,
        loading: false,
        errorMsg: payload,
      }

    case POST_LOADING:
      return {
        ...state,
        loading: true,
      }

    case RESET_POST_LOADING:
      return {
        ...state,
        loading: false,
      }

    case RESET_CREATE_POST_SUCCESS:
      return {
        ...state,
        createPostSuccess: false,
      }

    default:
      return state
  }
}

export default postReducer